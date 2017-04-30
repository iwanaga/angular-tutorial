# angular-tutorial
tutorial for angular with angular-cli

## 0. なぜ Angular か？
1. テストの容易さ、拡張性の高さがズバ抜けて素晴らしいから
2. Directive を使うことで、必要な UI パーツを短時間で実装できるから。
3. Single Page Application を実装するための機能を Full stack で備えているから。不足している機能に悩むことが無い。

## 1. セットアップ
### 1-1. angular-cli
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

### 1-2. 雛形を作成する
ベストプラクティスに基づいたディレクトリ構造でファイルを自動生成し、依存モジュールをインストールする。

```bash
ng new todo-app --routing
```

### 1-3. アプリをブラウザで表示

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

## 2. アプリが表示されるまでに何が行われているの？
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

## 3. バインディングを体験
template の `{{title}}` をいくつか書き替えてみよう。

| angular expression | 説明 |
| :--- | :--- |
| `{{1 + 1}}` | evaluation 結果は 2 |
| `{{ {} }}` | 評価結果がプリミティブ型じゃないとき。`{}.toString()` |
| `{{foo}}` | undefined は空文字列に置換。`(undefined).toString()` エラーを心配しなくていい　|

## 1〜3　までのおさらい
1. 値と処理を宣言するだけでいい。
    - 実行をフレームワークにお任せできるので、コーディング量が超絶的に少ない。
2. スクリプトの値をテンプレートにバインディングをするときは、`{{ }}` 内に記述する
    - これによって、アプリの本質でない処理 (エレメントを取得して子要素を作って、text node に代入) でコードが埋め尽くされることが無い。
    - 値変更後の DOM 更新忘れと無縁になる。
3. angular-cli の ng serve は Live Reload 機能を備えている。
    - これまで、コード修正の度にトランスパイルしてブラウザリロードを手作業で行っていた人は、感動モノ。

## 4. ページを追加
次の Step で Pipe の説明をするので、PipeComponent というコンポーネントを生成する。
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

## 5. Pipe (旧称Filter) で感動してみる
センスの良さに、惚れるはず。
`src/app/pipe/pipe.component.html` に次の Angular 式を書いてみよう。

### 5-1. DecimalPipe

