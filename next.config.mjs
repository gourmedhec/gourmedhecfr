/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",           // permet l’export statique
    basePath: "/gourmedhecfr",  // le nom exact du repo
    assetPrefix: "/gourmedhecfr/", // idem pour que les assets soient trouvés
  };
  
  export default nextConfig;
  