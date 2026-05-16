/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // bật standalone mode thì mới build ra thư mục .next/standalone
  compress: true,
  reactStrictMode: true,
  logging: {
    fetches: {
      failed: true,
    },
  },
};

export default nextConfig;
