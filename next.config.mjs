/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的書き出し。trailingSlash で /publicnotice/ が publicnotice/index.html になる
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
