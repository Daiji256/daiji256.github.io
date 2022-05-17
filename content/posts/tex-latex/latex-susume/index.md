---
title: "LaTeXのすゝめ"
date: 2021-02-14
categories: [TeX LaTeX]
tags: [まとめ,upLaTeX]
---

# はじめに

本記事はレポート・論文等の執筆に役立つツールのLaTeXを紹介します。非LaTeXユーザや**初心者を対象**としています。中級者や上級者には物足りないと思います。

# TeXAKI_4/AKI_4LaTeXとは

TeX（テックAKI_4/AKI_4テフ）AKI_0[^tex]は，スタンフォード大学の計算機科学と数学の教授であるDonald E. Knuthが自ら開発した**フリーの組版システム**です。TeXはMS Wordなどの見たままを出力するWYSIWYGソフトウェアと異なり，執筆・組版・出力の各段階を分けて処理を行います。**執筆に集中でき**，様々なプラットフォーム上で**高品質なの文書を出力する**ことができます。

[^tex]: {{< TeX >}}のように書くことが望ましいです。難しい場合はTeXにしましょう。この記事では統一のためにTeXにしています。

LaTeX（ラテックAKI_4/AKI_4ラテフ）AKI_0[^latex]はコンピューター科学者のLeslie Lamportによって開発された，TeXに機能を追加し手軽に組版が行えるようになったシステムです。現在ではLaTeXを使うことが一般的なので，「TeX」でLaTeXを指すことが多いです。

[^latex]: {{< LaTeX >}}のように書くことが望ましいです。難しい場合はLaTeXにしましょう。

TeX，LaTeXの特徴は次のようなことがあげられます。

- Windows，macOS，Linuxなどの多くのプラットフォームで動作する。
- **テキストファイル**で文書を管理できる。
- **綺麗な数式を簡単に書ける**[^formula]。
- 図や表を挿入した文書を作成できる。
- 章・節，式，図表の番号，頁番号管理などを**自動**的に行い，参照できる。

[^formula]: TeXの数式記法は現在一般的に使用されています。

# 日本語TeXについて

現在，日本語対応している主なTeXエンジンは3つあります。

- pTeX：昔々にアスキーが開発した日本語対応のエンジンです。
- upTeX：Unicode対応でpTeXの進化系のようなエンジンです。
- LuaTeX：Luaが使え，PDFを直接出力する最新のエンジンです。

