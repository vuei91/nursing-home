/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ];
    },
    output: "standalone",
};

export default nextConfig;
