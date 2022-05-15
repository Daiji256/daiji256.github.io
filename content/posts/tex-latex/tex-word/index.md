---
title: "LuaLaTeXでフォント細かく変更する方法（MS Wordは使いたくない！AKI_0）"
date: 2021-02-02
categories: [TeX LaTeX]
tags: [Font,LuaLaTeX]
strlen: 26
---

# はじめに

課題や予稿，論文等ではフォント等のフォーマット指定がよくあります。MS Wordのテンプレートしか無かったり，MS Minchoなどの古いフォントを指定されるとイライラします。そこでLaTeXで書きたいと思います。ここではエンジンにLuaLaTeXを使用します。LuaLaTeXはPDFを直接出力することからフォントの埋め込みが容易で新しいイケイケなLaTeXだからです。

# ドキュメントクラス

ドキュメントクラスにはAKI_4`jlreq`AKI_4を利用します。`jlreq`AKI_4は日本語組版処理の要件に準拠した新しいドキュメントクラスで，日本に浸透しつつあります。オプションのAKI_4`fontsize=10.5bp`AKI_4はデフォルトのフォントサイズを{{<eq>}}\mathrm{10.5\,bp}{{</eq>}}とすることを示しています。`jlreq`AKI_4では英・和のフォント比がデフォルトで{{<eq>}}1{{</eq>}}なので，両方のフォントサイズが{{<eq>}}\mathrm{10.5\,bp}{{</eq>}}になります。MS Wordでは{{<eq>}}1\,\mathrm{pt}=1/72\,\mathrm{inch}{{</eq>}}ですが，TeXでは{{<eq>}}1\,\mathrm{pt}=1/72.27\,\mathrm{inch}{{</eq>}}と定義されています。TeXには{{<eq>}}1\,\mathrm{bp}=1/72\,\mathrm{inch}{{</eq>}}となる単位が存在します。このことから{{<eq>}}\mathrm{pt}{{</eq>}}の代わりに{{<eq>}}\mathrm{bp}{{</eq>}}を使用しています。

```TeX
\documentclass[fontsize=10.5bp]{jlreq}
```

# フォントの変更

Times New RomanやMS Minchoなどを指定されたことを想定して説明します。`luatexja-fontspec`AKI_4を使えば簡単に設定できます。問題は太字や斜体の設定です。Times New Romanのようにはじめから太字や斜体が用意されているフォントがほとんどですが，MS Minchoなどは用意されていません。MS WordなどではMS Minchoを太字にするとき疑似的に太字にしています。LuaLaTeXでもオプションにより疑似太字，疑似斜体を実現することができます。`FakeBold=2`，`FakeSlant=0.33`AKI_4に設定したときMS Wordと同様の結果になりました。

{{< figure src="./images/fig1.svg" class="center" width="320" height="182" >}}

```TeX
\usepackage{luatexja-fontspec}
\setmainfont[Ligatures={Rare,TeX}]{Times-New-Roman}
\setsansfont{Arial}
\setmainjfont[
	YokoFeatures       = {JFM=jlreq},
	TateFeatures       = {JFM=jlreqv},
	BoldFont           = MS-Gothic,
	BoldFeatures       = {FakeBold=2},
	ItalicFont         = MS-Mincho,
	ItalicFeatures     = {FakeSlant=0.33},
	BoldItalicFont     = MS-Gothic,
	BoldItalicFeatures = {FakeBold=2, FakeSlant=0.33}
]{MS-Mincho}
\setsansjfont[
	YokoFeatures       = {JFM=jlreq},
	TateFeatures       = {JFM=jlreqv},
	BoldFont           = MS-Gothic,
	BoldFeatures       = {FakeBold=2},
	ItalicFont         = MS-Gothic,
	ItalicFeatures     = {FakeSlant=0.33},
	BoldItalicFont     = MS-Gothic,
	BoldItalicFeatures = {FakeBold=2, FakeSlant=0.33}
]{MS-Gothic}
```

次に数式フォントについてです。現在MS Wordでは数式フォントにCambriaを使用しています。`unicode-math`AKI_4を使用すれば簡単に設定できます。

{{< figure src="./images/fig2.svg" class="center" width="142" height="76" >}}

```TeX
\usepackage{unicode-math}
\setmathfont{Cambria-Math}
```

# フォントサイズの変更

`\Large`AKI_4等をあらかじめ設定しておくことで，要求された体裁を容易に守ることができます。変更例はこのようになります。また，`vpt`AKI_4やAKI_4`xpt`AKI_4を変更することでデフォルトフォントサイズを変更することもできます。ここでは割愛させてもらいます。

```TeX
\renewcommand\tiny{\@setfontsize\tiny{5bp}{6bp}}
\renewcommand\scriptsize{\@setfontsize\scriptsize{7bp}{8bp}}
\renewcommand\footnotesize{\@setfontsize\footnotesize{8bp}{10bp}}
\renewcommand\small{\@setfontsize\small{9bp}{12bp}}
\renewcommand\normalsize{\@setfontsize\normalsize{10bp}{15bp}}
\renewcommand\large{\@setfontsize\large{12bp}{15bp}}
\renewcommand\Large{\@setfontsize\Large{14.4bp}{16bp}}
\renewcommand\LARGE{\@setfontsize\LARGE{17.28bp}{18bp}}
\renewcommand\huge{\@setfontsize\huge{20.74bp}{30bp}}
\renewcommand\Huge{\@setfontsize\Huge{24.88bp}{36bp}}
```

# まとめ

LuaLaTeXでの細かいフォント設定についてまとめました。曖昧なところや間違ってるところがあると思うのでその時は指摘してください。ソースコードは下の文献から見に行けます。

# 文献

1. [ソースコード(GitHub)](https://github.com/Daiji256/TeX-TikZ-Heatran/)
2. [LuaTeX-jaパッケージ(CTAN)](http://mirrors.ibiblio.org/CTAN/macros/luatex/generic/luatexja/doc/luatexja-ja.pdf)
3. [unicode-math (CTAN)](https://ctan.org/pkg/unicode-math)
4. [Point typography (Wiki)](https://en.wikipedia.org/wiki/Point_(typography))
5. [LuaLaTeXでフォント細かく変更する方法（MS Wordは使いたくない！AKI_0）(Qiita)](https://qiita.com/Daiji256/items/29adc574b15345d8afa2)
