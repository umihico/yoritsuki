/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的書き出し。trailingSlash で /publicnotice/ が publicnotice/index.html になる
  output: 'export',
  trailingSlash: true,
  // CSSをHTMLへインライン化（レンダリングを止める外部CSSのラウンドトリップを削減）
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
