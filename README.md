## 開発環境

### 起動

```
$ docker compose up
```

### 停止

```
$ docker compose down
```

## テスト環境

### 起動

```
$ docker-compose -f docker-compose.e2e.yml up
```

### 停止

```
$ docker-compose -f docker-compose.e2e.yml down
```

### E2Eテスト実行

```
$ docker-compose -f docker-compose.e2e.yml up
$ docker exec -it e2e sh
$ yarn clean-build
$ yarn test:e2e
```

### PlaywrightCodeGen は Mac で実行する

**※ dockerンテナ内での実行は不可**

```
$ docker-compose -f docker-compose.e2e.yml up
$ yarn playwright install
$ yarn e2e:codegen http://localhost:3300
```
