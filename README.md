# Tucil3_13521042_13521088

# Program Mencari Rute Terdekat pada Peta
> Program yang digunakan untuk mencari rute terdekat dari simpul pada peta dengan algoritma UCS dan A*. Program ini dibuat sebagai pemenuhan Tugas Kecil 3 Strategi Algoritma IF2211.

## Table of Contents
* [Deskripsi Singkat](#deskripsi-singkat)
* [Requirement](#requirement)
* [Cara Menggunakan Program](#cara-menggunakan-program)
* [Author](#author)

## Deskripsi Singkat
- Program dapat digunakan untuk mencari rute terdekat dari simpul asal ke simpul tujuan
- Pengguna dapat memasukkan input file txt berisi matriks ketetanggaan dan koordinat simpul
- Pengguna dapat menggunakan marker pada google map untuk memasukan koordinat simpul
- Pengguna dapat memasukkan simpul asal dan simpul tujuan dari simpul-simpul yang terdapat di file masukan
- Program akan menampilkan rute terdekat berdasarkan pencarian menggunakan algoritma UCS dan A* dan menampilkan jaraknya

## Requirement
- yarn: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
- Node.js: https://nodejs.org/en/download 

## Cara Menggunakan Program
- Program dapat digunakan dengan meng-clone repository ini. Kemudian pada directory src/app, compile program dengan command `yarn install`. Untuk menjalankan program dapat dilakukan dengan command `npm start`
- Format file masukan:
```
<jumlah_node>
<nama_node><spasi>:<spasi><koordinat_x>,<koordinat_y>
<nama_node><spasi>:<spasi><koordinat_x>,<koordinat_y>
...
<nama_node><spasi>:<spasi><koordinat_x>,<koordinat_y>
<adjacency_matrix>
```
Ket: jumlah node harus sesuai dengan masukan setelahnya.
contoh:
```
8
MasjidAgungBuahBatu : -6.9545,107.63908
Mayapada : -6.94855,107.63389
GerbangTol : -6.96203,107.63848
Samsat : -6.94556,107.64184
BKR : -6.93696,107.62268
Gatsu : -6.92478,107.62778
ImbrahimAdjie : -6.9319,107.64319
Margacinta : -6.95582,107.65511
0.00000 0.00875 0.00840 0.01060 0.00000 0.00000 0.00000 0.01780
0.00875 0.00000 0.00000 0.00937 0.01790 0.00000 0.00000 0.00000
0.00840 0.00000 0.00000 0.00000 0.00000 0.00000 0.00000 0.00000
0.01060 0.00937 0.00000 0.00000 0.00000 0.00000 0.01520 0.00000
0.00000 0.01790 0.00000 0.00000 0.00000 0.00000 0.00000 0.00000
0.00000 0.00000 0.00000 0.01470 0.00000 0.00000 0.01860 0.00000
0.00000 0.00000 0.00000 0.01520 0.00000 0.01860 0.00000 0.00000
0.01780 0.00000 0.00000 0.00000 0.00000 0.00000 0.00000 0.00000
```

## Author
- Kevin John Wesley Hutabarat (13521042)
- Puti Nabilla Aidira (13521088)
