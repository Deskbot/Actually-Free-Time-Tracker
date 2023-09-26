
const isProduction = process.env["MODE"] === "production"
const mode = isProduction ? "production" : "development"

module.exports = {

    // production comes with performance improvements
    // source maps can only be generated in dev mode
    mode,

    // performance
    cache: {
        type: 'filesystem'
    },

    // input output
    entry: "./src/main.ts",
    output: {
        path: __dirname + "/website/js",
        filename: "main.js",
    },

    experiments: {
        topLevelAwait: true
    },

    module: {
        rules: [
            // Allow TypeScript to be transpiled.
            // ts-loader reads the tsconfig.json file.
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },

            // Allow CSS to be bundled.
            // css-loader resolves imports inside CSS files
            // style-loader injects CSS into the DOM
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    resolve: {
        // If an import doesn't have an extension, check for files with these extensions.
        extensions: [".ts", ".js"]
    },

    // Enable source maps.
    // Different strategies for building source maps exist,
    // each with trade-offs in terms of build speed and how detailed the information is.
    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction
        ? undefined  // no source maps in production
        : "eval-source-map", // "Recommended choice for development builds with maximum performance."
}
