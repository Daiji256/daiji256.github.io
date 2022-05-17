---
title: "超高速な数式表示（KaTeXより高速！）"
date: 2021-11-12
categories: [Hugo]
tags: [MathJax,KaTeX,tex2svg]
---

この記事は静的サイトジェネレータ向けの内容です。もちろん動的なサイトでも使えますが，おすすめしません。

# はじめに

このブログは静的サイトジェネレータのHugoで作成しています。ここではHugo用の説明をしますが，他の静的サイトジェネレータ（Hexo，Jekyllなど）でも使える内容だと思います。

静的サイトジェネレータはその名の通り，静的なサイトを生成します。WordPressのようにユーザがサイトにアクセスするたびに，ページを作成する動的なものと比べ，読み込み速度などのパフォーマンスが高いメリットがあります。

科学技術に関する内容の記事を書く場合，サイト上に数式を表示したくなります。数式表示にはMathJaxやKaTeXがよく利用されています[^katex]。これらはユーザがサイトにアクセスすると，LaTeX記述の数式をJavaScriptを用いてブラウザ上で表示させます。この処理のせいで，サイトにアクセスした直後少しの間，数式がちゃんと表示されません。

[^katex]: KaTeXはMathJaxより早いです。このブログではKaTeXを利用していました。

当たり前ですが，数式の見た目は何度読み込んでも同じです。せっかくHugoを使っているのに，これでは何となく嫌な感じです。最初からHugoでHTMLを生成するときに数式を埋め込んでしまえば，ユーザがアクセスするたびに，MathJaxやKaTeXの処理をしなくていいです。

**こんなこといいな，できたらいいな...**

できます！

# 目標

