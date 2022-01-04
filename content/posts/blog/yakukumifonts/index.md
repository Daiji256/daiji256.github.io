---
title: "約組フォント / Yaku Kumi Fonts - 約物専用 Web フォント"
date: 2021-11-20
categories: [ブログ-Hugo]
tags: [Font]
allfonts: true
---

# 概要

約物専用の Web フォント[「約組フォント / Yaku Kumi Fonts」](https://github.com/Daiji256/Yaku-Kumi-Fonts/)を公開しました。全角の約物（句読点や括弧のこと。）が連続したときのアキを調整する Web フォントです。Android の Noto CJK Fonts をサブセットすることで作成されているので，シェア率が非常に高い [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP/) との組み合わせが良いです。

CDN で公開しているので[利用方法](#利用方法)を参考にして，自分のブログで使ってみてください。

# はじめに

Web ページを作るとき，下の表みたいに，括弧や句読点などの約物が連続したときのアキ（空白）が気になりませんか？ Yaku Kumi Fonts を使えばこの問題が解決できます。

|Family| |
|------|-|
|Noto Sans JP                |{{< NoYakuKumi Sans 400>}}約物がすごい（とてもすごい）。{{< /NoYakuKumi >}}|
|                            |{{< NoYakuKumi Sans 400>}}約物（が）・「連続している。」（（超）すごい）。{{< /NoYakuKumi >}}|
|Yaku Kumi Sans, Noto Sans JP|{{< YakuKumi   Sans 400>}}約物がすごい（とてもすごい）。{{< /YakuKumi >}}  |
|                            |{{< YakuKumi   Sans 400>}}約物（が）・「連続している。」（（超）すごい）。{{< /YakuKumi >}}  |

このようなフォントは [FONTPLUS](https://fontplus.jp/) にもありますが，有料なのでブログなどで手軽に使うのは難しいです。[約味フォント](https://tama-san.com/yakuadj-font/)は無料で公開されていますが，オリジナルグリフであるため，Noto Sans JP との相性がいまいちです[^:ore1]。

[^:ore1]: 特に僕はカンマ `，` が好みでは無かったです。

Yaku Kumi Fonts はもちろん無料で使えて，見ての通り Noto CJK Fonts と同じグリフになっています。~~全ての Noto Sans JP を利用している人は Yaku Kumi Fonts 使うべきです！~~

Noto CJK Fonts と同じグリフで，約物のアキを詰める [Yaku Han JP](https://yakuhanjp.qranoko.jp/) は全てのアキが無くなるので，組版要件を考えるといまいちです。それに約物を半角にするだけなら `font-feature-settings: "halt" 1;` すればいいです。

ということで，Yaku Kumi Fonts を使いましょう！ ~~ただの布教活動...~~

# 対応文字

Yaku Kumi Fonts は Sans と Serif があります。また，Google Fonts の Noto Sans/Serif Japanese と同じ Weight があります。収録フォントは `、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙` です。下の表で各ファミリ・ウェイトの例を紹介します。

|Family|Weight| |
|------|------|-|
|Sans  |100   |{{< YakuKumi Sans  100>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |300   |{{< YakuKumi Sans  300>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |400   |{{< YakuKumi Sans  400>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |500   |{{< YakuKumi Sans  500>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |700   |{{< YakuKumi Sans  700>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |900   |{{< YakuKumi Sans  900>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|Serif |200   |{{< YakuKumi Serif 200>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |300   |{{< YakuKumi Serif 300>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |400   |{{< YakuKumi Serif 400>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |500   |{{< YakuKumi Serif 500>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |600   |{{< YakuKumi Serif 600>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |700   |{{< YakuKumi Serif 700>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|
|      |900   |{{< YakuKumi Serif 900>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}}|


# 利用方法

下の表の 7 つの CSS を用意しました。このブログでは基本的に Sans の Normal / Regular (400) と Bold (700) しか使わないので，`yakukumi-sans-rb.min.css` を読み込んでいます。

|Family     |Weight  |CSS                         |
|-----------|--------|----------------------------|
|Sans, Serif|全て    |`yakukumi.min.css`          |
|Sans       |全て    |`yakukumi-sans-all.min.css` |
|           |400, 700|`yakukumi-sans-rb.min.css`  |
|           |400     |`yakukumi-sans-r.min.css`   |
|Serif      |全て    |`yakukumi-serif-all.min.css`|
|           |400, 700|`yakukumi-serif-rb.min.css` |
|           |400     |`yakukumi-serif-r.min.css`  |

CDN を使う場合は，次のように CSS を読み込んでください。利用したい CSS に合わせて `yakukumi-sans-rb.min.css` を編集してください。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/daiji256/yaku-kumi-fonts@v1.1/css/yakukumi-sans-rb.min.css">
```

CSS は `font-family` を設定し，`chws` をオンにしてください。フォント名は Sans を使うなら `"Yaku Kumi Sans"`，Serif を使うなら `"Yaku Kumi Serif"` とします。

```css
font-family: "Yaku Kumi Sans", "Noto Sans JP", sans-serif;
font-feature-settings: "chws" 1;
```

# ライセンス

Yaku Kumi Fonts は Noto CJK Fonts を元に作成されているので，ライセンスは SIL OFL 1.1 です。CSS などは MIT ライセンスです。

# バージョン履歴

- v1.0: 初公開（ウェイトが足りていないため現在非公開）
- v1.1: ウェイトの修正
- v1.2: 収録フォントを増やした

# 文献

1. [約組フォント / Yaku Kumi Fonts (GitHub)](https://github.com/Daiji256/Yaku-Kumi-Fonts/)
2. [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP/)
3. [Noto CJK full weight patch for Android devices (GitHub)](https://github.com/simonsmh/notocjk/)
4. [FONTPLUS](https://fontplus.jp/)
5. [約物 Web フォント「約味」（YakuAdj）](https://tama-san.com/yakuadj-font/)
6. [Yaku Han JP](https://yakuhanjp.qranoko.jp/)
7. [約組フォント / Yaku Kumi Fonts - 約物専用 Web フォント (Qiita)](https://qiita.com/Daiji256/items/a0a30725355a9f7d6d22/)
