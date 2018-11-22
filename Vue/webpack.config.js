const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
	entry: {
		// bundle1: './src/main',
		bundle2: './src/react',
		// vender: ["vue", "vuex", "vue-router"]
		vender: ["react", "react-dom"]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',//单独打包文件的名称
		chunkFilename: '[name].js',//每一个输出模块的名称
		publicPath: '/'
	},
	plugins: [
		// //确定执行环境
		// new webpack.DefinePlugin({
		//   'process.env':{
		//     'NODE_ENV': JSON.stringify(env)
		//   }
		// }),
		new CommonsChunkPlugin({
		  name: 'bundle2',
		}),
		//公共模块打包
		// new CommonsChunkPlugin({
		// 	name: 'vender',
		// }),
		//css单独打包
		new ExtractTextPlugin({ 
			filename: '[hash:8].style.css', 
			disable: false, allChunks: true 
		}),
		//html模板
		new HtmlWebpackPlugin({
			title: 'Vue',
			template: path.join(__dirname,'src/index.html'),  //模板文件
			inject: 'body',
			hash: true,    //为静态资源生成hash值
		}),
		//copy任务
		// new CopyWebpackPlugin([{
		//   from: path.join(__dirname, 'src/CNAME'), to: path.join(__dirname, 'dist')
		// }])
	],
	module: {
		rules: [
			//vue单文件转换
			{ test: /\.vue$/,
				use: ['vue-loader'], 
				include: path.join(__dirname,'src')},
			//babel转换
			// { test: /\.js$/, 
			// 	use: ['babel-loader'],
			// 	exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-router\/|vue-loader/
			// },
			{
				test: /\.js$/,
                use: ['babel-loader?presets=es2015,presets=react'],
                exclude: /^node_modules$/,
			},
			//css模块转换
			{ test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			//图片文件
			{
				test: /\.(jpe?g|png|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[hash:8].[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								quality: 65
							},
							pngquant:{
								quality: '65-90',
								speed: 4
							},
							svgo:{
								plugins: [
									{
										removeViewBox: false
									},
									{
										removeEmptyAttrs: false
									}
								]
							},
							gifsicle: {
								optimizationLevel: 7,
								interlaced: false
							},
							optipng: {
								optimizationLevel: 7,
								interlaced: false
							}
						}
					}
				]
			},
		]
	},
	resolve: {
		extensions: ['.js','.vue','.less','.css'],
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			actions: path.resolve(__dirname, 'src/store/actions'),
			getters: path.resolve(__dirname, 'src/store/getters'),
			modules: path.resolve(__dirname, 'src/store/modules'),
			store: path.resolve(__dirname, 'src/store'),
			vue: 'vue/dist/vue.js'
		}
	},
	devServer: {
		contentBase: path.join(__dirname, "./dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
		port: 9999, //端口改为9000
		open: true,// 自动打开浏览器，适合懒人
		proxy: {'/api': {
			// target: 'http://ggfinance.sandbox.gofund.cn:8093', //沙盒地址
			target: 'http://ggfinance.gofund.cn:8093', //预正式地址
			// target: 'http://66966.cn', //正式地址
			changeOrigin: true,
			pathRewrite: {
				'^/api': '/api',
			},
		}},
	}
}

module.exports = config