---
title: "[翻訳] Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos"
date: 2021-08-08
categories: [論文]
tags: [Deep learning,struct2depth,翻訳,まとめ]
katex: true
---

"Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos" の翻訳 / 解説を行います．

# 概要

- カメラは他のセンサに比べ安価であるため，RGB カメラからの深度とエゴモーション[^egomotion]推定は有益である．
- 単眼 RGB 動画像から深度とエゴモーション推定を教師なし学習で実現する．
- 従来法より高品質な結果を得るために，背景と動く物体をモデル化し，学習プロセスに幾何学的構造を導入することです。
- 未知の領域に適応させるために、オンラインでの改良法を導入する．
- 提案する手法は，モーション処理を含め，すべて最先端の手法よりも優れている．
- 結果は，ステレオカメラを利用したものと同等の品質であった．
- 物体の動きを多く含むデータセットでの深度推定を大幅に改善した．
- ソースコードは[ここ](https://sites.google.com/view/struct2depth)にある．

[^egomotion]: カメラ（視点）の移動量のこと．

# 文献

1. [Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)
2. [struct2depth](https://sites.google.com/view/struct2depth)


