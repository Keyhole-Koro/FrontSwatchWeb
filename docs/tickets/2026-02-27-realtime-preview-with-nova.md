# Ticket: Realtime Preview + Nova推論編集基盤（MVP）

## 背景
- ユーザーがWebリポジトリをアップロードし、クラウド上で起動した結果を確認できるようにしたい。
- 本サービスは「起動したユーザーサイト」と「FrontSwatch（理想デザイン）」を見比べながら、指示に応じてデザインを改善する体験が目的。
- 本番デプロイは不要。まずはセッション単位のプレビュー環境でリアルタイム反映を実現する。

## 画面要件（固定）
- 左: ユーザーサイト Preview
- 右: FrontSwatch / 理想デザイン
- 下部または右下: 指示入力（チャット/コマンド）
- 進行状態表示: `QUEUED` / `ANALYZING` / `PATCHING` / `READY` / `FAILED`

## スコープ（MVP）
- リポジトリアップロード（zip）
- セッション作成と一時Preview URL発行
- Novaによる編集案推論（差分生成）
- 差分適用後のリアルタイム反映（WebSocket経由）
- 失敗時のロールバックとエラー表示

## 非スコープ（MVP外）
- 本番デプロイ（独自ドメイン公開、CDN配信最適化）
- 複数ユーザー同時共同編集
- 高度な権限管理（SSO/組織ロール）

## アーキテクチャ
- Frontend (Next.js): 2カラムUI + WebSocket client + Preview iframe
- API Gateway + Lambda:
  - `POST /sessions`（セッション作成、upload URL返却）
  - `POST /sessions/{id}/start`（実行環境起動）
  - `POST /sessions/{id}/commands`（ユーザー指示投入）
  - `GET /sessions/{id}`（状態取得）
- Realtime Gateway (WebSocket API): 状態イベント配信
- S3:
  - `uploads`（zip）
  - `session-artifacts`（作業成果物/差分ログ）
- Runtime (ECS Fargate想定): セッション単位の開発サーバー起動（HMR）
- Orchestrator (Step FunctionsまたはLambdaワーカー): Nova推論呼び出し、適用制御
- Bedrock Nova: 指示→差分JSON出力（提案のみ）
- DynamoDB: セッション状態・履歴
- EventBridge Scheduler: TTL後のセッション掃除

## Nova連携設計
- 入力:
  - ユーザー指示文
  - 対象リポジトリの構造と関連ファイル
  - FrontSwatch側の参照情報（デザイントークン/スクリーン）
  - 直近エラー
- 出力（厳格JSON）:
  - `files_to_edit`
  - `unified_diff`
  - `reason`
  - `confidence`
- 実行ポリシー:
  - Novaは提案のみ（直接実行不可）
  - Patch Engineが差分検証後に適用
  - 失敗時は1回だけ再推論、失敗継続ならロールバック

## Realtimeイベント（WebSocket）
- `SESSION_READY`（プレビュー起動完了）
- `INFERENCE_STARTED` / `INFERENCE_COMPLETED`
- `PATCH_APPLY_STARTED` / `PATCH_APPLY_COMPLETED`
- `PREVIEW_UPDATED`（iframe再読み込みトリガ）
- `PATCH_FAILED`（エラー要約 + ロールバック結果）

## APIレスポンス要件
- `GET /sessions/{id}` 返却項目:
  - `status`
  - `previewUrl`
  - `lastErrorSummary`
  - `logsUrl`
  - `lastAppliedPatchId`
  - `layout`: `{ left: "user-preview", right: "frontswatch-reference" }`

## 受け入れ条件
1. UIで常に「左=ユーザーPreview、右=FrontSwatch参照」が維持される。
2. 指示送信後、30秒以内に初回の状態更新イベントが届く。
3. 差分適用成功時、画面リロードなしでPreviewに変更が反映される。
4. 差分適用失敗時、直前の正常状態へ自動ロールバックされる。
5. 失敗時にユーザーへ要約エラーとログ導線が表示される。

## 実装タスク
1. Frontend: 2カラム固定レイアウト実装（左Preview/右FrontSwatch）。
2. Frontend: セッション作成・アップロード・状態表示UI実装。
3. Frontend: WebSocket購読とイベント別UI更新実装。
4. Backend: `sessions` API群（作成/開始/指示/取得）実装。
5. Backend: Runtime起動（セッション単位）とTTL削除実装。
6. Backend: Nova推論呼び出し + JSONスキーマ検証 + Patch Engine実装。
7. Backend: 差分適用、検証、ロールバック処理実装。
8. Observability: セッション単位ログ、失敗時エラー要約保存。

## リスクと対策
- リスク: 未知プロジェクトで差分適用失敗が多発
  - 対策: ルールベース前処理 + Nova再推論1回 + 手動修正導線
- リスク: リアルタイム体感が遅い
  - 対策: 長時間処理を段階イベントで可視化、HMR前提ランタイム採用
- リスク: セッションコスト増
  - 対策: 非アクティブTTL短縮（例: 30分）

## 完了定義（DoD）
- ステージ環境でE2E動作:
  - zipアップロード→セッション起動→指示→Nova推論→差分適用→Preview反映
- 受け入れ条件1-5を満たす。
- 運用に必要なログ（セッションID単位）が確認可能。
