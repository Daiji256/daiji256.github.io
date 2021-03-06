---
title: "[翻訳] Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos"
date: 2021-11-09
categories: [論文]
tags: [Deep learning,struct2depth,翻訳,まとめ]
strlen: 43
---

"[Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)" の翻訳AKI_4/AKI_4解説を行います。まだ訳しきれてないですけど，もう書くのめんどくさいので公開します。

# 概要AKI_4/AKI_4はじめに

## 背景AKI_4/AKI_4従来手法

- カメラは他のセンサに比べ安価であるため，RGBカメラからの深度とエゴモーション[^egomotion]推定は有益である。
- 教師あり学習による単一画像からの深度推定は成功している[^supervised]。しかし，教師あり学習は，高価な深度センサーが必要であり，**センサーのノイズが発生する問題がある**。
- 多くの教師なしの画像から深度推定する手法が提案されており，教師なしの深度推定モデルはセンサー教師ありのモデルよりも精度が高いことが実証されている。精度が良い要因は，センサーの画素の欠落やノイズが無いことである。
- ステレオカメラや独立したオプティカルフロー推定により，精度向上が行われた。

[^egomotion]: カメラ（視点）の移動量のこと。
[^supervised]: Eigen, Puhrsch, and Fergus 2014; Laina et al. 2016; Wang, Fouhey, and Gupta 2015; Li, Klein, and Yao 2017

## 提案手法

