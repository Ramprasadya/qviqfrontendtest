/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "t3.gstatic.com" },
    ],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