このコードのようにLaTeX数式コードをSVGへ変換し挿入するShortcodeを作成することを目標にします。作り方なんて興味ないから使い方教えろって人は[使い方](#使い方)を見てください。

```md
{{< hgblock >}}< tex2svg >{{< /hgblock >}}E=mc^2{{< hgblock >}}< /tex2svg >{{< /hgblock >}}
```
```svg
<svg> ... </svg>
```

# いざ作成

アイデアは文献4のAKI_4[tex2svg (GitHub)](https://github.com/atishay/tex2svg/)AKI_4と同じです。**個人的に**使いやすくするようにカスタマイズします。

## LaTeXからSVGに変換

LaTeXをSVGに変換するツールは色々あります。しかし，Hugoから外部コマンドは実行できないので，簡単ではなさそうです。

HugoはAKI_4`getJSON`AKI_4でインターネット上のJSONを取得することができます。LaTeXをSVGの情報を含むJSONを返すAPIを探したところ，[tex2svg](http://tex2svg.herokuapp.com/)AKI_4とAKI_4[CODECOGS](https://codecogs.com/)AKI_4が見つかりました。

- [tex2svg](http://tex2svg.herokuapp.com/)：MathJaxによって数式を生成します。HerokuでAPIが公開されていてのレスポンスは少し遅いです。
- [CODECOGS](https://codecogs.com/)：昔からある有名な奴です。SVG以外にPNGやGMPとかも生成できます。ベースラインが無く，インラインで表示すると微妙になる。

インライン表示が綺麗に見えないと嫌なので，tex2svgを利用します。

tex2svgはAKI_4[`https://tex2svg.herokuapp.com/?`+`q=E=m^2`+`&inline=true`](https://tex2svg.herokuapp.com/?&q=E=m^2&inline=true)AKI_4のように叩きます。`q=`AKI_4に表示したい数式のLaTeXコードを書きます。`&inline=true`AKI_4を書くとインライン表示になります。また，ディスプレイ表示のときAKI_4`class=tex`，インライン表示のときAKI_4`class=i-tex`AKI_4にしてくれます。

APIは次のようなJSONを返します。`svg`AKI_4にAKI_4`vertical-align`AKI_4などのパラメータもすでに含まれているので，`svg`AKI_4だけを利用します。

```json
{
  "speakText": "equation",
  "svg": "<svg ...",
  "width":"...ex",
  "height":"....ex",
  "style": "vertical-align: ...ex;"
}
```

## Shortcodes

`getJSON`AKI_4はURLがAKI_4`str1str2str3`AKI_4のときAKI_4`"str1" "str2" "str3"`AKI_4のように分割して指定できます。`(querify "q" .Inner)`AKI_4はAKI_4`{{< hgblock >}}< tex2svg >{{< /hgblock >}}`AKI_4とAKI_4`{{< hgblock >}}< /tex2svg >{{< /hgblock >}}`AKI_4の間のテキストをAKI_4`q=%5Cfrac%7B1%7D%7Bx%7D`AKI_4みたいにします。インライン表示するときはAKI_4`&inline=true`AKI_4を加えます。`svg`AKI_4にはAKI_4`\n`AKI_4などのコードを含むので，それをAKI_4`safeHTML`AKI_4でいい感じにして表示させます。

```html
{{- $json := getJSON "https://tex2svg.herokuapp.com/" "?" (querify "q" .Inner) "&inline=true" -}}
{{- $json.svg | safeHTML -}}
```

Shortcodeの引数を指定して表示方法の選択ができたほうが便利です。`{{- if eq (.Get 0) "display" -}}`AKI_4で引数にAKI_4`display`AKI_4の有無に応じて，`<span>`AKI_4とAKI_4`<div>`AKI_4を分岐し，`&inline=true`AKI_4を適宜付けます。具体例は次節のAKI_4[使い方](#使い方)AKI_4で紹介します。

# 使い方

この節では使い方だけを説明します。コピペで簡単に利用できるので，「中身とか知らねーけど使わせろ」って人はここだけ見てください。

`shortcodes`AKI_4に次のコードをAKI_4`tex2svg.html`[^tex2svg.html]AKI_4として保存してください。

[^tex2svg.html]: 好きな名前で構いません。僕は短いほうが楽なのでAKI_4`eq.html`AKI_4にしています。

```html
{{- if eq (.Get 0) "display" -}}
<div class="displaystyle">
  {{- $json := getJSON "https://tex2svg.herokuapp.com/" "?" (querify "q" (replace .Inner "\\bm" "\\boldsymbol")) -}}
  {{- $json.svg | safeHTML -}}
</div>
{{- else -}}
<span class="inline">
  {{- $json := getJSON "https://tex2svg.herokuapp.com/" "?" (querify "q" (replace .Inner "\\bm" "\\boldsymbol")) "&inline=true" -}}
  {{- $json.svg | safeHTML -}}
</span>
{{- end -}}
```

次のようにMarkdownで記事を書いて見てください。

```md
ディスプレイ表示の数式は
{{< hgblock >}}< tex2svg display >{{< /hgblock >}}
  (f \ast g)(t)=\int_{-\infty}^{\infty} f(\tau) g(t - \tau) \, \mathrm{d}\tau
{{< hgblock >}}< /tex2svg >{{< /hgblock >}}
となる。

インライン表示の数式は
{{< hgblock display >}}< tex2svg >{{< /hgblock >}}
  (f \ast g)(t)=\int_{-\infty}^{\infty} f(\tau) g(t - \tau) \, \mathrm{d}\tau
{{< hgblock >}}< /tex2svg >{{< /hgblock >}}
となる。
```

次のような表示（出力）が確認できます。

---

ディスプレイ表示の数式は
{{<eq d>}}
  (f \ast g)(t)=\int_{-\infty}^{\infty} f(\tau) g(t - \tau) \, \mathrm{d}\tau
{{</eq>}}
となる。

インライン表示の数式は
{{<eq>}}
  (f \ast g)(t)=\int_{-\infty}^{\infty} f(\tau) g(t - \tau) \, \mathrm{d}\tau
{{</eq>}}
となる。

---

もちろんAKI_4`align`AKI_4環境も使えます。

{{<eq d>}}
\begin{align}
  f(x) &= x+1\\
  g(x) &= x^2\\
  h(x) &= \frac{1}{\sqrt{x}}
\end{align}
{{</eq>}}

インライン表示のときはAKI_4`<span class="inline"> ... </span>`AKI_4で囲み，ディスプレイ表示のときはAKI_4`<div class="display"> ... </div>`AKI_4で囲みます。CSSで設定することで，表示方法を簡単に設定できます。

# おまけ

## カスタマイズ

### ディスプレイ表示を中央へ

ディスプレイ表示の時はTeXみたいに中央に置きたい場合はCSSで左右にマージンを与えます。

```css
.tex {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

### フォントサイズを変更したい

ちょっと本文より大きくて嫌だな～と思ったので，フォントサイズを{{<eq>}}0.9{{</eq>}}倍させました。

```css
.tex {font-size: 0.9em;}
.i-tex {font-size: 0.9em;}
```

### `\bm`AKI_4を使いたい

MathJaxはデフォルトではAKI_4`\bm`AKI_4を使えないので，代わりにAKI_4`\boldsymbol`AKI_4で太字にします。`\bm`AKI_4をAKI_4`\boldsymbol`AKI_4に置換すればもっと便利です。

```html
replace .Inner "\\bm" "\\boldsymbol"
```

### テキスト選択したい

単なる画像としてのSVGなので，数式をコピペできません。SVG内に見えないテキストを用意してコピペできるようにしたいと思います。`replace`AKI_4を使ってAKI_4`</svg>`AKI_4をAKI_4`<text> ... </text></svg>`AKI_4に置換して，無理やりテキスト情報を入れます。CSSテキストのスタイルを指定します。色を無色AKI_4`rgba(0,0,0,0)`AKI_4にします。SVG内のフォントサイズがはちょっと**アレ**ですごく小さいみたいなので，適当に超大きくなるように設定します。

```html
{{- (replace $json.svg "</svg>" (printf "<text x=\"0\" y=\"0\" class=\"eq-text\">%s</text></svg>" $.Inner)) | safeHTML -}}
```
```css
.eq-text {
  fill: rgba(0, 0, 0, 0);
  font-size: 100ex;
}
```

## tex2svg

MathJaxにはパッケージを追加したり，フォントを変更する機能があります。tex2svgではデフォルト状態になっています。MathJaxの設定をやりたい場合は自分でAPIを用意してください。ソースコードはAKI_4[tex2svg (GitHub)](https://github.com/atishay/tex2svg/)AKI_4を参考にすれば良いと思います。ローカルでHugoを使う場合はAKI_4`localhost:3000`AKI_4にAPIをたてたとしたら，`https://tex2svg.herokuapp.com/`AKI_4をAKI_4`http://localhost:3030/`AKI_4に置きかえらば良いです。僕はGitHub ActionsでHugoしているので，tex2svgを直接利用しています[^myapi]。

[^myapi]: まあ，自分でHerokuとかRepl.itとかでAPIを公開すればいいんだけどね...

# 文献

1. [MathJax](https://www.mathjax.org/)
2. [KaTeX](https://katex.org/)
3. [tex2svg (API)](http://tex2svg.herokuapp.com/)
4. [tex2svg (GitHub)](https://github.com/atishay/tex2svg/)
5. [CODECOGS](https://codecogs.com/)
6. [超高速な数式表示（KaTeXより高速！）(Qiita)](https://qiita.com/Daiji256/items/47808405713dc2b33ab1)
