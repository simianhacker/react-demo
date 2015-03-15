var path = require('path');
var join = path.join;
var webpack = require('webpack');
module.exports = function (paths, dev) {
  return {
    devtool: 'source-map',
    context: paths.src,
    entry: paths.entry,
    output: {
      path: paths.dest,
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, loader: 'babel-loader' },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.html/, loader: 'raw-loader' },
        { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'  },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=application/octet-stream'  },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file'  },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=image/svg+xml'  }
      ],
      noParse: [
        join(paths.src, '..', 'node_modules', 'lodash', 'index.js')
      ]
    },
    resolveLoader: {
      root: join(__dirname, 'node_modules')
    },
    resolve: {
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: ['bower_components', 'node_modules'],
      root: [
        paths.src
      ]
    },
    plugins: [
      new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ])
    ]
  };
};
