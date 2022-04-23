# docker-compose.yml の書き方

```
version: '3'

services:
  db:
    image: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${パスワードを設定してください。}
  api:
    build:
      context: ./api/
      dockerfile: Dockerfile
    command: /bin/sh -c "rm -f /rails-react-app/tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    image: ikko3dayo/api
    volumes:
      - ./api:/rails-react-app
      - ./api/vendor/bundle:/rails-react-app/vendor/bundle
    environment:
      RAILS_ENV: development
      ALLOW_HOST: localhost:8000 (フロントのホスト名)
      IS_HTTPS: 'false' (SSL通信するかどうか)
      CERT_PATH: /etc/fullchain.pem (let's encrypt で作ったファイルのパス / オプション)
      KEY_PATH: /etc/privkey.pem (let's encrypt で作ったファイルのパス / オプション)
      PORT: 3001 (立ち上げるポート。デフォルトは3000 / オプション)
    ports:
      - 3000:3000
    depends_on:
      - db
  front:
    build:
      context: ./front/
      dockerfile: Dockerfile
    volumes:
      - ./front/rails-react-app:/usr/src/app/rails-react-app
    command: sh -c "npm start"
    environment:
      REACT_APP_API_HOST: http://localhost:3001 (apiのホスト名)
      WS_HOST: ws://localhost:3001 (webSocketサーバーのホスト名)
    ports:
      - '8000:3000'
      - '6006:6006'
volumes:
  postgres-data:
    driver: local
```

これを参考に作ると上手くいくと思います。POSTGRES_PASSWORD のところにはパスワードを設定してください。

# 初期設定

docker-compose build
(初回起動時と Gemfile や package.json を変更した際に Build をしてください。)

# サーバーの立ち上げ

docker-compose up

# react アプリにライブラリを追加

docker-compose run front sh -c "cd rails-react-app && npm i ${some-library}"

# storybook サーバーの立ち上げ

docker-compose exec front sh -c "cd rails-react-app && npm run storybook"

# 環境

### front 側

node.js v17
React.js v18
Atomic Design に基づくファイル構成

### api 側

ruby v2.5
rails-api v5.2
