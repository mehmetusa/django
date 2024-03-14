const path = require('path');

module.exports = {
  // Set the target to 'node' to indicate that the code will run in a Node.js environment
  target: 'node',
  
  // Entry point of your application
  entry: './src/index.js',
  
  // Output configuration
  output: {
    // Output directory
    path: path.resolve(__dirname, 'dist'),
    // Output filename
    filename: 'bundle.js'
  },
  
  // Module resolution configuration
  resolve: {
    // Add extensions that you want Webpack to resolve
    extensions: ['.js', '.json'],
    fallback: {
        "fs": false,
        "os": false,
        "path": false
      }
  },

  // Rules for processing different types of files
  module: {
    rules: [
      // JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Example loader, use loaders appropriate for your project
          options: {
            presets: ['@babel/preset-env'] // Example preset, use presets appropriate for your project
          }
        }
      }
    ]
  }
};