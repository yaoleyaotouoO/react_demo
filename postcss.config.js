module.exports = {
    plugins: [
        // 为了兼容所有浏览器，给 css 属性对不同的浏览器加上前缀
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
} 