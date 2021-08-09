---
title: "[翻訳] Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos"
date: 2021-08-08
categories: [論文]
tags: [Deep learning,struct2depth,翻訳,まとめ]
katex: true
---

"Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos" の翻訳 / 解説を行います．

# 概要 / はじめに

## 背景 / 従来手法

- カメラは他のセンサに比べ安価であるため，RGB カメラからの深度とエゴモーション[^egomotion]推定は有益である．
- 教師あり学習による単一画像からの深度推定は成功している[^supervised]．しかし．教師あり学習は，高価な深度センサーが必要であり，**センサーのノイズが発生する問題がある**．
- 多くの教師なしの画像から深度推定する手法が提案されており，教師なしの深度推定モデルはセンサー教師ありのモデルよりも精度が高いことが実証されている．精度が良い要因は，センサーの画素の欠落やノイズが無いことである．
- ステレオカメラや独立したオプティカルフロー推定により，精度向上が行われた．

## 提案手法

- **単眼 RGB 動画像から深度とエゴモーション推定を教師なし学習で実現する**．
- **キャリブレーションしていない単眼動画から学習できる**．
- 従来法より高品質な結果を得るために，背景と動く物体をモデル化し，学習プロセスに幾何学的構造を導入する．
- 未知の領域に適応させるために、オンラインでの改良法を導入する．
- 提案する手法は，モーション処理を含め，すべて最先端の手法よりも優れている．
- 結果は，**ステレオカメラを利用したものと同等の品質であった**．
- 物体の動きを多く含むデータセットでの深度推定を大幅に改善した．
- ソースコードは[ここ](https://sites.google.com/view/struct2depth)にある．
- Geforce 1080ti で バッチサイズが 4 と 1 でそれぞれ 50 FPS と 30 FPS の速度で実行できる．

[^egomotion]: カメラ（視点）の移動量のこと．
[^supervised]: Eigen, Puhrsch, and Fergus 2014; Laina et al. 2016; Wang, Fouhey, and Gupta 2015; Li, Klein, and Yao 2017

# 文献

1. [Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)
2. [struct2depth](https://sites.google.com/view/struct2depth)
