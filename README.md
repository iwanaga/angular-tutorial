# angular-tutorial
tutorial for angular with angular-cli

## セットアップ
### angular-cli
Node.js v6.10.2 をインストール

```bash
nvm install 6.10.2
nvm alias default 6.10.2

node -v
# => v6.10.2
npm -v
# => 3.10.10
```

angular-cli をインストール

```bash
npm install -g @angular/cli
```

### 雛形を作成する
ベストプラクティスに基づいたディレクトリ構造でファイルを自動生成し、依存モジュールをインストールする。

```bash
ng new todo-app
```

### アプリをブラウザで表示

```bash
ng serve -o
```
`ng serve --open` と等価。このコマンドだけで下記を実現。
- WebPack を用いて TypeScript を JavaScript にトランスパイル。
- http://localhost:4200 をバインドした Web サーバを起動。
- コード変更をウォッチ。差分が発生すると、自動的にトランスパイルして自動的にブラウザリロードを実行させる。

ng serve の機能一覧を見る

```bash
ng serve --help
```

## アプリが表示されるまでに何が行われているの？
1. `/index.html` を開く。ブラウザでアプリの JavaScript を実行し終えたら、`app-root` エレメントを `AppComponent` でトランスクルードする。
    - `AppComponent` の定義は `src/app/app.comonent.ts` に記述。

```typescript
@Component({
  selector: 'app-root',                 // transclude ターゲット
  templateUrl: './app.component.html',  // HTML. Angularではtemplateと呼ぶ。
  styleUrls: ['./app.component.css']    // 依存する CSS ファイル
})
export class AppComponent {  // コントローラ。template に提供する値や処理を記述する。
  title = 'app works!';      // 「コントローラインスタンスのプロパティ」と「template」は双方向バインディングされる。
}
```

2. template コンパイルとバインディング

```html
<h1>
  {{title}}
</h1>
```

`{{ }}` 内のコードは Angular で evaluate される。evaluate 結果で置換される。
- この場合、`AppComponent` インスタンスの `title` プロパティの評価結果は `'app works!'`。
- `{{title}}` は `app works!` に置換される。

### ここで押さえて欲しいこと
1. 値と処理を宣言するだけでいい。実行をフレームワークにお任せできるので、コーディング量が超絶的に少ない。
2. スクリプトの値をテンプレートにバインディングをするときは、`{{ }}` 内に記述する。これによって、アプリの本質でない処理 (エレメントを取得して子要素を作って、text node に代入) でコードが埋め尽くされることが無い。値変更後の DOM 更新忘れと無縁。
3. angular-cli の ng serve は Live Reload 機能を備えている。これまで、コード修正の度にトランスパイルしてブラウザリロードを手作業で行っていた人は、感動するべし。

### バインディングを体験
template の `{{title}}` をいくつか書き替えてみよう。

| `{{title}}` | 説明 |
| :--- | :--- |
| `{{1 + 1}}` | evaluation 結果は 2 |
| `{{ {} }}` | 評価結果がプリミティブ型じゃないとき。`{}.toString()` |
| `{{foo}}` | undefined は空文字列に置換。`(undefined).toString()` エラーを心配しなくていい　|

### Pipe (旧称Filter) で感動してみる
センスの良さに、惚れるはず。
template の `{{title}}` を更に次のように書いてみよう。

#### DecimalPipe

| template | result | memo |
| :--- | :--- |
| `{{1000 | number}}` | `1,000` | `,` を入れて見やすくしてくれる。 |
| `{{1 | number: '3.0-0'}}` | `001` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |
| `{{12.34 | number: '1.1-1'}}` | `12.3` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |

https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html

#### DatePipe
まず、`AppComponent` にプロパティを追加。
(template で `{{new Date()}}` という記載がエラーになるため)

```typescript
export class AppComponent {
  title: string = 'app works!';
  now  : Date   = new Date();
}
```

| template | result | memo |
| :--- | :--- | :--- |
| `{{now}}` | `Sat Apr 29 2017 20:44:46 GMT+0900 (JST)` | `(new Date()).toString()` |
| `{{now | date }}` | `Apr 29, 2017` | |
| `{{now | date: 'y年M月d日 HH:mm'}}` | `2017年4月29日 20:57` | |
| `{{now | date: 'MM/dd HH:mm'}}` | `04/29 21:00` | |

https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html

#### Pipe 一覧
https://angular.io/docs/ts/latest/api/#!?query=pipe

### 双方向バインディング


## 単体テスト

## End to End テスト (E2E test)

## Directive

## Service と Dependency Injection

## Angular Component の凄まじい生産性
- angular-material
