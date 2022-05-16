---
title: "CuPyを使った画像の幾何学変換with OpenCV"
date: 2021-12-03
categories: [画像処理, Python]
tags: [CuPy, OpenCV]
strlen: 29
---

# はじめに

魚眼カメラで撮影した等距離射影方式の画像を，普通のカメラの中心射影方式のへの変換をするなどの，画像を幾何学的変換することがあります。僕は研究で，中央付近を大きく，外側を小さくする変換をするために使いました。

ここでは，等距離射影方式の画像を中心射影方式の画像に変換する場合を取り上げ，紹介していきます。

# なぜCuPyを使うのか

CuPyはNumPyと互換性を持つNVIDIAのGPUで動作することのできるライブラリです。幾何学変換は大量の画素を移動させるので，安直なループで実装すると処理時間が長いです。なので，GPUを使って並列化しようということです。

# 実装

作成したコード等はAKI_4[ここ](https://github.com/Daiji256/geometric-transformation/)AKI_4にあります。

## `import`

今回は画像を扱うライブラリにOpenCVを使います。`import`AKI_4するのはこの2つだけです。

```Python
import cv2
import cupy as cp
```

## ElementwiseKernel

CuPyで並列化を行うにはElementwiseKernelで簡単に実装できます。詳しくはAKI_4[CuPyのElementwiseKernelで楽にGPUの恩恵を受ける](https://qiita.com/bow-of-man/items/e4d8b3a2ca14c54511f1/)AKI_4で詳しく説明されています。

入力を変換前の画像AKI_4`img1`AKI_4とそのサイズAKI_4`size1`AKI_4と変換後のサイズAKI_4`size2`，出力を変換後の画像AKI_4`img2`AKI_4としています。ここでは簡単にするため入出力する画像は正方形を前提にします。

5--10行目では，変換前後の画素の関係を計算しています。計算式については説明を省きます。

11--13行目で変換後の画像に画素情報を格納しています。入力画像はRGBの3色あるのでこうなっています。変換後のAKI_4`i`[^i]AKI_4には，変換前のAKI_4`i2, j2`AKI_4にある画素を格納することになります。

[^i]: `i`AKI_4は2次元を1次元に変えた状態の座標なので，2次元で表すとAKI_4`i/size2, i%size2`AKI_4となります。

```Python
trans_kernel = cp.ElementwiseKernel(
    in_params='raw uint8 img1, int16 size1, int16 size2',
    out_params='raw uint8 img2',
    operation='''
        float x = (i % size2) - (size2 / 2.0) + 0.5;
        float y = (i / size2) - (size2 / 2.0) + 0.5;
        float ang1 = sqrt(float(x * x + y * y));
        float ang2 = 800 * atan(ang1 / 784); // Magic number: 800, 784
        int j2 = (ang2 * x / ang1) + (size1 / 2);
        int i2 = (ang2 * y / ang1) + (size1 / 2);
        img2[i * 3 + 0] = img1[(i2 * size1 + j2)*3 + 0];
        img2[i * 3 + 1] = img1[(i2 * size1 + j2)*3 + 1];
        img2[i * 3 + 2] = img1[(i2 * size1 + j2)*3 + 2];
    ''',
    name='trans_kernel'
)
```

## 入出力

1，2行目ではAKI_4`imread`AKI_4で読み込んだ画像AKI_4`img1`AKI_4をCuPyの配列に変換しています。3行目では変換後の画像を格納するための空の画像AKI_4`img2_cp`AKI_4を生成しています。

5行目では，`trans_kernel`AKI_4を呼び出し，GPUを使って並列処理をして変換します。

7，8行目でAKI_4`img2_cp`AKI_4をOpenCVで扱えるNumPy形式に変換し，出力します。

```Python
img1 = cv2.imread('img1.png')
img1_cp = cp.asarray(img1).astype(cp.uint8)
img2_cp = cp.zeros((1920, 1920, 3)).astype(cp.uint8)

trans_kernel(img1_cp, img1.shape[1], 1920, img2_cp, size=(1920 * 1920))

img2 = cp.asnumpy(img2_cp)
cv2.imwrite('img2.png', img2)
```

## 結果

結果は次のようになりました。

| 魚眼画像                                                                                                                                                       | 補正後                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [{{< figure src="./images/img1-comp.jpg" class="center" width="256" height="256" >}}](https://github.com/Daiji256/geometric-transformation/blob/main/img1.png) | [{{< figure src="./images/img2-comp.jpg" class="center" width="256" height="256" >}}](https://github.com/Daiji256/geometric-transformation/blob/main/img2.png) |

# ひとこと

この記事は僕が研究で使った内容の一部でもありますが，どちらかと言ったら後輩のために書いたメモです。Qiitaに投稿したら僕の中で一番LGTMが多くなったんですよね。やっぱり変人が好む物を書くより，一般的でメジャーな物の方がいいんですね。

# 文献

1. [geometric-transformation (GitHub)](https://github.com/Daiji256/geometric-transformation/)
2. [CuPyのElementwiseKernelで楽にGPUの恩恵を受ける(Qiita)](https://qiita.com/bow-of-man/items/e4d8b3a2ca14c54511f1/)
3. [CuPyを使った画像の幾何学変換with OpenCV (Qiita)](https://qiita.com/Daiji256/items/7fc08524533dc564e844/)
