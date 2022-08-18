const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY': JSON.stringify(
        process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY,
      ),
    }),
  ],
}
