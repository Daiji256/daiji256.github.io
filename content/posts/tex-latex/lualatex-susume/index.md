---
title: "LuaLaTeXのすゝめ"
date: 2021-02-07
categories: [TeX LaTeX]
tags: [まとめ,LuaLaTeX]
---

# はじめに

この記事では**高機能でイケイケ**なLuaLaTeXを紹介します。

現在日本で一般的に使用されているLaTeXはupLaTeXだと思います。upLaTeXはUnicode対応の日本語LaTeXエンジンが収録されている，pLaTeXの進化系みたいなものです。upLaTeXはpLaTeXからの移行が容易で，環境依存文字やJIS第1・第2水準の漢字を意識せずに使用できる点が初心者に好まれている理由の1つだと思います。

LaTeXは下の図の様にTeXファイルの執筆からPDFの出力まで行います。レガシーLaTeX（(u)pLaTeXなど）はDVIファイルを経由してPDF作成します。それに対しモダンLaTeX（LuaLaTeXなど）は**直接PDFを作成**します。LuaLaTeXは海外でメジャーであるpdfLaTeXに軽量スクリプト言語であるLuaを組み込んだものです。pdfLaTeXの後継として期待されていて，LuaTeX-jaプロジェクトにより(u)pLaTeX以上の自由度で和文組版が可能となっています。LuaLaTeXはUnicodeに対応しています。さらに**フォントの設定が簡単**で，**OpenTypeやTrueTypeフォントを直接扱う**ことができます。

{{< figure src="./images/fig1.svg" class="center" width="480" height="283" >}}

# フォント

LuaLaTeXの最大の強みと言えるのがフォントについてです。昔ながらのLaTeXではフォントの設定が非常に難しいのに対して，LuaLaTeXでは**ソースファイル内で簡単に設定することができます**。`fontspec`AKI_4を和文フォントに対応するように拡張したAKI_4`luatexja-fontspec`AKI_4を用いてフォントの設定を行います。細かな設定方法については，[LuaLaTeXでフォント細かく変更する方法](https://qiita.com/Daiji256/items/29adc574b15345d8afa2)AKI_4を参照してください。

`luatexja-fontspec`AKI_4を使用することで下に示すコードにより，OSにインストールされているフォントをPDFに埋め込むことができます。また，`ttf`AKI_4ファイルなどを直接参照することもできます。

```TeX
\usepackage{luatexja-fontspec}
\setmainfont[Ligatures=TeX]{Times New Roman}
\setmainjfont[BoldFont=MS Gothic]{MS Mincho}
```

あらかじめ用意された和文フォントから選択することができるAKI_4`luatexja-preset`AKI_4というパッケージがあります。例えばIPA明朝とIPAゴシックを使う設定する場合次のように書けばよいです。他のフォントについてはAKI_4[LaTeX-jaの使い方](https://ja.osdn.net/projects/luatex-ja/wiki/LuaTeX-ja%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)AKI_4を参照してください。

```TeX
\usepackage[ipa]{luatexja-preset}
```

# Luaを書く

[はじめに](#はじめに)AKI_4でも書きましたがLuaTeXからLuaを利用できます。LuaLaTeXのソース中でLuaを書く場合にはAKI_4`\directlua`AKI_4を使用します。LuaからTeXに出力するにはAKI_4`tex.print`AKI_4を使用します。実際にLuaを利用して{{<eq>}}\sqrt{2}{{</eq>}}を表示してみます。以下に示すコードにより{{<eq>}}\sqrt{2}{{</eq>}}が計算（？）できています。もっと詳しいことはAKI_4[徹底攻略！LuaLaTeXでLuaコードを「書く」ためのコツ](https://qiita.com/zr_tex8r/items/af2905bc93ac2c936a67)AKI_4でわかりやすく説明されています。

```TeX
\directlua{tex.print(math.sqrt(2))}
```
{{<eq d>}}
1.4142135623731
{{</eq>}}

# ドキュメントクラス

LuaLaTeXのAKI_4`jsclasses`AKI_4互換クラス次の通りです。現在は(u)pLaTeXとLuaLaTeXの両方で使える，日本語組版処理の要件に準拠したAKI_4`jlreq`AKI_4が人気です。詳しくは今度，別の記事で解説したいと思っています。

| 種類    | ドキュメントクラス | 内容             |
| ------- | ------------------ | ---------------- |
| article | `ltjsarticle`      | 論文・レポート用 |
| book    | `ltjsbook`         | 書籍用           |
| report  | `ltjsreport`       | レポート用       |
| jspf    | `ltjspf`           | 某学会誌用       |
| kiyou   | `ltjskiyou`        | 某紀要用         |

# おまけ

(u)pLaTeXでは全角文字の幅と高さをAKI_4`zw`AKI_4とAKI_4`zh`AKI_4という単位で表していたが，LuaLaTeXではAKI_4`\zw`AKI_4とAKI_4`\zh`AKI_4となりました。

実際に確かめたわけでは無いが，Windows用のLuaLaTeXではファイル名を日本語にしてもいいらしいです。~~どうせ日本語のファイル名にしないけどな～~~

# おわりに

「はじめに」が大きくて頭でっかちな記事になってしまいました。まだ説明できていない内容があります。今後暇を見付けて記事のアップデートしていきたいと思います。楽しいLuaLaTeXライフを願っています。

# 文献

1. [改定第8版LaTeX2e美文書作成入門](https://www.amazon.co.jp/dp/B08MZ98Z1Q/)
2. [LaTeX入門AKI_4/AKI_4発展変(TeX Wiki)](https://texwiki.texjp.org/LaTeX%E5%85%A5%E9%96%80%2F%E7%99%BA%E5%B1%95%E7%B7%A8)
3. [LuaTeX (TeX Wiki)](https://texwiki.texjp.org/LuaTeX)
4. [LuaTeX-jaパッケージ(CTAN)](http://ftp.jaist.ac.jp/pub/CTAN/macros/luatex/generic/luatexja/doc/luatexja-ja.pdf)
5. [LuaLaTeX-ja用jsclasses互換クラス(CTAN)](http://ftp.jaist.ac.jp/pub/CTAN/macros/luatex/generic/luatexja/doc/ltjsclasses.pdf)
6. [LaTeX-jaの使い方(公式Wiki)](https://ja.osdn.net/projects/luatex-ja/wiki/LuaTeX-ja%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)
7. [LuaLaTeXでフォント細かく変更する方法(Qiita)](https://qiita.com/Daiji256/items/29adc574b15345d8afa2)
8. [徹底攻略！LuaLaTeXでLuaコードを「書く」ためのコツ(Qiita)](https://qiita.com/zr_tex8r/items/af2905bc93ac2c936a67)
9. [LuaLaTeXのすゝめ(Qiita)](https://qiita.com/Daiji256/items/9afbfa9f822629d3b995/)
