module.exports = {
    module: {
      externals: {
        'react': 'react'
      },
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
};