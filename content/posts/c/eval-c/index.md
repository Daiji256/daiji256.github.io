---
title: "C言語でeval風関数"
date: 2021-02-03
categories: [C]
tags: [eval,自作関数]
---

# はじめに

`eval`AKI_4関数とは文字列を式として評価する関数です。`eval`AKI_4はC言語などのコンパイラ言語にはほとんどないですが，JavaScriptなどのインタプリタ言語で一般的です。ここではC言語のための文字列を数式として処理するAKI_4`eval`AKI_4風関数を作成します。ソースコードはAKI_4[GitHub](https://github.com/Daiji256/eval)AKI_4にあげてあります。

# 主な仕様

`eval`AKI_4は引数の数式を計算し，その結果を戻り値とする関数にします。`eval`AKI_4ではAKI_4`sin`，`exp`，`sqrt`AKI_4などのAKI_4`math.h`AKI_4にある関数が使えるようにします。関数を含めた数式の計算順は次のようになります。計算過程は全て文字列として処理を行います。

1. 関数：`sin`，`exp`，`sqrt`AKI_4など
2. 括弧：`(`，`)`
3. 乗法，除法：`*`，`\`
4. 加法，減法：`+`，`-`

関数の計算を行うAKI_4`calcfunc`，四則演算を行うAKI_4`calc`AKI_4を作成します。括弧の処理にはAKI_4`eval`AKI_4を使用します。プログラムの疑似コード（？）と共に説明します。実際のソースコードは長いのでAKI_4[GitHub](https://github.com/Daiji256/eval)AKI_4を参照してください。実装は基本的に単純で，上記の箇条書きの順番通りに計算するだけです。

<!-- 本当は C だけど日本語がいい感じに表示されるように Java にしている -->
```java
double eval(char *str) {
	for (文字列先頭からループ) {
		if (関数があった時) {
			str2 = 関数とその引数;
			str3 = num2str(calcfunc(str2));
			str = str2 を str3 に置換;
		}
	}
	for (文字列先頭からループ) {
		if (括弧があった時) {
			str2 = 括弧内の文字列;
			str3 = num2str(eval(str2));
			str = (str2) を str3 に置換;
		}
	}
	for (文字列先頭からループ) {
		if (*, / があった時) {
			str2 = 計算範囲;
			str3 = num2str(calc(str2));
			str = str2 を str3 に置換;
		}
	}
	for (文字列先頭からループ) {
		if (+, - があった時) {
			str2 = 計算範囲;
			str3 = num2str(calc(str2));
			str = str2 を str3 に置換;
		}
	}
	return atof(str);
}
```

# 処理の流れの例

引数にAKI_4`3*sqrt(4)+(5-2)`AKI_4とした時を例にして説明します。まず都合が良くするために全体にAKI_4`(`，`)`AKI_4を付けます。

{{< figure src="./images/fig1.svg" class="center" width="320" height="114" >}}

次に計算の順番通りに関数を呼び出し計算します。

{{< figure src="./images/fig2.svg" class="center" width="320" height="343" >}}

次にAKI_4`*`，`\`AKI_4による計算をAKI_4`calc`AKI_4を用いて行います。最後にAKI_4`+`，`-`AKI_4による計算を行います。最終的に残った値を実数値としてAKI_4`return`AKI_4します。

# まとめ・今後

C言語用のAKI_4`eval`AKI_4風関数を作成しました。`calc`AKI_4等の関数について触れませんでしたが，説明を付け加えるかもしれません。ぜひ構文解析等の勉強に役立てばと思います。今後の課題としてメモリを多用する，処理速度が遅いなどが挙げられるので改善したいです。また，バグがあるかもしません。

# 文献

1. [ソースコード(GitHub)](https://github.com/Daiji256/eval)
2. [C言語でeval風関数(Qiita)](https://qiita.com/Daiji256/items/09fa042e94907a232c57)
