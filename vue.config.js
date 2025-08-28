module.exports = {
    devServer: {
        hot: true,
        open: true,
        host: 'localhost',
        port: '8080'
        // proxy: {
        //     '/api': {
        //         target: 'http://1.116.64.64:5004/api2/',
        //         changeOrgin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
}