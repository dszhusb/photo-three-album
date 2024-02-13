/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    transpilePackages: ['three'],
    webpack(config, { isServer }) {
        // Allow importing of shader files (e.g. `.glsl` -- filenames below)
        // @see: https://github.com/glslify/glslify-loader
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag|ps)$/,
            exclude: /node_modules/,
            use: ["raw-loader", "glslify-loader"],
        });

        return config;
    },
}

module.exports = nextConfig
