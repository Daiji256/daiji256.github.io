---
title: "Hugo で OGP / Twitter Card を自動生成したい"
date: 2022-01-11
categories: [Hugo]
tags: [OGP,Twitter Card]
strlen: 34
---

# はじめに

[Hugo v0.90.0](https://github.com/gohugoio/hugo/releases/tag/v0.90.0/) から，`images.Text` により画像に文字を合成した画像を生成できるようになりました。これにより，Qiita とかみたいに画像中にタイトルとかを記述した OGP / Twitter Card を自動生成できるようになりました。

{{< figure src="./images/qiita.png" class="center frame" width="400" height="210" >}}

この記事では最終的に次のような画像が生成されるようにします。

{{< figure src="./images/daiji-blog-post.png" class="center frame" width="400" height="209" >}}

# 準備

まず Hugo を `0.90.0` 以上にアップデートしてください。文字を合成する前の元画像を用意します。Twitter Card の Large Summary Image の推奨サイズが 800 x 418 px らしいのでそのサイズで用意しました[^ogp-size]。

[^ogp-size]: OGP の推奨サイズは 1200 x 630 px らしいです。

{{< figure src="./images/ogp-post.png" class="center frame" width="400" height="209" >}}

# 画像生成

`テキスト` と書いた画像を生成する場合次のようにしたら良いです。この例では Google Fonts の GitHub から `resources.GetRemote` を使って `NotoSansJP-Bold.otf` を読み取りフォントを NotoSansJP Bold にしています。OGP の元画像として，`static/images/ogp/ogp.png` にある画像を読み込んでいます。`static/` にあるファイルにアクセスするために `config.toml` で `assetDir = "static"` と設定してます。`(images.Text ... (dict ...))` は見ての通りテキストの位置や大きさなどを設定しています。最後に `$img.RelPermalink` で画像のリンクを取得します。

`static/images/ogp/...` にある画像を参照することで，`hugo` を実行した時に生成される画像は `images/ogp/...` になるので都合がいいので僕はこうしてます。

```html
{{ $font := resources.GetRemote "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP-Bold.otf" }}
{{ $img := resources.Get "images/ogp/ogp.png" }}
{{ $img = $img | images.Filter
  (images.Text "テキスト" (dict
    "color" "#ff3300"
    "size" 32
    "x" 50 "y" 200
    "font" $font
  ))
}}
<img src="{{ $img.RelPermalink }}" />
```

英文のようにスペースが入る文章なら，改行処理を行ってくれますが，和文のようにスペースが入らない文章では最初に改行が入ってそのままはみ出してしまいます。

|英文の場合|和文の場合|
|-|-|
|{{< figure src="./images/sample-eng.png" class="center frame" width="300" height="156.75" >}}|{{< figure src="./images/sample-ja.png" class="center frame" width="300" height="156.75" >}}|

そこで，長いタイトルの場合はみ出す分を切り取りこのようにします。

{{< figure src="./images/sample-ja-22.png" class="center frame" width="300" height="156.75" >}}

実際のソースコードを使って説明します。記事のタイトル以外に，ブログ名やカテゴリについても書きます。

4 ～ 8 行目ではタイトルが長い場合に切り取っています。標準のタイトル文字数を 22 として，タイトルに英字を入れたことを考慮して手動で文字数を設定できるようにしています（5 行目）。

`date` は `.Date.Format` で形式を指定します。`categories` と `tags` はループでカンマ区切りの 1 つの String にまとめます。

`$title`，`$categories` とかを複数の `(images.Text ...)` 使って，同時に書きます。

```html
{{ $font := resources.GetRemote "https://github.com/google/fonts/raw/main/ofl/notosansjp/NotoSansJP-Bold.otf" }}
{{ $img := resources.Get "images/ogp/ogp-post.png" }}
{{ $title := .Title }}
{{ $strlen := 22 }}
{{ if .Params.strlen }}{{ $strlen = .Params.strlen }}{{ end }}
{{ if gt (strings.RuneCount $title) (add $strlen 1) }}
  {{ $title = printf "%s…" (substr $title 0 $strlen) }}
{{ end }}
{{ $date := .Date.Format "2006 年 1 月 2 日" }}
{{ $categories := "" }}
{{ range .Params.categories }}{{ $categories = printf "%s, %s" $categories . }}{{ end }}
{{ $categories = substr $categories 2 }}
{{ $tags := "" }}
{{ range .Params.tags }}{{ $tags = printf "%s, %s" $tags . }}{{ end }}
{{ $tags = substr $tags 2 }}
{{ $img = $img | images.Filter
  (images.Text .Site.Title (dict
    "color" "#333"
    "size" 32
    "x" 90 "y" 19
    "font" $font
  ))
  (images.Text $title (dict
    "color" "#333"
    "size" 32
    "x" 25 "y" 135
    "font" $font
  ))
  (images.Text $date (dict
    "color" "#666"
    "size" 24
    "x" 80 "y" 230
    "font" $font
  ))
  (images.Text $categories (dict
    "color" "#666"
    "size" 24
    "x" 80 "y" 280
    "font" $font
  ))
  (images.Text $tags (dict
    "color" "#666"
    "size" 24
    "x" 80 "y" 330
    "font" $font
  ))
}}
```

このように画像が出力されます。タイトルに英数字が入っているため，文字数の割に幅が狭いので，`strlen: 34` と設定しています。

{{< figure src="./images/daiji-blog-post.png" class="center frame" width="400" height="209" >}}

# OGP / Twitter Card の設定

このブログではこんな感じで OGP / Twitter Card を設定しています。

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@Daiji256" />
<meta name="twitter:title" content="{{ .Title }} - {{ .Site.Title }}" />
<meta name="twitter:image" content="{{ $img.RelPermalink | absURL }}" />
<meta property="og:url" content="{{ .Permalink }}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="{{ .Title }} - {{ .Site.Title }}" />
<meta property="og:description" content="{{ .Summary }}" />
<meta property="og:site_name" content="{{ .Site.Title }}" />
<meta property="og:image" content="{{ $img.RelPermalink | absURL }}" />
```

# おまけ

[ホーム](https://daiji256.github.io/) や [カテゴリ / タグのページ](https://daiji256.github.io/categories/tex-latex/) のような投稿日やカテゴリとかと無縁なページでは以下のように画像を生成するようにしました。

|元の画像|出力画像|
|-|-|
|{{< figure src="./images/ogp.png" class="center frame" width="300" height="156.75" >}}|{{< figure src="./images/daiji-blog.png" class="center frame" width="300" height="156.75" >}}|

このようにホーム等のページでは `.Params.tags` が設定されないので，それを判定して 2 種類の画像生成を分岐するようにしました。

```html
{{ if or .Params.tags .Params.categories }}
  <!-- カテゴリ，タグがある場合 -->
{{ else }}
  <!-- カテゴリ，タグがない場合 -->
{{ end }}
```

# 文献

1. [Hugo releases/v0.90.0 (GitHub)](https://github.com/gohugoio/hugo/releases/tag/v0.90.0/)