| angular expression | result | memo |
| :--- | :--- | :--- |
| <code>{{1000 &#124; number}}</code> | `1,000` | `,` を入れて見やすくしてくれる。 |
| <code>{{1 &#124; number: '3.0-0'}}</code> | `001` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |
| <code>{{12.34 &#124; number: '1.1-1'}}</code> | `12.3` | `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}` |

https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html

### 5-2. DatePipe
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

### 5-3. Pipe 一覧
https://angular.io/docs/ts/latest/api/#!?query=pipe

## 6. 双方向バインディング
これまでやってきたのは、Controller から Template への単方向バインディングだった。
Template で発生したユーザのアクション (inputフォームへの文字入力) を Controller へ伝搬する例を解説する。

まず、新しくページを追加する。

```bash
ng g component form
```

パス `/form` と結びつける。
```typescript
const routes: Routes = [
  {
    path: 'pipe',
    component: PipeComponent
  },
  { // ここから下を追記する
    path: 'form',
    component: FormComponent
  }
];
```

ささっと form をマークアップ。
```html
<div>
  <label>name: </label>
  <input type="text" [(ngModel)]="task.name" (ngModelChange)="setUpdatedAt($event)" #name="ngModel" required minlength="2" maxlength="10">
</div>
<br>
<h3>タスク</h3>
<div>タスク名：{{task.name}}</div>
<div>最終更新：{{task.updatedAt | date: 'MM/dd hh:mm:ss'}}</div>
```

コントローラにモデルクラスを定義。
```typescript
export class Task {
  id: number;
  name: string;
  updatedAt: Date;
}
```

モデルに適当な初期値を指定。
```typescript
export class FormComponent implements OnInit {
  task: Task = {
    id: 1,
    name: '掃除',
    updatedAt: new Date()
  };
  ...  
}
```

validation error を表示する方法はいくつかあるが、一番簡単な方法はこれ。
```html
<div *ngIf="name.errors && (name.dirty || name.touched)">
  <div [hidden]="!name.errors.required">
    Name is required
  </div>
  <div [hidden]="!name.errors.minlength">
    Name must be at least 2 characters long.
  </div>
  <div [hidden]="!name.errors.maxlength">
    Name cannot be more than 10 characters long.
  </div>
</div>
```
※ `name.dirty` や `name.touched` にアクセスするためには、input に指定した `#name="ngModel"` が必要。


## 7. Directive
Angular の核となる哲学は、「処理」と「DOM」の分離である。

もし Controller 内で DOM を操作しようとすれば、「DOMを取得し、要素を追加し、Text Nodeを修正」のような旧来のコードが再び現れることになり、Angular の長所を台無しにしてしまう。

では、DOM を操作するときはどうするべきか？そこで登場するのが Structural Directive である。
Structural Directive は HTML のレイアウトをするために存在すると理解してよい。

Structural Directive の使い方を習得するために、まずは新しくページを追加する。

```bash
ng g component directive
```

`app-routing.module.ts` にルーティング定義を追記。
```typescript
const routes: Routes = [
  {
    path: 'pipe',
    component: PipeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'directive',
    component: DirectiveComponent
  }
];
```

### 7-1. *ngFor
テーブルやリスト作成では、Array を enumerate して要素を生成する場合が多い。
*ngFor は、この繰り返し DOM 生成を行うための directive である。

`directive.component.ts` にリストの元となるデータを定義する。
通常は Ajax でサーバから取得するデータだが、今回は簡単のため Controller 内にハードコードする。

```typescript
export class DirectiveComponent implements OnInit {
  taskList = [
    { id: 1, name: '掃除',    dueDate: new Date() },
    { id: 2, name: '洗濯',    dueDate: new Date() },
    { id: 3, name: 'ゴミ捨て', dueDate: new Date() },
    { id: 4, name: '資料作り', dueDate: new Date() },
    { id: 5, name: '執筆',    dueDate: new Date() }
  ];
  ...
}
```

`directive.component.html` で `*ngFor` を使ってマークアップする。

```html
<h3>Directive Examples</h3>
<h4>*ngFor</h4>
<ul>
  <li *ngFor="let task of taskList">
    <span>{{task.name}}</span> <span style="color: #999">{{task.dueDate | date: 'MM/dd hh:mm'}}</span>
  </li>
</ul>
```

### 7-2. *ngIf
- 書式
    - `<div *nfIf="angular-expression"></div>`
- 機能
    - angular-expression が true であれば、DOM を生成する。
    - angular-expression が false であれば、子要素も含めて DOM を生成しない。
- ユースケース
    - form validation 結果に応じたエラーメッセージの文字表示／非表示

```typescript
export class DirectiveComponent implements OnInit {
  ...
  isActivated = true;
  ...
  switchActivationState() {
    this.isActivated = !this.isActivated;
  }
}
```

```html
<h4>*ngIf</h4>
<div>isActivated: {{isActivated}}</div>
<button (click)="switchActivationState()">isActivatedの値を反転する</button>
<br><br>
<div *ngIf="isActivated">Activated</div>
<div *ngIf="!isActivated">Not Activated</div>
```

メモ：`<button (click)="switchActivationState()"></button>` でしている attribute は [Event Binding Directive](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#event-binding) と呼び、
書式は `(eventname)="eventHandler($event)"` である。

## ここまでのまとめ
- DOM 操作は必ず Directive で行う。そうしないと、Angular の長所が台無しになる。

## 8. Service と Dependency Injection
Ajax でサーバからデータを取得する処理は、複数の Controller で使いたい場合が多い。

このような機能は Service と呼ばれる Singleton 生成機構で定義し、Dependency Injection 機構によって Component 内で利用できるようにする。 

では、`/api/v1/tasks` リソースに GET, POST, PUT, DELETE する API クライアントを Service で実装してみよう。

```bash
ng generate service task
```

現状、3rd party module [ngx-resource](https://github.com/troyanskiy/ngx-resource) を利用するのが一番簡単。

```bash
cd angular-tutorial/todo-app/
npm install ngx-resource --save
```

```bash
ng generate component task
```

`app-routing.module.ts` にルーティングを追加。

```typescript
  {
    path: 'task',
    component: TaskComponent
  }
```

Service を実装する。

```typescript
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Resource, ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';

interface TaskQueryParams {
  name?: string
  dueDate?: Date
}

@Injectable()
@ResourceParams({
  url: '/api/v1/tasks'
})
export class TaskService extends Resource {
  @ResourceAction({ path: '/', isArray: true })
  index: ResourceMethod<TaskQueryParams, any>;

  @ResourceAction({ path: '/{!id}' })
  show: ResourceMethod<{id: number}, any>
}
```

[Dependency Injection](https://angular.io/docs/ts/latest/guide/dependency-injection.html) を使って、TaskService を利用できるようにする。

Dependency Injection の存在意義は、
1. Service や Factory の sub-dependency を気にする必要が無いこと
2. 実体を Provider で抽象化しているので、単体テストをするとき、API リクエスト処理を Mock に置き換えるのが簡単にできる。

Dependency Injection の方法は、Controller の constructor 引数に渡すだけ。
下記の場合、`ServiceName` という Service を利用できるようにしている。Controller の中では、`this.accessor_name_to_service` で Service にアクセスする。

```typescript
constructor(private accessor_name_to_service: ServiceName) { }
```
TypeScript の constructor は、`super` を必ず call する。
Component Class の constructor は、引数

実際に TaskComponent を実装する。

```typescript
import { Component, OnInit } from '@angular/core';
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks = [];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.index();
  }
}
```

## 9. 単体テスト
```bash
ng test
```

## 10. End to End テスト (E2E test)
```bash
ng e2e
```

## 11. Production 環境用にビルド
```bash
ng build --target=production
```

## 12. Angular Component の凄まじい生産性
- [angular-material](https://material.angular.io/components)
    - これを使うと、`<md-input-container><input></md-input-container>` みたいなマークアップだけでアニメーション付きのオサレな入力フォームが作れる。
    - 生産性が高すぎるので、ハッカソン御用達。

## 13. 参考情報
- [Template Syntax](https://angular.io/docs/ts/latest/guide/template-syntax.html)
