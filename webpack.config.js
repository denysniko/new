const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		// config server
		port: 3000,
		open: true,
	},
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'js/[name].[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	// configuration and collecting 'html.file'
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					'group-css-media-queries-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							api: 'modern-compiler',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]', // 'ext' it's extension
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
					},
					'svgo-loader', // optimization of svg files
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|webp)$/i,
				use: devMode
					? []
					: [
							{
								loader: 'image-webpack-loader',
								options: {
									mozjpeg: {
										progressive: true,
									},
									optipng: {
										enabled: false,
									},
									pngquant: {
										quality: [0.65, 0.9],
										speed: 4,
									},
									gifsicle: {
										interlaced: false,
									},
									webp: {
										quality: 75,
									},
								},
							},
						],
				type: 'asset/resource',
				generator: {
					filename: 'assets/img/[name][ext]',
				},
			},
			{
				test: /\.(?:js|mjs|cjs)$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { targets: 'defaults' }]],
					},
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				minify: CssMinimizerPlugin.cleanCssMinify,
			}),
			new TerserPlugin(),
		],
	},
}
