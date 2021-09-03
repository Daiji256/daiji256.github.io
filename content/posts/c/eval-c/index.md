---
title: "C 言語で eval 風関数"
date: 2021-02-03
categories: [C]
tags: [Qiita,eval,自作関数]
---

この記事は [Qiita](https://qiita.com/Daiji256/items/09fa042e94907a232c57) に投稿した内容です。

# はじめに

`eval` 関数とは文字列を式として評価する関数です。`eval` は C 言語などのコンパイラ言語にはほとんどないですが，JavaScript などのインタプリタ言語で一般的です。ここでは C 言語のための文字列を数式として処理する `eval` 風関数を作成します。ソースコードは [GitHub](https://github.com/Daiji256/eval) にあげてあります。

# 主な仕様

`eval` は引数の数式を計算し，その結果を戻り値とする関数にします。`eval` では `sin`，`exp`，`sqrt` などの `math.h` にある関数が使えるようにします。関数を含めた数式の計算順は次のようになります。計算過程は全て文字列として処理を行います。

1. 関数：`sin`，`exp`，`sqrt` など
1. 括弧：`(`，`)`
1. 乗法，除法：`*`，`\`
1. 加法，減法：`+`，`-`

関数の計算を行う `calcfunc` ，四則演算を行う `calc` を作成します。括弧の処理には `eval` を使用します。プログラムの疑似コード（？）と共に説明します。実際のソースコードは長いので [GitHub](https://github.com/Daiji256/eval) を参照してください。実装は基本的に単純で，上記の箇条書きの順番通りに計算するだけです。

<!-- 本当は c だけど日本語がいい感じに表示されるように java にしている -->
```java
double eval(char *str) {
	for ( 文字列先頭からループ ) {
		if ( 関数があった時 ) {
			str2 = 関数とその引数;
			str3 = num2str(calcfunc(str2));
			str = str2 を str3 に置換;
		}
	}
	for ( 文字列先頭からループ ) {
		if ( 括弧があった時 ) {
			str2 = 括弧内の文字列;
			str3 = num2str(eval(str2));
			str = (str2) を str3 に置換;
		}
	}
	for ( 文字列先頭からループ ) {
		if ( *, / があった時 ) {
			str2 = 計算範囲;
			str3 = num2str(calc(str2));
			str = str2 を str3 に置換;
		}
	}
	for ( 文字列先頭からループ ) {
		if ( +, - があった時 ) {
			str2 = 計算範囲;
			str3 = num2str(calc(str2));
			str = str2 を str3 に置換;
		}
	}
	return atof(str);
}
```

# 処理の流れの例

引数に `3*sqrt(4)+(5-2)` とした時を例にして説明します。まず都合が良くするために全体に `(`，`)` を付けます。

{{< figure src="./images/fig1.svg" class="center" width="320" height="114" >}}

次に計算の順番通りに関数を呼び出し計算します。

{{< figure src="./images/fig2.svg" class="center" width="320" height="343" >}}

次に `*`，`\` による計算を `calc` を用いて行います。最後に `+`，`-` による計算を行います。最終的に残った値を実数値として `return` します。

# まとめ・今後

C 言語用の `eval` 風関数を作成しました。`calc` 等の関数について触れませんでしたが，説明を付け加えるかもしれません。ぜひ構文解析等の勉強に役立てばと思います。今後の課題としてメモリを多用する，処理速度が遅いなどが挙げられるので改善したいです。また，バグがあるかもしません。

# 文献

1. [ソースコード (GitHub)](https://github.com/Daiji256/eval)

