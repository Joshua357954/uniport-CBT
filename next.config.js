// next.config.js
module.exports = {
    // Customize Next.js configuration
    // Specify the custom index.html file
    // This will replace the default index.html generated by Next.js
    // with your custom index.html file from the public directory
    // Note: The index.html file in the public directory will be served as-is,
    // without any modifications by Next.js
    // This approach is less flexible than using the Head component,
    // but it allows you to have complete control over the HTML structure.
    // Keep in mind that Next.js features like SSR and automatic code splitting
    // won't work with this approach.
    // Use it only if you need complete control over the HTML structure.
    // For most cases, using the Head component is recommended.
    // Read more: https://nextjs.org/docs/api-reference/next.config.js/custom-html
    // Note: You can also use the htmlWebpackPlugin option
    // to specify the custom HTML template file.
    // This can be useful if you want to customize the HTML structure
    // or include additional features like Webpack plugins.
    // Read more: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    // But for simple cases like adding meta tags,
    // using the public/index.html approach is sufficient.
    // Read more: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config/html-webpack-plugin
    // Note: Make sure to add any required dependencies like html-webpack-plugin
    // and configure them as needed in your package.json and webpack.config.js files.
    // Example:
    //   plugins: [
    //     new HtmlWebpackPlugin({
    //       template: './public/index.html',
    //     }),
    //   ],
    // You can also use the Next.js experimental HTML plugin
    // for more control over the HTML output.
    // Read more: https://nextjs.org/docs/api-reference/next.config.js/custom-html-compiler-plugin
    // Note: The experimental HTML plugin is currently in beta
    // and may change in future releases. Use it with caution.
    // Example:
    //   experimental: {
    //     html: {
    //       // Specify the custom HTML compiler plugin
    //       // for more control over the HTML output
    //       // Read more: https://nextjs.org/docs/api-reference/next.config.js/custom-html-compiler-plugin
    //       plugins: [],
    //     },
    //   },
  };
  