昔からの名残で学会のフォーマットにpLaTeXを採用していることがあります。ほぼ上位互換のupLaTeXが現在の主流であることからupLaTeXを中心に解説します。最新（未来の標準）のLuaLaTeXについては，[LuaLaTeXのすゝめ](https://qiita.com/Daiji256/items/9afbfa9f822629d3b995)AKI_4で解説しています。

## upLaTeX について

田中琢爾さんが内部コードをUnicode化したpLaTeXの拡張版です。これにより次のようなpLaTeXの問題が解決されました。

- JIS第1, 2水準の範囲内の文字しか使えないこと。
- 8bitの非英語欧文の扱いが難しいこと。
- 日本語に限られた利用しか出来なく，中国語や韓国語を扱えないこと。

簡単な話，いわゆる**環境依存文字に優しくなった**AKI_4pLaTeXです。pLaTeXを使う理由は皆無と言ってもいいでしょう。（pLaTeXのフォーマットしか用意されていない学会とかがあるなら別ですが...）

# LaTeX開発環境

文書作成には自分のPC等にLaTeXをインストールが必要です。TeX LiveというTeXのディストリビューションがおすすめです。インストール方法はOSごとに異なるため，[TeX Live (TeX Wiki)](https://texwiki.texjp.org/TeX%20Live)AKI_4を参考にしてください。

自分のPCに環境を構築したくない場合はWeb上のサービスをおすすめします。日本ではAKI_4[Overleaf](https://ja.overleaf.com/)AKI_4とAKI_4[Cloud LaTeX](https://cloudlatex.io/ja)AKI_4がメジャーだと思います。どちらも無料でブラウザ上からLaTeXを使用できます。

# 文書作成の基本手順

upLaTeXによる文書作成は執筆・組版・出力の3つのステップで行います[^legacy-modern]。

1. 原稿執筆にはテキストエディタを用いてTeXファイルを作成する。
2. コマンド（`uplatex`）を用いてTeXファイルからDVIファイルを作成する。
3. コマンド（`dvipdfmx`）を用いてDVIファイルからPDFファイルを作成する[^not-pdf]。

この手順により執筆したTeXソースファイルからPDFの文書ファイルを出力することができます。次に作成手順について例を用いて紹介します。

[^legacy-modern]: (u)pLaTeXのようなレガシーLaTeXはDVIを経由してPDFを作成します。pdfLaTeX，LuaLaTeXなどのモダンLaTeXは直接PDFを出力するので2つのステップ（執筆と出力）になります。
[^not-pdf]: 他のソフト（コマンド）によりPDFファイル以外のPSファイルを出力する場合などもあります。

## 原稿ファイルの執筆（TeXファイルの作成）

テキストエディタを用いて下に示すソースファイル（`sample.tex`）を作成します。ソースコードの具体的な説明はAKI_4[TeXソースの基本構成](#tex-ソースの基本構成)AKI_4を参照してください。

```TeX:sample.tex
\RequirePackage{plautopatch}
\documentclass[uplatex,dvipdfmx]{jsarticle}

\title{{\LaTeX}のすゝめ}
\author{Daiji}

\begin{document}
\maketitle

\section{はじめに}

{\TeX}は組版システムです。
{\TeX}を使いやすくするために，{\LaTeX}が開発されました。

p{\TeX}は日本語対応の{\TeX}です。
up{\TeX}はUnicode対応のp{\TeX}です。

\end{document}
```

## 組版（コンパイル）

upLaTeXを呼び出し，DVI（device independent file format）ファイル[^dvi]を生成します。`sample.tex`AKI_4をコンパイルする場合は，次のコマンドになります。

[^dvi]: レイアウト情報を埋め込んだファイルのことです。

```sh {linenos=false}
uplatex sample
```

次のようなメッセージが表示されたなら，コンパイルは成功し，`sample.aux`，`sample.log`，`sample.dvi`AKI_4が生成されているはずです。

```
...
Output written on sample.dvi (1 page, 1076 bytes).
Transcript written on sample.log.
```

## PDFに変換

DVIファイルをPDFの文書ファイルに変換するには次のコマンドで行えます[^dvipdfm]。`sample.pdf`AKI_4が生成されると思います。

[^dvipdfm]: 古いAKI_4`dvipdfm`AKI_4というDVIウェアもあるが今は使えません。

```sh {linenos=false}
dvipdfmx sample
```

# TeXソースの基本構成

upLaTeXのソースファイルは次の基本構成となります。

```TeX
\RequirePackage{plautopatch}
\documentclass[uplatex,dvipdfmx]{jsarticle}
% プリアンブル
\begin{document}
% 本文
\end{document}
```

1行目は(u)pLaTeXとLaTeXの非互換を**いい感じにしてくれるヤツ**です。(u)pLaTeXを使用する場合は何も考えずに書いてください。2行目は文書の種類（document class）を指定する部分です（[参照](#ドキュメントクラス)）AKI_0[^option]。プリアンブルでは文書の体裁に関する宣言やコマンド等の定義を行います。本文が実際に出力される文書となります。なお，記号AKI_4`%`AKI_4はコメントの開始を意味します（[参照](#本文の執筆の基本ルール)）。

[^option]: `uplatex`AKI_4はこのソースファイルがupLaTeX用であることを明示するためにあります。また，`dvipdfmx`AKI_4はAKI_4`graphicx`AKI_4やAKI_4`color`AKI_4パッケージのドライバ指定用です。グローバルオプションとして全てのパッケージに適用されます。

# 本文の執筆の基本ルール

- 英文は単語の区切りで，和文は任意の場所で改行されます。
- 段落を区切るには，空行を入れる。
- 2文字以上の半角空白文字，タブ文字は1文字の半角文字とみなされる。
- 段落のはじめのインデントはTeXが自動的に入ります。全角スペースによるインデントは推奨されません。
- 次の記号は，TeXのキーワード扱いになるので，そのままでは出力できません（[参照](#記号)）。  
`#`，`$`，`%`，`&`，`_`，`{`，`}`，`<`，`>`，`\`，`^`，`|`，`~`
- 記号AKI_4`%`AKI_4以降，行末まではコメントになります。
- 記号AKI_4`\`AKI_4ではじまる文字列はコマンドまたは環境です。環境とはAKI_4`\begin{環境名}`AKI_4とAKI_4`\end{環境名}`AKI_4のような対になっている命令で，それ以外のものがコマンドです。
- `\\`AKI_4により強制改行ができます。安易な使用はお勧めしません。
# コマンド

ここでは主要な一部のコマンド等の紹介を行います。

## タイトル

文章のタイトルは次のように指定します。

```TeX
\title{表題}
\author{著者}
\date{日付}
\maketitle
```

## 見出し

```TeX
\part{部}
\chapter{章} % jsarticle クラスには用意されていない
\section{節}
\subsection{項}
\subsubsection{目}
\paragraph{段落}
\subparagraph{小段落}
```

`\section*{節}`AKI_4のように，`*`AKI_4をつけることで，番号をつけないようにできます。

## 文字サイズ変更

文字サイズを変更するには次のコマンドが利用できます。サイズはデフォルトの値になっています。コマンド以降のフォントが全て変更されます。`{\Large 文章}`AKI_4のようにすることで一部が変更できます[^footnotesize]。

[^footnotesize]: MathJaxではAKI_4`\footnotesize`AKI_4が使えないので，HTMLのAKI_4`font-size: 80%`AKI_4で代用しています。

| コマンド        | サイズ                                                                  |
| --------------- | ----------------------------------------------------------------------- |
| `\tiny`         | {{<eq lr>}}\tiny         5\,\mathrm{pt}{{</eq>}}                        |
| `\scriptsize`   | {{<eq lr>}}\scriptsize   7\,\mathrm{pt}{{</eq>}}                        |
| `\footnotesize` | {{<footnotesize>}}{{<eq lr>}}8\,\mathrm{pt}{{</eq>}}{{</footnotesize>}} |
| `\small`        | {{<eq lr>}}\small        9\,\mathrm{pt}{{</eq>}}                        |
| `\normalsize`   | {{<eq lr>}}\normalsize   10\,\mathrm{pt}{{</eq>}}                       |
| `\large`        | {{<eq lr>}}\large        12\,\mathrm{pt}{{</eq>}}                       |
| `\Large`        | {{<eq lr>}}\Large        14.4\,\mathrm{pt}{{</eq>}}                     |
| `\LARGE`        | {{<eq lr>}}\LARGE        17.28\,\mathrm{pt}{{</eq>}}                    |
| `\huge`         | {{<eq lr>}}\huge         20.74\,\mathrm{pt}{{</eq>}}                    |
| `\Huge`         | {{<eq lr>}}\Huge         24.88\,\mathrm{pt}{{</eq>}}                    |

これら以外の文字サイズに変更したい場合にはAKI_4`\fontsize`AKI_4コマンドを使用します。文字サイズと行送りを指定して使用します。

```TeX
\fontsize{10.5pt}{15pt}\selectfont
```

## フォントスタイル変更

フォントスタイルを変更するには次のコマンドが利用できます[^bf...]AKI_4[^sl,sc]。日本語用の明朝体やゴシック体にするコマンドAKI_4`\textmc`，`\textgt`AKI_4も存在します。

[^bf...]: `\bf`AKI_4やAKI_4`\it`AKI_4のようなフォントスタイルを変更するコマンドは古く使ってはいけません。現在はAKI_4`\bfseries`AKI_4等の使用が推奨されます。
[^sl,sc]: MathJaxではAKI_4`sl`，`sc`AKI_4が使えないため，HTMLのAKI_4`skewX(-10deg)`AKI_4とAKI_4`\scriptsize`AKI_4で代用しています。

| 入力                  | 出力                                                                     |
| --------------------- | ------------------------------------------------------------------------ |
| `\textrm{Roman}`      | {{<eq lr>}}\mathrm{Roman}{{</eq>}}                                       |
| `\textbf{Boldface}`   | {{<eq lr>}}\mathbf{Boldface}{{</eq>}}                                    |
| `\texttt{Typewriter}` | {{<eq lr>}}\mathtt{Typewriter}{{</eq>}}                                  |
| `\textit{Italic}`     | {{<eq lr>}}\mathit{Italic}{{</eq>}}                                      |
| `\textsf{SansSerif}`  | {{<eq lr>}}\mathsf{Sans~Serif}{{</eq>}}                                  |
| `\textsl{Slanted}`    | {{<sl>}}{{<eq lr>}}\mathrm{Slanted}{{</eq>}}{{</sl>}}                    |
| `\textsc{SmallCaps}`  | {{<eq lr>}}\mathrm{S\scriptsize MALL}~\mathrm{C\scriptsize APS}{{</eq>}} |

## 記号

キーワード扱いの文字や一部の特殊文字を出力するためには次のコマンドなどが利用できます[^some-symbol]。

[^some-symbol]: MathJaxでは一部うまく出力できないので，他の方法で妥協してあります。

| 入力       | 出力                                                           |
| ---------- | -------------------------------------------------------------- |
| `\#`       | {{<eq lr>}}\#{{</eq>}}                                         |
| `\$`       | {{<eq lr>}}\${{</eq>}}                                         |
| `\%`       | {{<eq lr>}}\%{{</eq>}}                                         |
| `\&`       | {{<eq lr>}}\&{{</eq>}}                                         |
| `\_`       | {{<eq lr>}}\_{{</eq>}}                                         |
| `\{`       | {{<eq lr>}}\{{{</eq>}}                                         |
| `\}`       | {{<eq lr>}}\}{{</eq>}}                                         |
| `-`        | {{<eq lr>}}\text{-}{{</eq>}}（ハイフン）                       |
| `--`       | {{<eq lr>}}\text{–}{{</eq>}}（エヌダッシュ）                   |
| `---`      | {{<eq lr>}}\text{—}{{</eq>}}（エムダッシュ）                   |
| `$-$`      | {{<eq lr>}}-{{</eq>}}（マイナス）                              |
| ``` `` ``` | {{<eq lr>}}\text{“}{{</eq>}}（開きダブルクォーテーション）     |
| `''`       | {{<eq lr>}}\text{"}{{</eq>}}（閉じダブルクォーテーション）[^"] |

[^"]: TeXでは1キーで入力するダブルクォーテーション「"」の使用は推奨されません。

## 改ページ

改ページを行なうコマンドには，`\pagebreak`，`\newpage`，`\clearpage`AKI_4などがあります。コマンドごとに細かな使用が異なりますが基本的に改ページに用いられます。

# 環境

ここでは主要な一部の環境の紹介を行います。

## 箇条書き

箇条書きのための環境として，番号なし箇条書き（`itemize`），番号付き箇条書き（`enumerate`），見出し付き箇条書き（`description`）が用意されています。次のように使用してください。

```TeX
\begin{itemize}
	\item 項目1
	\item 項目2
\end{itemize}
```

## 揃え

文字揃えは左揃え（`flushleft`），中央揃え（`center`），右揃え（`flushright`）が指定できます。次のように使用してください。

```TeX
\begin{flushleft}
	文字列1\\
	文字列2
\end{flushleft}
```

# ドキュメントクラス

1行目のドキュメントクラス指定は次のように記述します。

```TeX
\documentclass[オプション]{ドキュメントクラス}
```

`jsclasses`AKI_4互換クラス次の通りです。`jarticle`AKI_4等はJIS組版規則に合わないのでお勧めできません。現在は日本語組版処理の要件に準拠したAKI_4`jlreq`AKI_4が注目を浴びています。詳しくはAKI_4[jlreq (GitHub)](https://github.com/abenori/jlreq/blob/master/README-ja.md)AKI_4で説明されています。

| 種類    | ドキュメントクラス | 内容             |
| ------- | ------------------ | ---------------- |
| article | `jsarticle`        | 論文・レポート用 |
| book    | `jsbook`           | 書籍用           |

一部のオプションは次の通りです。

| オプション | 内容                           |
| ---------- | ------------------------------ |
| 11pt, 12pt | 本文の文字サイズ（11pt，12pt） |
| landscape  | 横長                           |
| twocolumn  | 2段組                          |
| fleqn      | 数式を左揃え                   |
| titlepage  | 独立したタイトルページ         |
| a4paper    | 用紙サイズをA4に指定           |
| b5paper    | 用紙サイズをB5に指定           |

# 目次AKI_4/AKI_4相互参照

LaTeXには自動で節やキャプションの参照が行えます。文書の一部を書き直すときも自動で変更してくれるのでとても便利です。

## 目次

目次を出力するには，挿入したい場所にAKI_4`\tableofcontents`AKI_4と書き，TeX ファイルを3回コンパイルしてください。同様に図や表の目次を出力したい場所にはAKI_4`\listoffigures`，`\listoftables`AKI_4と書いてください。

## 相互参照

節や図表の表題，式の後にAKI_4`\label{ラベル}`AKI_4を書くことで，その番号を参照したいところでAKI_4`\ref{ラベル}`AKI_4とすれば，対応する番号を参照できます。また，`\pageref{ラベル}`AKI_4とすればページ番号が参照できます。相互参照を使う場合には，TeXファイルを2回コンパイルする必要があります。

```TeX
本研究で用いた試験材料の外観を図\ref{fig:test}に示す。
\begin{figure}
	....
	\caption{実験装置の外観}
	\label{fig:test}
\end{figure}
```
```TeX
温度特性は，式(\ref{eq:test})で近似できる。
\begin{align}
	y = \exp(x) + c. \label{eq:test}
\end{align}
```

# 数式

## 本文中の数式

本文中に{{<eq>}}f(x) = ax + b{{</eq>}}のように数式を書くには次のようにAKI_4`$`AKI_4で挟むことでできます。

```TeX
本文中に$f(x) = ax + b$のように数式を書くには次のように\texttt{\$}で挟むことでできます。
```

## 別行立て数式

別行立て数式は，
{{<eq d>}}
\begin{align}
	f(x) &= ax + b\\
	g(x) &= cx^{2} + dx + e
\end{align}
{{</eq>}}
のように環境AKI_4`align`AKI_4により書くことができます[^align]。他の数式環境のAKI_4`eqnarray`AKI_4も有名だがAKI_4`amsmath.sty`AKI_4ではサポートしていないので推奨できません。

[^align]: このブログでは式番号が表示されないが，実際のTeXでは表示されます。また，TeXで式番号を表示しない場合は環境をAKI_4`align*`AKI_4とします。

```TeX
別行立て数式は，
\begin{align}
	f(x) &= ax + b\\
	g(x) &= cx^{2} + dx + e
\end{align}
のように環境により書くことができます。
```

# おわりに

今回は，(u)pLaTeXを中心にLaTeXの**ごく一部**を紹介をしました。本記事では以下に示すような紹介できてないです。

- 数式モード中でのコマンドなど
- 表
- 図（特にEPSとかPDFの話）

今後暇を見付けて記事のアップデートしていきたいと思います。楽しいLaTeXライフを願っています。

# 文献

1. [改訂第8版LaTeX2e美文書作成入門](https://www.amazon.co.jp/dp/B08MZ98Z1Q/)
2. [TeX Wiki](https://texwiki.texjp.org/)
3. [Overleaf](https://ja.overleaf.com/)
4. [Cloud LaTeX](https://cloudlatex.io/ja)
5. [LuaLaTeXのすゝめ](https://daiji256.github.io/posts/tex-latex/lualatex-susume/)
6. [jlreq (GitHub)](https://github.com/abenori/jlreq/blob/master/README-ja.md)
7. [LaTeXのすゝめ(Qiita)](https://qiita.com/Daiji256/items/9774df0899728feb3ab0)
