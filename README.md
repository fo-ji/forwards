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
$ yarn clean-build
$ yarn test:e2e
```

### PlaywrightCodeGen は Mac で実行する

**※ dockerンテナ内での実行は不可**

```
$ yarn playwright install
$ yarn e2e:codegen <テストコードを生成したい対象URL>
```
