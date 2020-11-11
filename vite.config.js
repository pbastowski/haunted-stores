const path = require('path')
// const proxyInterceptor = require('./proxy-config')
//
// const proxy = require('koa-proxies')
// const cors = require('@koa/cors')

module.exports = {
    alias: {
        react: 'haunted',
        '/@/': path.resolve(__dirname, 'src')
    },

    optimizeDeps: {
        include: [
            'lodash/debounce',
            'lit-element/lit-element.js',
            'lit-html/directives/unsafe-html',
            'lit-html/directives/class-map',
            'lit-html/directives/repeat',
            'lit-html/directives/style-map',
            'lit-html/directives/async-append',
            'lit-html/directives/async-replace',
            'lit-html/directives/cache',
            'lit-html/directives/guard',
            'lit-html/directives/if-defined',
            'lit-html/directives/until',
            'lit-html/lib/shady-render',
            'lit-html/lit-html',
            'lit-html/lib/template-factory',
            'lit-html/lib/template',
            'ing-orange-corporatekey-password-authentication/corporate-key-authentication-tpa',
            '@ing-web/authentication',
            'ing-web',
            'ing-web/localize',
            'ing-web/ajax.js',
            'ing-web/packages/style/components',
            'dayjs',
            'axios-mock-adapter/dist/axios-mock-adapter.min.js',
            'hyperactiv/dist'
        ],
        exclude: ['jquery', 'popper.js', 'bootstrap', 'font-awesome']
    }

    // configureServer: ({ app }) => {
    //     app.use(proxy('/security-means', proxyInterceptor))
    //     app.use(proxy('/oauth2/token', proxyInterceptor))
    //     app.use(proxy('/mas', proxyInterceptor))
    //
    //     // app.use(cors({ origin: '*' }))
    // }
}
