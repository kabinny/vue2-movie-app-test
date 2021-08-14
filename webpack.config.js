const path = require('path') // import path from 'path' 의 노드 버전
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'], // 경로 적을 때 여기 명시된 확장자는 생략 가능
    alias: { // 경로 별칭
      '@': path.resolve(__dirname, 'src')
    }
  },
  entry: './src/main.js', // entry point
  output: { // path, filename 은 생략 가능 
    // path: path.resolve(__dirname, 'dist'), // dirname (현재 경로)에 'dist'폴더 만들기
    // filename: 'main.js',
    clean: true // 결과를 만들때 마다 지우고 새로 만든다.
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [ // 해석되는 순서가 중요하다. 
          'vue-style-loader', // vue component 안에 있는 style
          'style-loader', // style tag
          'css-loader', // css file
          'postcss-loader',
          {
            loader: 'sass-loader', // scss문법 분석해준다. 
            options: { // 옵션 추가
              additionalData: '@import "@/scss/main";' // 분석되는 scss 가장 앞부분이 이 코드가 들어가게 된다.
            }
          }
        ]
      },
      { // .js로 끝나는 파일을 만나면 babel-loader의 도움을 받아서 결과물을 만들도록
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/, // p가 있을 수도 있고 없을 수도 있다 jpg or jpeg
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({ // faviton.ico 같은 정적 파일을 복사해서 dist root에 넣어주는
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    port: 8079
  }
}