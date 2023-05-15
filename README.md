# 収支管理アプリ（バックエンド）
BalanceManagement（backend）は、未完成です。

[収支管理アプリ（フロントエンド）](https://github.com/sugama-satsuki/balance_management_frontend)で使用しています。
同じ階層に配置。

## ◆ 使用技術
- JavaScript
- MongoDB

-----
MongoDBを使用しています。
MongoDBのアカウントとデータベースを作成し、
プロジェクト内に.envファイルを作成します。

下記手順で、.envファイルに接続するための文字コードを記載します。


１）DBのConnectをクリック

<img width="200" alt="スクリーンショット 2023-05-08 8 48 05" src="https://user-images.githubusercontent.com/46039732/236708776-49d889e5-3eb2-455e-8724-b64262a0dd07.png">

２）`Connect to your application`の`Drivers`をクリック

<img width="400" alt="スクリーンショット 2023-05-08 8 48 19" src="https://user-images.githubusercontent.com/46039732/236708798-177b930f-d7fd-4fc0-a1d8-a93c009f048f.png">

３）`Add your connection string into your application code`の文字列をコピーする

<img width="400" alt="スクリーンショット 2023-05-08 8 48 31" src="https://user-images.githubusercontent.com/46039732/236708840-30cfafcd-8fb8-4ed4-a7c5-d065448b8237.png">

４）作成した.envファイルに下記を記述し、`<password>`部分をDB作成時のパスワードに置き換える
```MONGOURL = 3)でコピーした文字列```
