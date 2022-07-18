const path = require("path");
const HtmlWPP = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                }
            }
        ]
    },
    entry: "./src/index.js",
    output: {
        path: path.resolve("C:\\Users\\Mauricio Beltrán\\Documents\\NetBeansProjects\\GESPASS\\src\\main\\webapp"),
        filename: 'bundle.js'
    },
    devServer: {
        port: 4000
    },
    plugins: [
        new HtmlWPP({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ]
}