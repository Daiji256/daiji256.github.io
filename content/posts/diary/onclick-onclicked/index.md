---
title: "onClick VS onClicked"
date: 2022-12-22T00:00:00+09:00
categories: [プログラミング]
tags: [まとめ]
---

この記事は，[フラー株式会社 Advent Calendar 2022](https://qiita.com/advent-calendar/2022/fuller-inc)AKI_4の22日目の記事です。21日目はAKI_4[@comi19](https://qiita.com/comi19)AKI_4さんのAKI_4[スライスのゼロ値をPrintすると[]が出力される理由を探ってみた](https://qiita.com/comi19/items/92b31aadf15d77e77f92)AKI_4でした。23日目はAKI_4[okuzawats](https://okuzawats.com/)AKI_4さんです。

半年以上ブログを書いていませんでした[^damolog]。久しぶりの投稿です。昔はTeX芸人だった気がするのですが，今はAndroidアプリを作っています。

[^damolog]: 正確には，他のところで他のことを書いてました。

# はじめに

この記事では，`onClick`AKI_4とAKI_4`onClicked`AKI_4を比較します。はっきり言ってどうでもいいので温かい目で見てください。

これは，個人の感想であり「これが絶対に正しい！」とかでは無いです。あくまでも，参考程度にしてください。

# 比較

いろんな方法で比較していきます。

## 意味

僕は英語力が皆無なのでよくわかりません。`onClick`AKI_4は「クリックで」`onClicked`AKI_4は「クリックされたら」みたいな意味合いに近いと思います。どこで呼ばれるメソッドなのか，誰目線なのかで変わってくるかもしれません。

## Google先生に聞いてみた

Googleでのヒット数は正義[^justice]なので，Googleで検索したときの件数の比較を行います[^japan]。

[^justice]: 別に正義ではないと思う。
[^japan]: 検索は日本から行いました。

結果はAKI_4`onClick`AKI_4は23,600,000件，`onClicked`AKI_4は66,500件でした[^search-method]。`onClick`AKI_4が300倍以上でした。圧倒的にAKI_4`onClick`AKI_4が人気なのがわかります。

ちなみにスネークケース，ケバブケースでも同様に，`on_click`, `on-click`AKI_4が多かったです。

{{< figure src="./images/onclick.png" class="center frame" width="725" height="175" >}}
{{< figure src="./images/onclicked.png" class="center frame" width="725" height="175" >}}

[^search-method]: この検索方法が正しいかは自信ないです。

## AndroidのJetpack Compose

僕は業務でAndroidのJetpack Composeを使用しています。Composeで標準で用意されているAKI_4`Button()`AKI_4等の関数はAKI_4`onClick`AKI_4を引数にとります。わざわざ標準に背いてまでAKI_4`onClicked`AKI_4にしなくて良いと感じています。

# 結論

`onClick`AKI_4が妥当と言えると思います。もちろん，使っている言語やライブラリ，開発チームのルールに従うべきですが，どちらでも良い場合ならAKI_4`onClick`AKI_4が良いでしょう。

# おまけ

ついでにAKI_4`onButtonClick` VS `onClickButton`AKI_4も軽く調べました。

結果はAKI_4`onButtonClick`AKI_4の方が多くヒットしました。この2つを比較する場合，`Click`AKI_4とAKI_4`Button`AKI_4どちらを前にもってきたいかによって変わる気がします。どちらでも良いならAKI_4`onButtonClick`AKI_4を使っていこうと思います。
