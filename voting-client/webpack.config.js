/**
 * @author Nick Burdo <n.burdo@iterios.com>
 * @version 1.0.0 06.08.17
 * @since 1.0.0
 */
 modue.export = {
     entry: ['./src/index.js'],
     module: {
         loaders: [{
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel'
         }]
     },
     resolve: {
         extensions: ['', '.js', '.jsx']
     },
     output: {
         path: __dirname + '/dist',
         publicPath: '/',
         filename: 'bundle.js'
     },
     devServer: {
         contentBase: './dist'
     }
 };
 
