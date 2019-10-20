import webpack, { Configuration } from "webpack";
import path from "path";

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const serverConfigWebpack: Configuration = {
  mode: "development",
  target: "node",
  watch: true,
  entry: "./server/index.tsx",
  output: {
    filename: "server.js",
    path: __dirname + "/build-server"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@server": path.resolve(__dirname, "server")
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(tsx|ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          customize: require.resolve(
            "babel-preset-react-app/webpack-overrides"
          ),
          cacheDirectory: true
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(svg|scss|module\.scss|css|module\.css)$/,
        loader: "ignore-loader"
      }
    ]
  },

  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },

  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};

export default serverConfigWebpack;
