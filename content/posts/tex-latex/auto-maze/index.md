---
title: "TeX で迷路を自動生成（expl3）"
date: 2021-12-14
categories: [TeX-LaTeX]
tags: [expl3]
---

この記事は，[TeX & LaTeX Advent Calendar 2021](https://adventar.org/calendars/6724/) の 14 日目の記事です。13 日目は [h-kitagawa さん](https://qiita.com/h-kitagawa/items/de963380bd3e576ab4e3/) でした。15 日目は mod_poppo さん です。

# はじめに

そろそろクリスマスです。つまりクリスマスプレゼントの準備が必要になります。というわけで本記事では expl3 で迷路を自動生成してみます。これでクリスマスプレゼントには困りません！ 年賀状に迷路を描くのもいいですね。（皆さんは年賀状をもちろん TeX で書いてると思うので。）

作成したスタイルファイル等は [ここ](https://github.com/Daiji256/auto-maze/) にあります。expl3 初心者なんで，いろいろと微妙なところがあると思います。温かい目で見てください。

# 目標

`\maze[seed]{width}{height}` のように乱数の Seed 値（未指定の場合はシステム時刻（？）），幅，高さを指定して下の画像のように迷路を生成するマクロを作成します。迷路生成のアルゴリズムには穴掘り法にします[^bar]。アルゴリズムの実装にはもちろん expl3 を使います。迷路は TikZ で描きます。下の画像は `\maze[0][24][18]` の出力です。

[^bar]: 棒倒し法で作ってみたら，すごく微妙な迷路になったので穴掘り法で書き直しました。

[{{< figure src="./images/auto-maze-sample-24-18.svg" class="center" width="360" height="273" >}}](https://github.com/Daiji256/auto-maze/blob/main/auto-maze-sample.pdf)

# 実装

このような構成でスタイルファイルを作ります。

```TeX
\RequirePackage{expl3, xparse, tikz}
\ProvidesExplPackage {auto-maze} {...} {...} {...}
% 変数宣言
\NewDocumentCommand \maze { o m m }
  {
    % 迷路データの生成
    % 迷路の出力
  }
```

## 定数 / 変数宣言

迷路データの生成に使う定数と変数について簡単に説明します。

迷路の壁（`\c__atmz_wall_int`）と道（`\c__atmz_road_int`）をそれぞれ定数で宣言します。

`\l__atmz_arg_width_int` と `\l__atmz_arg_height_int` はマクロの引数（`#2`，`#3`）に対応するもので，迷路の壁の厚さを 0，道の幅を 1 とした迷路のサイズの値です。

`\l__atmz_maze_prop` に迷路の情報を格納します。`key` には迷路のセル番号とし値を `\c__atmz_wall_int` か `\c__atmz_road_int` とします。セル番号とは，左から `x` 列目，迷路の上から `y` 行目のセルの場合に `y * \l__atmz_maze_width_int + x` となる値のことです。`\l__atmz_maze_width_int` は `\l__atmz_arg_width_int * 2 + 1 + 2`（`height` も同様）となる値です。[迷路データの生成](#迷路データの生成) の画像を見るとわかりやすいです。

他の変数については後で説明します。

```TeX
\int_const:Nn \c__atmz_wall_int { \c_one_int }
\int_const:Nn \c__atmz_road_int { \c_zero_int }
\int_new:N  \l__atmz_arg_width_int
\int_new:N  \l__atmz_arg_height_int
\int_new:N  \l__atmz_maze_width_int
\int_new:N  \l__atmz_maze_height_int
\prop_new:N \l__atmz_maze_prop
\int_new:N  \l__atmz_loop_i_int
\int_new:N  \l__atmz_loop_j_int
\int_new:N  \l__atmz_x_int
\int_new:N  \l__atmz_y_int
\int_new:N  \l__atmz_tmp_int
\int_new:N  \l__atmz_key_int
\int_new:N  \l__atmz_rand_int
\seq_new:N  \l__atmz_rand_box_seq
\bool_new:N \l__atmz_loop_i_bool
\int_new:N  \l__atmz_now_int
\int_new:N  \l__atmz_count_tblr_int
```

## Seed 値の指定

オプションで Seed 値が指定されたら `\sys_gset_rand_seed:n` で Seed 値を設定します。

```TeX
\IfNoValueF { #1 } { \sys_gset_rand_seed:n { #1 } }
```

## 迷路データの生成

ここでは `\l__atmz_maze_prop` を下の画像のようにすることを目的とします。穴掘り法による迷路生成がわかっていることを前提に簡単に説明します。

{{< figure src="./images/maze-4-3.svg" class="center" width="440" height="360" >}}

### 初期化

まずは外周を道，その内部を壁とします。最初のループでは全てを壁にしています。次のループでは左側と右側を，最後のループでは上側と下側を道にしています。

```TeX
\int_set:Nn \l__atmz_loop_i_int { 1 }
\int_do_while:nn { \l__atmz_loop_i_int < \l__atmz_maze_height_int - 1 }
  {
    \int_set:Nn \l__atmz_loop_j_int { 1 }
    \int_do_while:nn { \l__atmz_loop_j_int < \l__atmz_maze_width_int - 1 }
      {
        \int_set:Nn \l__atmz_key_int { \l__atmz_loop_i_int * \l__atmz_maze_width_int + \l__atmz_loop_j_int }
        \prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_wall_int
        \int_incr:N \l__atmz_loop_j_int
      }
    \int_incr:N \l__atmz_loop_i_int
  }
\int_set:Nn \l__atmz_loop_i_int { 0 }
\int_do_while:nn { \l__atmz_loop_i_int < \l__atmz_maze_height_int }
  {
    \int_set:Nn \l__atmz_key_int { \l__atmz_loop_i_int * \l__atmz_maze_width_int }
    \prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_road_int
    \int_set:Nn \l__atmz_key_int { \l__atmz_loop_i_int * \l__atmz_maze_width_int + \l__atmz_maze_width_int - 1 }
    \prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_road_int
    \int_incr:N \l__atmz_loop_i_int
  }
\int_set:Nn \l__atmz_loop_j_int { 0 }
\int_do_while:nn { \l__atmz_loop_j_int < \l__atmz_maze_width_int }
  {
    \int_set:Nn \l__atmz_key_int { \l__atmz_loop_j_int }
    \prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_road_int
    \int_set:Nn \l__atmz_key_int { ( \l__atmz_maze_height_int - 1 ) * \l__atmz_maze_width_int + \l__atmz_loop_j_int }
    \prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_road_int
    \int_incr:N \l__atmz_loop_j_int
  }
```

### 穴掘り地点を決める

`\l__atmz_now_int` が現在の穴掘り地点です。この値は下の画像のような値です。`\l__atmz_maze_prop` とは違う管理方法になっています。`\fp_eval:n { randint(...) }` で乱数で `\l__atmz_now_int` を決めます。そして `\l__atmz_key_int` を求め，`\l__atmz_maze_prop` の `\l__atmz_key_int` を道（`\c__atmz_road_int`）とします。

{{< figure src="./images/arg-4-3.svg" class="center" width="328" height="248" >}}

```TeX
\int_set:Nn \l__atmz_now_int { \fp_eval:n { randint( 0, \l__atmz_arg_width_int * \l__atmz_arg_height_int - 1 ) } }
\int_set:Nn \l__atmz_x_int { ( \int_mod:nn { \l__atmz_now_int } { \l__atmz_arg_width_int } ) * 2 + 2 }
\int_set:Nn \l__atmz_y_int { \fp_eval:n { floor( \l__atmz_now_int / \l__atmz_arg_width_int ) } * 2 + 2 }
\int_set:Nn \l__atmz_key_int { \l__atmz_y_int * \l__atmz_maze_width_int + \l__atmz_x_int }
\prop_put:NVV \l__atmz_maze_prop \l__atmz_key_int \c__atmz_road_int
```

### 掘り進める

[穴掘り地点を決める](#穴掘り地点を決める) で決めた `\l__atmz_now_int` から穴を掘り進めます。もし掘り進めることができない場合は，新たな地点に飛びそこから掘り進めます。迷路が完成したら `\l__atmz_loop_i_bool` を `false` にしてループを終了します。

```TeX
\bool_set_true:N \l__atmz_loop_i_bool
\bool_do_while:Nn \l__atmz_loop_i_bool
  {
    % 2 つのセルを掘る
    % 掘り進めることができない場合，新しい地点を決める
  }
```

#### 2 つのセルを掘る

まず `\l__atmz_now_int` から `\l__atmz_key_int` を求めます。

```TeX
\int_set:Nn \l__atmz_x_int { ( \int_mod:nn { \l__atmz_now_int } { \l__atmz_arg_width_int } ) * 2 + 2 }
\int_set:Nn \l__atmz_y_int { \fp_eval:n { floor( \l__atmz_now_int / \l__atmz_arg_width_int ) } * 2 + 2 }
\int_set:Nn \l__atmz_key_int { \l__atmz_y_int * \l__atmz_maze_width_int + \l__atmz_x_int }
```

現在のセルから移動できる方向の数を数えます。2 マス先が壁である場合掘れるので，4 方向で掘れる場合は `\l__atmz_count_tblr_int` をインクリメントしてます。綺麗なコードではないですが，単純ですね。

```TeX
\int_set:Nn \l__atmz_count_tblr_int { 0 }
\int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int - \l__atmz_maze_width_int * 2 }
\prop_get:NVN \l__atmz_maze_prop \l__atmz_tmp_int \l__atmz_maze_value_tl
\int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
  { \int_incr:N \l__atmz_count_tblr_int }
\int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int + \l__atmz_maze_width_int * 2 }
\prop_get:NVN \l__atmz_maze_prop \l__atmz_tmp_int \l__atmz_maze_value_tl
\int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
  { \int_incr:N \l__atmz_count_tblr_int }
\int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int - 2 }
\prop_get:NVN \l__atmz_maze_prop \l__atmz_tmp_int \l__atmz_maze_value_tl
\int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
  { \int_incr:N \l__atmz_count_tblr_int }
\int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int + 2 }
\prop_get:NVN \l__atmz_maze_prop \l__atmz_tmp_int \l__atmz_maze_value_tl
\int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
  { \int_incr:N \l__atmz_count_tblr_int }
```

`\l__atmz_count_tblr_int` が 0 の場合には掘り進めることができません。`\l__atmz_count_tblr_int` が 0 でない場合を考えます。1 ～ `\l__atmz_count_tblr_int` の乱数（`\l__atmz_rand_int`）を取得し，それに対応した方向に掘り進めればいいです。

`\l__atmz_rand_int` に対応した向きの 2 マス先の状態を取得し，壁でないなら（道ならば）`\l__atmz_rand_int` をインクリメントします。この処理にすることで，`\l__atmz_rand_int` が移動できない場合は次の向きに任せることができるからです。また，`\l__atmz_rand_int` の最大値は `\l__atmz_count_tblr_int` となっているため，4 までにからなず掘り進めることができます。

掘り進めることができる場合には，1 マス先と 2 マス先のセルを道にします。そして `\l__atmz_now_int` を更新します。また，`\l__atmz_rand_box_seq` に `\fp_eval:n { randint( 0, 262143 ) } * 4096 + \l__atmz_now_int` となる値を追加します。これは掘り進めることができなくなった場合のためのメモになります。具体的には [新しい地点を決める](#新しい地点を決める) で説明します。

```TeX
\int_compare:nNnF { \l__atmz_count_tblr_int } = { 0 }
  {
    \int_set:Nn \l__atmz_rand_int { \fp_eval:n { randint( 1, \l__atmz_count_tblr_int ) } }
    \int_compare:nNnT { \l__atmz_rand_int } = { 1 }
      {
        \int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int - \l__atmz_maze_width_int * 2 }
        \prop_get:NVN \l__atmz_maze_prop \l__atmz_tmp_int \l__atmz_maze_value_tl
        \int_compare:nNnTF { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
          {
            \int_set:Nn \l__atmz_now_int { \l__atmz_now_int - \l__atmz_arg_width_int }
            \int_set:Nn \l__atmz_rand_int { \fp_eval:n { randint( 0, 262143 ) } * 4096 + \l__atmz_now_int }
            \seq_put_right:Nx \l__atmz_rand_box_seq { \int_use:N \l__atmz_rand_int }
            \int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int - \l__atmz_maze_width_int }
            \prop_put:NVV \l__atmz_maze_prop \l__atmz_tmp_int \c__atmz_road_int
            \int_set:Nn \l__atmz_tmp_int { \l__atmz_key_int - \l__atmz_maze_width_int * 2 }
            \prop_put:NVV \l__atmz_maze_prop \l__atmz_tmp_int \c__atmz_road_int
          }
          { \int_incr:N  \l__atmz_rand_int }
      }
    \int_compare:nNnT { \l__atmz_rand_int } = { 2 }
      {
        % ...
      }
    \int_compare:nNnT { \l__atmz_rand_int } = { 3 }
      {
        % ...
      }
    \int_compare:nNnT { \l__atmz_rand_int } = { 4 }
      {
        % ...
      }
  }
```

#### 新しい地点を決める

掘り進めることができない（`\l__atmz_count_tblr_int` が 0 の）場合に新しく掘り進める地点を決めます。新しい地点の条件は，これまで掘り進めた道上であることです。これまで作成した道を `\l__atmz_rand_box_seq` でメモしているため，これを使います。

`\l__atmz_rand_box_seq` が空の場合掘り進めることができないので，ループを終了します。`\l__atmz_rand_box_seq` が空で無い場合を考えます。`\l__atmz_rand_box_seq` の値は `乱数 * 4096 + 地点` となっています。この `乱数 * 4096` は新しい地点の優先順位を表しています。`seq` をソートする `\seq_sort:Nn` が l3sort によって提供されているので，ソートして先頭から pop します。pop した値の 4096 で割ったあまりが新しい地点なので，`\l__atmz_now_int` を更新します。

```TeX
\int_compare:nNnT { \l__atmz_count_tblr_int } = { 0 }
  {
    \seq_if_empty:NTF \l__atmz_rand_box_seq
      {
        \bool_set_false:N \l__atmz_loop_i_bool
      }
      {
        \seq_sort:Nn \l__atmz_rand_box_seq
          {
            \int_compare:nNnTF { ##1 } < { ##2 }
              { \sort_return_swapped: }
              { \sort_return_same: }
          }
        \seq_pop_left:NN \l__atmz_rand_box_seq \l__atmz_rand_box_left_tl
        \int_set:Nn \l__atmz_now_int { \int_mod:nn { \l__atmz_rand_box_left_tl } { 4096 } }
      }
  }
```

## 出力

冒頭でも説明したとおり迷路は TikZ で描きます。`\begin{tikzpicture}...\end{tikzpicture}` のようなトークンを出力するようにします。

`\l__atmz_maze_tl` にトークンを加えていき，最後に `\tl_use:N \l__atmz_maze_tl` します。

まずループでは，迷路の内側を描きます。偶数行目と奇数行目で縦線か横線かを描くかが異なるので，分岐して処理してます。最後に，外枠にスタートとゴールが 1 マス開くように線を引きます。

```TeX
\tl_set:Nn \l__atmz_maze_tl { }
\tl_put_right:Nn \l__atmz_maze_tl { \begin{tikzpicture}[x=8pt, y=8pt, line~width=1pt, line~cap=round] }
\int_set:Nn \l__atmz_loop_i_int { 2 }
\int_do_while:nn { \l__atmz_loop_i_int < \l__atmz_maze_height_int - 2 }
  {
    \int_compare:nNnTF { \int_mod:nn { \l__atmz_loop_i_int } { 2 } } = { 0 }
      {
        \int_set:Nn \l__atmz_loop_j_int { 3 }
        \int_do_while:nn { \l__atmz_loop_j_int < \l__atmz_maze_width_int - 2 }
          {
            \int_set:Nn \l__atmz_x_int { \l__atmz_loop_j_int / 2 }
            \int_set:Nn \l__atmz_y_int { \l__atmz_loop_i_int / 2 }
            \int_set:Nn \l__atmz_key_int { \l__atmz_loop_i_int * \l__atmz_maze_width_int + \l__atmz_loop_j_int }
            \prop_get:NVN \l__atmz_maze_prop \l__atmz_key_int \l__atmz_maze_value_tl
            \int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
              {
                \tl_put_right:Nx \l__atmz_maze_tl
                  {
                    \exp_not:N \draw (\int_use:N \l__atmz_x_int, \int_use:N \l__atmz_y_int)--++(0, 1);
                  }
              }
            \int_set:Nn \l__atmz_loop_j_int { \l__atmz_loop_j_int + 2 }
          }
      }
      {
        \int_set:Nn \l__atmz_loop_j_int { 0 }
        \int_do_while:nn { \l__atmz_loop_j_int < \l__atmz_maze_width_int - 2 }
          {
            \int_set:Nn \l__atmz_x_int { \l__atmz_loop_j_int / 2 }
            \int_set:Nn \l__atmz_y_int { \l__atmz_loop_i_int / 2 }
            \int_set:Nn \l__atmz_key_int { \l__atmz_loop_i_int * \l__atmz_maze_width_int + \l__atmz_loop_j_int }
            \prop_get:NVN \l__atmz_maze_prop \l__atmz_key_int \l__atmz_maze_value_tl
            \int_compare:nNnT { \l__atmz_maze_value_tl } = { \c__atmz_wall_int }
              {
                \tl_put_right:Nx \l__atmz_maze_tl
                  {
                    \exp_not:N \draw (\int_use:N \l__atmz_x_int, \int_use:N \l__atmz_y_int)--++(1, 0);
                  }
              }
            \int_set:Nn \l__atmz_loop_j_int { \l__atmz_loop_j_int + 2 }
          }
      }
    \int_incr:N \l__atmz_loop_i_int
  }
\int_set:Nn \l__atmz_x_int { ( \l__atmz_maze_width_int - 4 ) / 2 }
\int_set:Nn \l__atmz_y_int { ( \l__atmz_maze_height_int - 4 ) / 2 }
\tl_put_right:Nx \l__atmz_maze_tl
  {
    \exp_not:N \draw (1, \int_use:N \l__atmz_y_int + 1)--++(\int_use:N \l__atmz_x_int, 0);
    \exp_not:N \draw (1, 1)--++(\int_use:N \l__atmz_x_int, 0);
    \exp_not:N \draw (1, 1)--++(0, \int_use:N \l__atmz_y_int - 1);
    \exp_not:N \draw (\int_use:N \l__atmz_x_int + 1, 2)--++(0, \int_use:N \l__atmz_y_int - 1);
  }
\tl_put_right:Nn \l__atmz_maze_tl { \end{tikzpicture} }
\tl_use:N \l__atmz_maze_tl
```

次のように実行すると，下の迷路が生成されます。

```TeX
\maze[0]{4}{3}
```

[{{< figure src="./images/auto-maze-sample-4-3.svg" class="center" width="328" height="260" >}}](https://github.com/Daiji256/auto-maze/blob/main/auto-maze-sample-4-3.pdf)

# さいごに

これは `\maze[0][64][64]` の出力です。生成に時間がかかります。遠くから見ると気持ち悪いですね。

[{{< figure src="./images/auto-maze-sample-64-64.svg" class="center" width="640" height="640" >}}](https://github.com/Daiji256/auto-maze/blob/main/auto-maze-sample-64-64.pdf)

# 謝辞

これを作るにあたって，[@zr_tex8r さん](https://twitter.com/zr_tex8r) と [@wtsnjp さん](https://twitter.com/wtsnjp/) から Twitter でたくさんの助言を頂いました[^ak]。ありがとうございました。

[^ak]: 謝辞を消したほうがいいなら，連絡ください。

# 文献

1. [TeX 言語者のための expl3 入門](https://blog.wtsnjp.com/2018/04/28/expl3-for-tex-users/)
2. [迷路生成（穴掘り法）](https://algoful.com/Archive/Algorithm/MazeDig/)
3. [auto-maze (GitHub)](https://github.com/Daiji256/auto-maze/)
