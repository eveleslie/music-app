module.exports = {
  publicPath: './', // 根域上下文目录
  pages:{
    index:{
      entry:"src/main.js",
      title:"zanximusic",
    }
  },
  outputDir: 'dist', // 构建输出目录，可不写
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)，可不写
  
};
