import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // L'image de couverture d'un produit (compressée dans le navigateur) est envoyée avec le formulaire
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
};

export default nextConfig;
