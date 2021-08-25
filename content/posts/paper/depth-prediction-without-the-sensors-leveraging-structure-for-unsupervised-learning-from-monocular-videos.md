---
title: "[翻訳] Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos"
date: 2021-08-08
categories: [論文]
tags: [Deep learning,struct2depth,翻訳,まとめ]
katex: true
---

"[Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)" の翻訳 / 解説を行います．

# 概要 / はじめに

めんどくさいので箇条書きで...

## 背景 / 従来手法

- カメラは他のセンサに比べ安価であるため，RGB カメラからの深度とエゴモーション[^egomotion]推定は有益である．
- 教師あり学習による単一画像からの深度推定は成功している[^supervised]．しかし，教師あり学習は，高価な深度センサーが必要であり，**センサーのノイズが発生する問題がある**．
- 多くの教師なしの画像から深度推定する手法が提案されており，教師なしの深度推定モデルはセンサー教師ありのモデルよりも精度が高いことが実証されている．精度が良い要因は，センサーの画素の欠落やノイズが無いことである．
- ステレオカメラや独立したオプティカルフロー推定により，精度向上が行われた．

[^egomotion]: カメラ（視点）の移動量のこと．
[^supervised]: Eigen, Puhrsch, and Fergus 2014; Laina et al. 2016; Wang, Fouhey, and Gupta 2015; Li, Klein, and Yao 2017

## 提案手法

- **単眼 RGB 動画像から深度とエゴモーション推定を教師なし学習で実現する**．
- **キャリブレーションしていない単眼動画から学習できる**．
- Modeling Object Motion：画像中の物体の動きをモデル化し，**学習に幾何学的構造を導入する**．
- Imposing Object Size Constrains：物体サイズによる正則化する．
- Online-Refinement：推論実行時に，オンラインにパラメータをチューニングし，未知の領域に適応する．
- 提案する手法は，モーション処理を含め，すべて最先端の手法よりも優れている．
- 結果は，**ステレオカメラを利用したものと同等の品質であった**．
- 物体の動きを多く含む（ダイナミックな）動画の深度推定を大幅に改善した．
- ソースコードは[ここ](https://sites.google.com/view/struct2depth)にある．
- Geforce 1080ti で バッチサイズが 4 と 1 でそれぞれ 50 FPS と 30 FPS の速度で実行できる．

# 主な手法

主な学習方法は，単眼動画からの深度とエゴモーションを教師なしで学習する．ここでは，物体の動きをモデル化することで動的なシーンをモデル化することができ，オンラインでチューニングすることができる新しい手法を提案する．この 2 つのアイデアは関連していて，別々に，または共同で使用できる．本論文では，この 2 つのアイデアを個別に説明し，様々な実験で個別および共同の有効性を示す．

# 問題

3 枚の RGB 画像[^input-data] $(I_1, I_2, I_3) \in \mathbb{R}^{H \times W \times 3}$ と，カメラ固有行列 $K \in \mathbb{R}^{3 \times 3}$ を入力とする．深度推定ネットワーク $\theta : \mathbb{R}^{H \times W \times 3}$ は，エンコーダ・デコーダの畳込みニューラルネットワーク（CNN）で，1 つの RGB 画像から密な深度画像 $D_i = \theta(I_i)$ を生成する．エゴモーション推定ネットワーク $\psi_E : \mathbb{R}^{2 \times H \times W \times 3} \to \mathbb{R}^{6}$ は，2 つの RGB 画像対を入力とし，フレーム間の並進と回転パラメータ $E_{1 \to 2} = \psi_{E}(I_1, I_2) = (t_x, t_y, t_z, r_x, r_y, r_z)$ を生成する．同様に $E_{2 \to 3} = \psi_{E}(I_2, I_3)$ も生成する．

[^input-data]: 簡単のために，3 枚で説明する．4 枚以上でも可能である．

ある画像を次のフレームの画像にワープすることで，異なるカメラの視点からどう見えるかを想像することができる．シーンの奥行きが $\theta(I_i)$ によって得られるので，次のフレームへのエゴモーション $\psi_{E}$ は，シーンを次のフレームに変換し，投影によって次の画像を得ることができる．具体的には，微分可能な画像ワーピング演算子 $\phi(I_i, D_j, E_{i \to j}) \to \hat{I}_{i \to j}$ が再構成されれた $j$ 番目の画像である場合，対応する深度推定結果 $D_j$ とエゴモーション推定結果 $E_{i \to j}$ が与えられると，任意のソース RGB 画像 $I_i$ を $I_j$ にワープできる．実際は $\phi$ は変換された画像のピクセル座標から読み取り $\hat{I}^{xy}_{i \to j} = \hat{I}^{\hat{x}\hat{y}}_{i}$ を設定してワーピングを実行する．ここで $[x, y, 1]^\top = KE_{i \to j}(D^{xy}_{j} \cdot K^{-1}[x, y, 1]^\top)$ は投影された座標である．次に監視信号は，次のフレーム $\hat{I}_{i \to j}$ に投影されたシーンを RGB 空間の実際の次のフレーム $I_j$ 画像と比較する測光損失（photometric loss）を使用して確立される．たとえば，再構成損失 $L_{\text{rec}} = \min(\\|\hat{I}_{1 \to 2} − I_2\\|)$ を使用する．

# 文献

1. [Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)
2. [struct2depth](https://sites.google.com/view/struct2depth)
