---
title: "ヒードランは，十字のツメを食いこませて TeX や TikZ を這い回る。"
date: 2021-02-28
categories: [TeX-LaTeX]
tags: [ネタ,TikZ]
katex: true
---

※この記事は Qiita に投稿**していた**内容です。

# はじめに

先日（2021-02-27）にポケットモンスターダイヤモンド・パールのリメイクのブリリアントダイヤモンド・シャイニングパールが発表されました。15 年間もヒードランは壁や天井を這い回っていました。たまには他の場所も這い回りたいことでしょう。ここではヒードランに TeX と TikZ[^tikz] を這い回ってもらいます。

[^tikz]: Ti*k*Z と表示すべきだけど，タイトルと統一するためにローマン体にしています。

# 基礎知識

前提となる基礎知識は以下のリンクを参考にしてください。

- [TeX (TeX Wiki)](https://texwiki.texjp.org/TeX)
- [TikZ/PGF (TeX Wiki)](https://texwiki.texjp.org/TikZ)
- [ヒードラン (ピクシブ)](https://dic.pixiv.net/a/%E3%83%92%E3%83%BC%E3%83%89%E3%83%A9%E3%83%B3)

# TeX を這い回る

まずは TeX を這い回ってもらいます。ただヒードランの画像を `\includegraphics` によって貼り付けるだけです。

```TeX
\includegraphics[scale=4]{Heatran.png}
```

{{< figure src="./images/heatran-1.jpg" width="320" >}}

# TikZ を這い回る

TeX を這い回るだけでは面白くありません。なので TikZ でドット絵を描いて這い回ってもらいます。ドット絵は大量の四角で描きます。枠無しで色を塗ると環境によっては隙間が見えてしまいます。なので，太さ `thin` の枠を設定しています。$Y$ 軸は下が正になっているので，マイナスにしています。

```TeX
\begin{tikzpicture}
	\draw [thin,fill,color={rgb,255:red,R;green,G;blue,B}] (X,-Y) rectangle (X+1,-Y-1);
\end{tikzpicture}
```

手作業で全ドットを描いたら大変なので，Python+OpenCV にやってもらいましょう。背景のドットは無視します。後は全画素に応じてカラーコードの設定と座標の設定をしています。当たり前ですけど，見た目は変わりません。

```Python
img = cv2.imread(sys.argv[1], cv2.IMREAD_UNCHANGED)

print("\\begin{tikzpicture}")
for i in range(img.shape[1]):
    for j in range(img.shape[0]):
        if img[i,j,3] == 0:
            continue
        print(
            '\t\\draw [thin,fill,color={{rgb,255:red,{};green,{};blue,{}}}] ({},{}) rectangle ({},{});'.format(
                img[i,j,2], img[i,j,1], img[i,j,0], j, -i, j+1, -i-1
            )
        )
print("\\end{tikzpicture}")
```

{{< figure src="./images/heatran-2.jpg" width="320" >}}

# まとめ

ヒードランが壁と天井以外を這い回りました。リメイク作品でもゴキゴキしてるか楽しみです。

# 文献

1. [ソースコード (GitHub)](https://github.com/Daiji256/TeX-TikZ-Heatran)
2. [TeX (TeX Wiki)](https://texwiki.texjp.org/TeX)
3. [TikZ/PGF (TeX Wiki)](https://texwiki.texjp.org/TikZ)
4. [ヒードラン (ピクシブ)](https://dic.pixiv.net/a/%E3%83%92%E3%83%BC%E3%83%89%E3%83%A9%E3%83%B3)
