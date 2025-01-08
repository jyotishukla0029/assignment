import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                async_hooks: false, // Exclude async_hooks for client-side
            };
        }
        return config;
    },
};

export default nextConfig;
