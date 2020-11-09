const env = require('dotenv').config({ path: '.env.' + process.env.NODE_ENV }).parsed;
const fs = require('fs');
const path = require('path');

const title = '1111驚喜扭扭樂│Vidol TV';
const description = '進行扭蛋扭扭樂，獲得雙11優惠';

export default {
    /*
     ** Headers of the page
     */
    head: {
        title: title,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: description },
            { property: 'og:url', content: env.WEB_URL },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: `${env.WEB_URL}/images/line_share_v2.jpg` },
            { property: 'og:image', content: `${env.WEB_URL}/images/fb_share_v2.jpg` },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '631' },
            { property: 'fb:admins', content: '100011049074462' },
            { property: 'fb:app_id', content: '568541539975249' }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href:
                    'https://vidol.tv/assets/resource/image/favicon-d991863699ba9886821ddf6ad1914a8f67ada3f48ea891c4772d95a69398cfd9.png'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap'
            }
        ],
        script: [
            {
                src:
                    'https://polyfill.io/v3/polyfill.js?features=default,fetch,HTMLPictureElement,Array.prototype.find,NodeList.prototype.forEach,URL,URLSearchParams,smoothscroll&flags=gated',
                defer: 'defer'
            },
            {
                src: 'js/preloadjs.min.js',
                defer: 'defer'
            },
            {
                src: 'https://connect.facebook.net/en_US/sdk.js',
                defer: 'defer'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios.js',
        { src: '~/plugins/js-cookie.js', mode: 'client' },
        { src: '~/plugins/lottie-web.js', mode: 'client' }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: ['@nuxtjs/axios', '@nuxtjs/proxy', '@nuxtjs/device', ['vue-sweetalert2/nuxt', { confirmButtonText: '好' }]],
    /*
     ** Build configuration
     */
    build: {
        filenames: {
            app: ({ isDev }) => (isDev ? '[name].js' : '[name].js?v=[contenthash:7]'),
            chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].js?v=[contenthash:7]'),
            css: ({ isDev }) => (isDev ? '[name].css' : '[name].css?v=[contenthash:7]'),
            img: ({ isDev }) => (isDev ? '[path][name].[ext]' : '[path][name].[ext]?v=[contenthash:7]'),
            font: ({ isDev }) => (isDev ? '[path][name].[ext]' : '[[path]name].[ext]?v=[contenthash:7]'),
            video: ({ isDev }) => (isDev ? '[path][name].[ext]' : '[path][name].[ext]?v=[contenthash:7]')
        },
        /*
         ** You can extend webpack config here
         */
        extend (config, ctx) {}
    },
    serverMiddleware: [{ path: '/api', handler: '~/server/api.js' }],
    proxy: {
        '/v1': { target: 'https://event-dev.vidol.tv' }
    },
    router: {
        base: new URL(env.WEB_URL).pathname
    },
    server: {
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
        }
    },
    publicRuntimeConfig: {
        ENV: process.env.ENV,
        API_URL: process.env.API_URL,
        PAY_URL: process.env.PAY_URL,
        USER_TOKEN: process.env.USER_TOKEN
    }
};
