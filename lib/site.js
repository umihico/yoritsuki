// サイト全体の基準URL。og:image / canonical / sitemap / robots / JSON-LD が参照する。
// 優先順位: NEXT_PUBLIC_SITE_URL > (devサーバー時: localhost:3000) > 本番ドメイン
// ローカル検証ビルドは `npm run build:local`（localhost:8642）を使う。
// デフォルトを本番ドメインに倒してあるため、デプロイ時に環境変数を忘れても事故らない。
const fallback =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://yoritsuki.co.jp';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;
