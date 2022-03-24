# 初期設定

docker-compose build
(初回起動時と Gemfile や package.json を変更した際に Build をしてください。)

# サーバーの立ち上げ

docker-compose up

# react アプリにライブラリを追加

docker-compose run front sh -c "cd rails-react-app && npm i some-library"

# storybook サーバーの立ち上げ

docker-compose exec front sh -c "cd rails-react-app && npm run storybook"

# アプリ開発における共通認識

## 環境

### front 側

node.js v17
React.js v17
Atomic Design に基づくファイル構成

### api 側

ruby v2.5
rails-api v5.2
