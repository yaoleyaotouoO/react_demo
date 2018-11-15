const path = require("path");
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        // 告诉服务器从哪里提供内容
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',
        // 启用gzip压缩
        compress: true,
        port: 9000
    },
    // 入口
    context: path.join(__dirname, 'src'),
    entry: {
        app: "./index.tsx"
    },
    // output 为输出, path 代表路径, filename 代表文件名称
    output: {
        filename: "[name].js",
        path: __dirname + 'dist'
    },
    // 启用源代码包调试WebPACK的输出
    devtool: "source-map",
    resolve: {
        // 将 .ts 和 .tSx 添加为可解析扩展, 主要解决 import 报错
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
    },
    module: {
        rules: [
            {
                test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
                exclude: /node_modules/,
                // Babel 是代码转换器, 比如将 ES6 转成 ES5 , 或者将 JSX 转成 JS
                loader: 'babel-loader',
                options: {
                    // presets 预设  
                    presets: ['react', 'es2015', 'stage-0', 'mobx'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /(\.ts)|(\.tsx)?$/,
                // 编译 ts 和 tsx 文件
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                // 可以知道具体报错在没打包之前文件的哪一行
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                // https://github.com/Jimdo/typings-for-css-modules-loader
                // css-loader 让你能 import css
                // style-loader 能将 css 以 style 的形式插入
                // typings-for-css-modules-loader 在 ts 中也能引用 css, 替换 css-loader
                // modules 启用本地范围的 css
                // namedExport 将破折号的 css 转换成驼峰形式导出
                // localIdentName 用特定的 hash 标识本地 css 名称
                // 用于使用 PostCSS 处理 CSS 的 webpack 的加载器, 配置文件 postcss.config.js
                use: ['style-loader', 'typings-for-css-modules-loader?modules&namedExport&localIdentName=[local]__[hash:base64:5]', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                // url-loader 封装了 file-loader, 解析文件, 用于将文件转换为base64 URI
                loader: 'url-loader',
                options: {
                    // 以字节为单位指定文件的最大大小, 大于此值, 将交给 file-loader 处理, file-loader 作用解决不能引用文件问题
                    limit: 8192,
                    // 为你的文件配置自定义文件名模板
                    name: 'react/sources/images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        //  由于在ts中引用局部css, 会生成xx.css.d.ts, 所以Webpack打包时缓慢, 加上此选项即可
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new htmlWebpackPlugin({
            // 如果为true，则将唯一的webpack编译哈希附加到所有包含的脚本和CSS文件中。 这对缓存清除非常有用
            hash: true,
            // true || 'head' || 'body' || false 将所有资产注入给定模板或templateContent。 传递true或'body'时，所有javascript资源都将放置在body元素的底部。 'head'将脚本放在head元素中
            inject: true,
            // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
            chunks: ['app'],
            // 打包后的文件名
            filename: 'index.html',
            // 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)
            template: path.join(__dirname, './src/index.html')
        })
    ]
}