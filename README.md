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

angular-cli の auto-completion を利用できるようにする

```bash
ng completion --bash >> ~/.bash_profile
source ~/.bash_profile
```

### 雛形を作成する
ベストプラクティスに基づいたディレクトリ構造でファイルを自動生成し、依存モジュールをインストールする。

```bash
ng new todo-app --routing
```

参考

| 生成対象 | コマンド例 |
| :--- | :--- |
| Component | `ng g component my-new-component` |
| Directive | `ng g directive my-new-directive` |
| Pipe | `ng g pipe my-new-pipe` |
| Service | `ng g service my-new-service` |
| Class | `ng g class my-new-class` |
| Guard | `ng g guard my-new-guard` |
| Interface | `ng g interface my-new-interface` |
| Enum | `ng g enum my-new-enum` |
| Module | `ng g module my-module` |

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

## バインディングを体験
template の `{{title}}` をいくつか書き替えてみよう。

| angular expression | 説明 |
| :--- | :--- |
| `{{1 + 1}}` | evaluation 結果は 2 |
| `{{ {} }}` | 評価結果がプリミティブ型じゃないとき。`{}.toString()` |
| `{{foo}}` | undefined は空文字列に置換。`(undefined).toString()` エラーを心配しなくていい　|

## Pipe (旧称Filter) で感動してみる
センスの良さに、惚れるはず。
まず、新しくページを追加する。

```bash
ng g component pipe
```

リクエストパス `/pipe` と `PipeComponent` を紐付けるために、
`app-routing.module.ts` にルーティング定義を追加。

```typescript
const routes: Routes = [
  {
    path: 'pipe',
    component: PipeComponent
  }
];
```

http://localhost:4200/pipe にアクセス。

`src/app/pipe/pipe.component.html` に次の Angular 式を書いてみよう。

### DecimalPipe

| angular expression | result | memo |
| :--- | :--- | :--- |
| <code>{{1000 &#124; number}}</code> | `1,000` | `,` を入れて見やすくしてくれる。 |
| <code>{{1 &#124; number: '3.0-0'}}</code> | `001` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |
| <code>{{12.34 &#124; number: '1.1-1'}}</code> | `12.3` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |

https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html

### DatePipe
`PipeComponent` にプロパティを追加。
(template で `{{new Date()}}` という記載がエラーになるため)

`src/app/pipe/pipe.component.ts` にバインディングする変数 `now` を追加

```typescript
export class PipeComponent implements OnInit {
  now: Date = new Date();  // これを追記
  constructor() { }

  ngOnInit() {
  }

}
```

`src/app/pipe/pipe.component.html` に次の Angular 式を書いてみよう。

| angular expression | result | memo |
| :--- | :--- | :--- |
| <code>{{now}}</code> | `Sat Apr 29 2017 20:44:46 GMT+0900 (JST)` | `(new Date()).toString()` |
| <code>{{now &#124; date }}</code> | `Apr 29, 2017` | |
| <code>{{now &#124; date: 'y年M月d日 HH:mm'}}</code> | `2017年4月29日 20:57` | |
| <code>{{now &#124; date: 'MM/dd HH:mm'}}</code> | `04/29 21:00` | |

https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html

### Pipe 一覧
https://angular.io/docs/ts/latest/api/#!?query=pipe

## 双方向バインディング
これまでやってきたのは、Controller から Template への単方向バインディングだった。
Template で発生したユーザのアクション (inputフォームへの文字入力) を Controller へ伝搬する例を解説する。

まず、新しくページを追加する。

```bash
ng g component form-component
```

## ワンタイムバインディング
バインディングするために、Angular では値の変化をウォッチしている。監視対象が増えるほど、処理が遅くなる。
値を変更しないものは、ワンタイムバインディングを使うようにし、性能劣化を抑えよう。

## 単体テスト
```bash
ng test
```

## End to End テスト (E2E test)
```bash
ng e2e
```

## Production 環境用にビルド
```bash
ng build --target=production
```

## Directive

## Service と Dependency Injection

## Angular Component の凄まじい生産性
- angular-material