- **単眼RGB動画像から深度とエゴモーション推定を教師なし学習で実現する**。
- **キャリブレーションしていない単眼動画から学習できる**。
- Modeling Object Motion：画像中の物体の動きをモデル化し，**学習に幾何学的構造を導入する**。
- Imposing Object Size Constrains：物体サイズによる正則化する。
- Online-Refinement：推論実行時に，オンラインにパラメータをチューニングし，未知の領域に適応する。
- 提案する手法は，モーション処理を含め，すべて最先端の手法よりも優れている。
- 結果は，**ステレオカメラを利用したものと同等の品質であった**。
- 物体の動きを多く含む（ダイナミックな）動画の深度推定を大幅に改善した。
- ソースコードはAKI_4[ここ](https://sites.google.com/view/struct2depth)AKI_4にある。
- Geforce 1080tiでバッチサイズが4と1でそれぞれ50 FPSと30 FPSの速度で実行できる。

# 手法

- 単眼動画からの深度とエゴモーションを教師なしで学習する。
- 物体の動きをモデル化することで，動的なシーンをモデル化し，オンラインチューニングすることができる新しい手法を提案する。
- この2つのアイデアは関連していて，別々または共同で使用できる。
- 2つのアイデアを個別に説明し，様々な実験で有効性を示す。

## 問題の設定

3枚のRGB画像[^input-data]{{<eq>}}(I_1, I_2, I_3) \in \mathbb{R}^{H \times W \times 3}{{</eq>}}と，カメラ固有行列{{<eq>}}K \in \mathbb{R}^{3 \times 3}{{</eq>}}を入力とする。深度推定ネットワーク{{<eq>}}\theta\colon \mathbb{R}^{H \times W \times 3}{{</eq>}}は，エンコーダ・デコーダの畳込みニューラルネットワーク（CNN）で，1つのRGB画像から密な深度画像{{<eq>}}D_i = \theta(I_i){{</eq>}}を生成する。エゴモーション推定ネットワーク{{<eq>}}\psi_E\colon \mathbb{R}^{2 \times H \times W \times 3} \to \mathbb{R}^{6}{{</eq>}}は，2つのRGB画像対を入力とし，フレーム間の並進と回転パラメータ{{<eq>}}E_{1 \to 2} = \psi_{E}(I_1, I_2) = (t_x, t_y, t_z, r_x, r_y, r_z){{</eq>}}を生成する。同様に{{<eq>}}E_{2 \to 3} = \psi_{E}(I_2, I_3){{</eq>}}も生成する。

微分可能な画像ワーピング演算子{{<eq>}}\phi(I_i, D_j, E_{i \to j}) \to \hat{I}_{i \to j}{{</eq>}}が再構築されれた{{<eq>}}j{{</eq>}}番目の画像である場合，対応する深度推定結果{{<eq>}}D_j=\theta(I_j){{</eq>}}とエゴモーション推定結果{{<eq>}}E_{i \to j}=\psi_{E}(I_i, I_j){{</eq>}}が与えられると，任意の画像{{<eq>}}I_i{{</eq>}}を{{<eq>}}I_j{{</eq>}}にワープできる。{{<eq>}}\phi{{</eq>}}は変換された画像のピクセル座標から読み取り{{<eq>}}\hat{I}^{xy}_{i \to j} = \hat{I}^{\hat{x}\hat{y}}_{i}{{</eq>}}を設定してワーピングする。ここで{{<eq>}}[x, y, 1]^\top = KE_{i \to j}(D^{xy}_{j} \cdot K^{-1}[x, y, 1]^\top){{</eq>}}は投影された座標である。監視信号は，次のフレーム{{<eq>}}\hat{I}_{i \to j}{{</eq>}}に投影されたシーンをRGB空間の実際の次のフレーム{{<eq>}}I_j{{</eq>}}画像と比較する測光損失（photometric loss）を使用して確立される。再構築損失{{<eq>}}L_{\text{rec}} = \min(\|\hat{I}_{1 \to 2} - I_2\|){{</eq>}}を使用する。

[^input-data]: 簡単のために，3枚で説明する。4枚以上でも可能である。

## アルゴリズムのベースライン

最近の研究[^recent-work]により，アルゴリズムの強力なベースラインを確立する。再構築損失は，前後のフレームのいずれかから中央のフレームへのワープの最小再構築損失として計算される。提案[^Godard]された
{{<eq d>}}
L_{\text{rec}} = \min(\|\hat{I}_{1 \to 2} - I_2\|, \|\hat{I}_{3 \to 2} - I_2\|),
{{</eq>}}
により重大なオクルージョンAKI_4/AKI_4ディスオクルージョン効果によるペナルティを回避できる。再構築損失に加えて，ベースラインはSSIM損失[^Wang]，深度平滑損失を使用し，学習中に深さの正規化を適用する。これは，先行研究[^Zhou]での成功を示している。全体の損失は4つのスケールで適用される
{{<eq d>}}
L = \alpha_{1}\sum_{i=0}^{3}L_{\text{rec}}^{(i)}+\alpha_{2}L_{\text{ssim}}^{(i)}+\alpha_{3}\frac{1}{2^i}L_{\text{sm}}^{(i)}.
{{</eq>}}
ここで{{<eq>}}\alpha_j{{</eq>}}はハイパーパラメータである。

[^recent-work]: Zhou et al. 2017; Godard, Aodha, and Brostow 2018
[^Godard]: Godard, Aodha, and Brostow 2018
[^Wang]: Wang et al. 2004
[^Zhou]: Zhou et al. 2017; Godard, Aodha, and Brostow 2017; Wang et al. 2018

## モーションモデル

個々の3Dオブジェクトのモーションの予測に特化したオブジェクトモーションモデル{{<eq>}}\psi_{M}{{</eq>}}を紹介する（図[^fig2]）。事前に求めたセグメンテーションマスクによって画像を補完する。{{<eq>}}\psi_{M}{{</eq>}}は3D空間内のオブジェクトごとの変換ベクトルを予測することを学習するようにタスクが設定される。ワープされた画像の計算は，以前の研究[^Zhou]のようにエゴモーションに基づく単一の投影だけでなく，適切に組み合わされる一連の投影でもある。静的背景は{{<eq>}}\psi_{E}{{</eq>}}に基づく単一のワープによって生成されるが，セグメント化されたすべてのオブジェクトは，最初に{{<eq>}}\psi_{E}{{</eq>}}次に{{<eq>}}\psi_{M}{{</eq>}}に従ってワープされた外観によって追加される。このアプローチは，オブジェクトの動きが3Dで学習され，推論で利用できるという点で，2D画像空間の動きにオプティカルフロー[^Yin]または3Dオプティカルフロー[^Yang]を使用した先行研究と異なる。このアプローチは，オブジェクトを3Dでモデル化するだけでなく，その場でオブジェクトの動きを学習する。これは，シーンおよび個々のオブジェクトごとに独立して深度をモデル化する原理的な方法である。

{{< figure src="./images/fig2.jpg" class="center" width="455" height="197" >}}

[^fig2]: 図は論文から引用。
[^Yin]: Yin. 2018
[^Yang]: Yang et al. 2018a

インスタンス整列セグメンテーションマスクを，シーケンス（{{<eq lr>}}I_1{{</eq>}}, {{<eq r>}}I_2{{</eq>}}, {{<eq r>}}I_3{{</eq>}}）内の各潜在的なオブジェクト{{<eq>}}i{{</eq>}}ごとに{{<eq>}}(S_{i,1}, S_{i,2}, S_{i,3}) \in \mathbb{N}^{H \times W}{{</eq>}}として定義する。静的シーン{{<eq>}}O_{0}(S)=1-\cup_{i}S_{i}{{</eq>}}のマスクを定義し，移動する可能性のあるオブジェクトに対応するすべての画像コンテンツを削除する。一方，{{<eq>}}j>0{{</eq>}}での{{<eq>}}O_{j}(S)=S_{j}{{</eq>}}は，オブジェクトのマスクのみを返す。静的シーンのマスクは，シーケンスをエゴモーションモデル関数にフィードする前に，アダマール積（要素ごとの乗算{{<eq r>}}\odot{{</eq>}}）によってシーケンス内のすべての画像に適用される。オブジェクトの動きをモデル化するには，最初にエゴモーションの推定を適用して，ワープされたシーケンス（{{<eq lr>}}\hat{I}_{1 \to 2}{{</eq>}}, {{<eq r>}}I_2{{</eq>}}, {{<eq r>}}\hat{I}_{3 \to 2}{{</eq>}}）と（{{<eq lr>}}\hat{S}_{1 \to 2}{{</eq>}}, {{<eq r>}}S_2{{</eq>}}, {{<eq r>}}\hat{S}_{3 \to 2}{{</eq>}}）を取得する。深度とエゴモーションの推定値が正しいと仮定すると，画像シーケンス内の不整合は，移動するオブジェクトによってのみ発生する。移動する可能性のあるオブジェクトの概要は，既成のアルゴリズム[^He]によって提供される（対象のデータセットのいずれでもトレーニングされていないオプティカルフロー[^Yang]を使用する以前の作業と同様）。画像内のすべてのオブジェクトインスタンスについて{{<eq>}}i{{</eq>}}番目のオブジェクトのオブジェクトモーション推定値{{<eq>}}M^{(i)}{{</eq>}}は次のように計算される。
{{<eq d>}}
M_{1 \to 2}^{(i)}, M_{2 \to 3}^{(i)}=\psi_M(\hat{I}_{1 \to 2} \odot O_i(\hat{S}_{1 \to 2}), I_2 \odot O_i(S_2), \hat{I}_{3 \to 2} \odot O_i(\hat{S}_{3 \to 2})).
{{</eq>}}
実際の3D動きベクトルは，それぞれの領域でのオブジェクトの動きの変換の前後の動きを追跡することによって取得される。これらの動きの推定値に対応して，予測された動きに従ってオブジェクトを移動する逆ワーピング操作が実行される。最終的なワープ結果は，移動するオブジェクト{{<eq>}}\hat{I}^{(i)}{{</eq>}}からの個々のワープとエゴモーション{{<eq>}}\hat{I}{{</eq>}}の組み合わせとなる。全てのワーピング{{<eq>}}\hat{I}_{1 \to 2}^{(F)}{{</eq>}}は，
{{<eq d>}}
\hat{I}_{1 \to 2}^{(F)}=\underbrace{\hat{I}_{1 \to 2} \odot V}_{\text{Gradient w.r.t.}\psi_E, \phi} + \sum_{i=1}^{N}\underbrace{\hat{I}_{1 \to 2}^{(i)} \odot O_i(S_2)}_{\text{Gradient w.r.t.}\psi_M, \phi},
{{</eq>}}
となり，{{<eq l>}}\hat{I}_{3 \to 2}^{(F)}{{</eq>}}に相当する。満たされていない領域が存在する可能性があるが，これらは最小損失計算によって暗黙的に処理される。このアルゴリズムは，推論で使用できるオブジェクトごとに個々の3Dモーションを自動的に学習する。

[^He]: He et al. 017

## オブジェクトサイズの制約

先行研究[^Godard]AKI_4[^Yang]では，ほぼ同じ速度で前方を移動する車が，無限の深さに投影されることが多いことであると指摘された。これは，オブジェクトが動かず，ネットワークがそれを無限に遠くにあると推定した場合，再投影損失がほぼゼロになるからである。先行研究では，この重大な制限[^Godard]AKI_4[^Wang]AKI_4[^Yang]が指摘しているが，ステレオ画像でデータセットを拡張する以外に解決策は無いと考えられていた。ただし，ステレオは単眼に比べ一般的ではなく，適用性が制限される。この問題に対処する別の方法を提案する。オブジェクトを非常に近くに配置し，小さいと仮定して，オブジェクトの動きを説明する。このアイデアは，モデルにオブジェクトのスケールを学習させ，3Dでオブジェクトをモデル化できるようにすることである。車の場合，{{<eq lr>}}D_{\text{approx}}(p; h) \approx f_y\frac{p}{h}{{</eq>}}（{{<eq l>}}fy \in \mathbb{R}{{</eq>}}は焦点距離，{{<eq l>}}p \in \mathbb{R}{{</eq>}}は実次元での事前の高さ，{{<eq l>}}h \in \mathbb{N}{{</eq>}}はピクセル単位のセグメンテーションの高さ）を使用して，セグメンテーションマスクとカメラの固有値が与えられた場合に，おおよその深度推定を取得できる。実際には，そのような制約を手作業で推定しないために，追加の入力を必要とせずに，ネットワークにすべての制約を同時に学習させる。各オブジェクト{{<eq>}}i \in \mathbb{N}^+{{</eq>}}のスケールで損失項を定義する。{{<eq l>}}t(i): \mathbb{N} \to \mathbb{N}{{</eq>}}が任意のオブジェクト{{<eq>}}i{{</eq>}}のカテゴリIDを定義し，{{<eq l>}}p_j{{</eq>}}が各カテゴリID{{<eq>}}j{{</eq>}}の前の学習可能な高さであるとする。{{<eq l>}}D{{</eq>}}を深度マップ推定，{{<eq l>}}S{{</eq>}}を対応するオブジェクトアウトラインマスクとする。次に，損失
{{<eq d>}}
L_{sc}=\sum_{i=1}^{N} \left\|\frac{D \odot O_i(S)}{\overline{D}}-\frac{D_{\text{approx}}(p_{t(i)}; h(O_{i}(S))) \odot O_i(S)}{\overline{D}}\right\|,
{{</eq>}}
は，セグメント化されたすべてのオブジェクトが無限の深さに縮退することを防ぎ，ネットワークに妥当な深さだけでなく，一致するオブジェクトの動きの推定値も生成される。中間フレームの平均推定深度である{{<eq>}}\overline{D}{{</eq>}}でスケーリングして，事前確率と深度予測範囲を共同で縮小することにより，些細な損失削減の潜在的な問題を軽減する。これは3Dの完全な単眼トレーニングセットアップで一般的な変性症例に対処する方法である。この制約はモデリング定式化の不可欠な部分であるため，モーションモデルは最初から{{<eq>}}L_{sc}{{</eq>}}でトレーニングされる。ただし，この追加の損失は，すでにトレーニングされたモデルに適用するときに誤った深度推定値を正常に修正できることを確認した。移動するオブジェクトの深度を修正することで機能する。

## テスト時間の絞り込みモデル

単一フレームの深度推定器を持つことで，幅広い適用性を持つ。連続する予測は不整合または不連続であるため，画像で連続的な深度推定を実行する場合にコストがかかる。これらは，2つの主要な問題によって引き起こされる。

1. モデルに実スケールとの関連がないため，隣接するフレーム間でスケーリングが一致しないこと。
2. 深度予測の時間的一貫性が低いこと。

オンライン最適化を効果的に実行することでこれらを解決し，推論を実行しながら学習を継続すること手法を提案する。これにより，非常に限られた時間分解能でも，定性的および定量的に深度予測の品質を大幅に向上できる。よって通常は無視できる1フレームの遅延で，メソッドをリアルタイムでオンラインで実行できる。オンラインでの改善は，モデルを動的に微調整する{{<eq>}}N = 20{{</eq>}}に対して実行される。{{<eq l>}}N{{</eq>}}は，オンラインチューニングの活用と，過学習を防ぐこととの適切な妥協点を決定する。オンライン改善アプローチは，すべてのモデルに適用できる。

# 実験結果

深度推定，エゴモーション推定，転移学習についての以下に示すデータセットを用いて評価実験を行う。

- KITTI：深度推定，エゴモーション推定のベンチマークに使用する。
- Cityscapes：微調整することなくトレーニングや転移学習ができるかの評価に使用する。
- Fetch Indoor Navigation：転移学習により，屋内ナビゲーションでの評価に使用する。

## KITTIでの結果

ベースライン及び先行研究に比べ大幅に推定精度を改善することができた（図と表は省略）。さらに，単眼の推定にも関わらず，ステレオによる推定に近い精度が得られた。

## Cityscapesでの結果

提案されたアプローチの絶対相対誤差が{{<eq>}}0.205{{</eq>}}から{{<eq>}}0.153{{</eq>}}に大幅に改善されていることから，この方法の利点を明確に示している。これは，最新の誤差{{<eq>}}0.233{{</eq>}}のコンテキストで特に印象的であった。また，モーションモデルとリファインメントモデルの両方によって，個別に，または共同で改善が達成されていることがわかる。

## 結論と今後の課題

この論文では，個々のオブジェクトの動きを3Dでモデル化することにより，単眼の深度とエゴモーションの問題に対処する。また，適当な動画で学習を適応させ，新しいデータセットまたは環境に応用できるオンライン改良手法を提案した。このアルゴリズムは，確立されたベンチマークで最高のパフォーマンスを実現し，動的なシーンに対してより高品質の結果を生成を実現した。将来的には，より多くの時間情報を組み込むために，より長いシーケンスにリファインメント方法を適用を考えている。今後の作業では，提案された深度とエゴモーションの推定方法によって可能になる完全な3Dシーンの再構築にもできると考える。

# 文献

1. [Depth Prediction Without the Sensors: Leveraging Structure for Unsupervised Learning from Monocular Videos](https://arxiv.org/abs/1811.06152)
2. [struct2depth](https://sites.google.com/view/struct2depth)
