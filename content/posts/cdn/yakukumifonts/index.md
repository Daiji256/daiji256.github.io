---
title: "約物専用Webフォント（約組フォントAKI_4/AKI_4Yaku Kumi Fonts）"
date: 2021-11-20
categories: [CDN]
tags: [Font]
allfonts: true
strlen: 35
---

# 概要

約物専用のWebフォントAKI_4[AKI_0「約組フォントAKI_4/AKI_4Yaku Kumi Fonts」](https://github.com/Daiji256/Yaku-Kumi-Fonts/)AKI_4を公開しました。全角の約物（句読点や括弧のこと。）が連続したときのアキを調整するWebフォントです。AndroidのNoto CJK Fontsをサブセットすることで作成されているので，シェア率が非常に高いAKI_4[Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP/)AKI_4との組み合わせが良いです。

CDNで公開しているのでAKI_4[利用方法](#利用方法)AKI_4を参考にして，自分のブログで使ってみてください。ちなみに，このブログでも**使っていました**。今は，[Catalpa](https://catalpa.oss.onl/)AKI_4でも使われてる方法で，無理やり組版しています。

# はじめに

Webページを作るとき，下の表みたいに，括弧や句読点などの約物が連続したときのアキ（空白）が気になりませんか？Yaku Kumi Fontsを使えばこの問題が解決できます。

| Family                       |                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| Noto Sans JP                 | {{< NoYakuKumi Sans 400>}}約物がすごい（とてもすごい）。{{< /NoYakuKumi >}}                   |
|                              | {{< NoYakuKumi Sans 400>}}約物（が）・「連続している。」（（超）すごい）。{{< /NoYakuKumi >}} |
| Yaku Kumi Sans, Noto Sans JP | {{< YakuKumi   Sans 400>}}約物がすごい（とてもすごい）。{{< /YakuKumi >}}                     |
|                              | {{< YakuKumi   Sans 400>}}約物（が）・「連続している。」（（超）すごい）。{{< /YakuKumi >}}   |

このようなフォントはAKI_4[FONTPLUS](https://fontplus.jp/)AKI_4にもありますが，有料なのでブログなどで手軽に使うのは難しいです。[約味フォント](https://tama-san.com/yakuadj-font/)AKI_4は無料で公開されていますが，オリジナルグリフであるため，Noto Sans JPとの相性がいまいちです[^:ore1]。

[^:ore1]: 特に僕はカンマAKI_4`，`AKI_4が好みでは無かったです。

Yaku Kumi Fontsはもちろん無料で使えて，見ての通りNoto CJK Fontsと同じグリフになっています。Noto Sans JPを利用している人にはすごくお勧めできます。

Noto CJK Fontsと同じグリフで，約物のアキを詰めるAKI_4[Yaku Han JP](https://yakuhanjp.qranoko.jp/)AKI_4は全てのアキが無くなるので，組版要件を考えるといまいちです。それに約物を半角にするだけならAKI_4`font-feature-settings: "halt" 1;`AKI_4すればいいです。

ということで，Yaku Kumi Fontsを使いましょう！~~ただの布教活動...~~

# 対応文字

Yaku Kumi FontsはSansとSerifがあります。また，Google FontsのNoto Sans/Serif Japaneseと同じWeightがあります。収録フォントはAKI_4`、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙`AKI_4です。下の表で各ファミリ・ウェイトの例を紹介します。

| Family | Weight |                                                                                                              |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------ |
| Sans   | 100    | {{< YakuKumi Sans  100>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 300    | {{< YakuKumi Sans  300>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 400    | {{< YakuKumi Sans  400>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 500    | {{< YakuKumi Sans  500>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 700    | {{< YakuKumi Sans  700>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 900    | {{< YakuKumi Sans  900>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
| Serif  | 200    | {{< YakuKumi Serif 200>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 300    | {{< YakuKumi Serif 300>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 400    | {{< YakuKumi Serif 400>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 500    | {{< YakuKumi Serif 500>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 600    | {{< YakuKumi Serif 600>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 700    | {{< YakuKumi Serif 700>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |
|        | 900    | {{< YakuKumi Serif 900>}}、，。．・：；（）｟｠「」『』［］〚〛｛｝【】〖〗〈〉《》〔〕〘〙{{< /YakuKumi >}} |


# 利用方法

下の表の7つのCSSを用意しました。このブログでは基本的にSansのNormal/Regular (400)とBold (700)しか使わないので，`yakukumi-sans-rb.min.css`AKI_4を読み込んでいます。

| Family      | Weight   | CSS                          |
| ----------- | -------- | ---------------------------- |
| Sans, Serif | 全て     | `yakukumi.min.css`           |
| Sans        | 全て     | `yakukumi-sans-all.min.css`  |
|             | 400, 700 | `yakukumi-sans-rb.min.css`   |
|             | 400      | `yakukumi-sans-r.min.css`    |
| Serif       | 全て     | `yakukumi-serif-all.min.css` |
|             | 400, 700 | `yakukumi-serif-rb.min.css`  |
|             | 400      | `yakukumi-serif-r.min.css`   |

CDNを使う場合は，次のようにCSSを読み込んでください。利用したいCSSに合わせてAKI_4`yakukumi-sans-rb.min.css`AKI_4を編集してください。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/daiji256/yaku-kumi-fonts@v1.1/css/yakukumi-sans-rb.min.css">
```

CSSはAKI_4`font-family`AKI_4を設定し，`chws`AKI_4をオンにしてください。フォント名はSansを使うならAKI_4`"Yaku Kumi Sans"`，Serifを使うならAKI_4`"Yaku Kumi Serif"`AKI_4とします。

```css
font-family: "Yaku Kumi Sans", "Noto Sans JP", sans-serif;
font-feature-settings: "chws" 1;
```

# ライセンス

Yaku Kumi FontsはNoto CJK Fontsを元に作成されているので，ライセンスはSIL OFL 1.1です。CSSなどはMITライセンスです。

# バージョン履歴

- v1.0: 初公開（ウェイトが足りていないため現在非公開）
- v1.1: ウェイトの修正
- v1.2: 収録フォントを増やした

# 文献

1. [約組フォントAKI_4/AKI_4Yaku Kumi Fonts (GitHub)](https://github.com/Daiji256/Yaku-Kumi-Fonts/)
2. [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP/)
3. [Noto CJK full weight patch for Android devices (GitHub)](https://github.com/simonsmh/notocjk/)
4. [FONTPLUS](https://fontplus.jp/)
5. [約物Webフォント「約味」（YakuAdj）](https://tama-san.com/yakuadj-font/)
6. [Yaku Han JP](https://yakuhanjp.qranoko.jp/)
7. [Catalpa](https://catalpa.oss.onl/)
8. [約組フォントAKI_4/AKI_4Yaku Kumi FontsAKI_4-AKI_4約物専用Webフォント(Qiita)](https://qiita.com/Daiji256/items/a0a30725355a9f7d6d22/)
