import colors from 'vuetify/es5/util/colors'

const extraColorVariants = {
    red: { darken5: '#751515', darken6: '#2F0606', darken7: '#100000', lighten6: '#FAF2F2' },
    pink: { darken5: '#380521', darken6: '#1a020f', darken7: '#12000A', lighten6: '#FAF3F5' },
    purple: { darken5: '#220842', darken6: '#0e021d', darken7: '#0C001B', lighten6: '#F8F3FA' },
    'deepPurple': { darken5: '#190C53', darken6: '#0C052F', darken7: '#040018', lighten6: '#F7F3FA' },
    indigo: { darken5: '#0E1455', darken6: '#05092B', darken7: '#000213', lighten6: '#F3F4FA' },
    blue: { darken5: '#072047', darken6: '#041126', darken7: '#000317', lighten6: '#F3F7FA' },
    'lightBlue': { darken5: '#002B4D', darken6: '#001729', darken7: '#000C15', lighten6: '#F3F8FA' },
    cyan: { darken5: '#043F42', darken6: '#002324', darken7: '#000C0D', lighten6: '#F3FAFA' },
    teal: { darken4: '#005345', darken5: '#002F27', darken6: '#001A15', darken7: '#000B09', lighten6: '#F3FAF7' },
    green: { darken5: '#07290a', darken6: '#031305', darken7: '#000D01', lighten6: '#F2FAF2' },
    'lightGreen': { darken5: '#1B400D', darken6: '#102507', darken7: '#040E00', lighten6: '#F2FAF2' },
    lime: { darken5: '#433D07', darken6: '#242103', darken7: '#0D0C00', lighten6: '#F6FBEE' },
    yellow: { darken5: '#5e2f06', darken6: '#1d0f02', darken7: '#110800', lighten6: '#FEFFED' },
    amber: { darken5: '#954100', darken6: '#3E1B00', darken7: '#130800', lighten6: '#FCF6EE' },
    orange: { darken5: '#501c00', darken6: '#1f0b00', darken7: '#0E0500', lighten6: '#FFF4EE' },
    'deepOrange': { darken5: '#621700', darken6: '#220800', darken7: '#0E0300', lighten6: '#FFF4EE' },
    brown: { darken5: '#33201D', darken6: '#1C1110', darken7: '#0D0807', lighten6: '#FBF4F1', accent1: '#CF9F8E', accent2: '#B28474', accent3: '#9E6F5F', accent4: '#875341' },
    'blueGrey': { darken5: '#151C1F', darken6: '#0C1012', darken7: '#020303', lighten6: '#F6FCFF', accent1: '#875341', accent2: '#99B8C8', accent3: '#7AA0B4', accent4: '#5788A1' },
    grey: { darken4: '#2E2E2E', darken5: '#232323', darken6: '#131313', darken7: '#0D0D0D', lighten6: '#FCFEFF', accent1: '#BDBDBD', accent2: '#757575', accent3: '#616161', accent4: '#424242' },
}

export default {
    server: {
        host: '0.0.0.0',
        port: 3000
    },

    head: {
        titleTemplate: '%s | ' + process.env.SITE_NAME,
        title: process.env.SITE_NAME,
        htmlAttrs: { dir: 'ltr', lang: 'en-GB', prefix: 'og: http://ogp.me/ns#' },
        meta: [
            // ---> global <---
            { hid: 'theme-color', name: 'theme-color', content: '#00897B' },
            { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' },
            { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: process.env.SITE_NAME },
            { hid: 'charset', 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },

            // ---> seo <---
            { hid: 'robots', name: 'robots', content: 'index, follow' },

            // --> social media- <---
            { hid: 'og:locale', property: 'og:locale', content: 'en_GB' },
            { hid: 'og:locale:alternate', property: 'og:locale:alternate', content: 'fa_IR' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
            { hid: 'og:title', property: 'og:title', content: process.env.SITE_NAME },
            { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '../sewing.ico' }
        ]
    },

    vue: {
        config: {
            productionTip: false
        }
    },

    router: {
        parseQuery: query => require('qs').parse(query),
        stringifyQuery: query => {
            let result = require('qs').stringify(query, { encode: false });
            return result ? ('?' + result) : '';
        },
        // middleware: [ 'redirect' ]
    },

    css: [
        '~/assets/css/main.scss'
    ],

    plugins: [
        '~plugins/global',
        // '~plugins/api',
        // '~plugins/nuxtMFDirective'
    ],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/tailwindcss',
        'nuxt-gsap-module',
        '@nuxtjs/svg-sprite',
        '@nuxtjs/pwa',
        '@eronco/serval'
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@luxdamore/nuxt-prune-html',
        '@nuxtjs/i18n',
        '@nuxtjs/sitemap',
        ['cookie-universal-nuxt', { parseJSON: false }],
        '@nuxtjs/gtm'
    ],

    axios: {
        proxy: true, // Enable proxy
        // baseURL is optional; it's useful when you want to set a common base URL for API calls
        // baseURL: 'http://localhost:3000'
    },

    proxy: {
        // Proxy all requests that start with /api-auth/ to the target backend
        '/api-auth/': {
            target: 'https://warranty.liara.run', // The target backend URL
            changeOrigin: true, // Ensure the origin matches the target server's origin
            secure: false, // Use false if the server uses a self-signed certificate

            // Rewrite the path for specific endpoints, while leaving others intact
            pathRewrite: function (path, req) {
                if (path.startsWith('/api-auth/warranty')) {
                    // For warranty-related requests, remove /api-auth/
                    return path.replace('/api-auth', '');
                } else {
                    // For other requests, leave /api-auth/ intact
                    return path;
                }
            }
        }
    },


    build: {
        // analyze: true,
        standalone: true,
        transpile: ['vuetify/lib', 'filepond/locale/fa_ir.js'],
        loaders: {
            vue: { // for supporting New ES syntax: Optional Chaining, Bigint, Nullish Coalescing and more
                compiler: require('vue-template-babel-compiler')
            }
        }
    },

    serval: {
        initialValue: 6,
        interface: {
            rounded: {
                card: 'lg',
                listItem: 'lg',
                listItemAvatar: 'lg',
                chip: 'md',
                btn: 'lg',
                btnIcon: 'pill',
                snackBar: 'md',
                tooltip: 'md',
                input: 'md'
            },
            darkThemePalette: {
                darken4: '#7CFC00',
                darken3: '#7CFC00'
            }
        },
        extras: {
            sticky: true,
            lottie: true,
            swiper: true,
            active_items: true
        }
    },

    vuetify: {
        treeShake: true,
        rtl: false,
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    ...extraColorVariants,
                    primary: {
                        base: colors[process.env.PRIMARY_COLOR || 'indigo'].base,
                        darken1: colors[process.env.PRIMARY_COLOR || 'indigo'].darken1,
                        darken2: colors[process.env.PRIMARY_COLOR || 'indigo'].darken2,
                        darken3: colors[process.env.PRIMARY_COLOR || 'indigo'].darken3,
                        darken4: colors[process.env.PRIMARY_COLOR || 'indigo'].darken4,
                        darken5: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken5,
                        darken6: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken6,
                        darken7: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken7,
                        lighten1: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten1,
                        lighten2: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten2,
                        lighten3: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten3,
                        lighten4: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten4,
                        lighten5: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten5,
                        lighten6: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].lighten6,
                    },
                },
                dark: {
                    ...extraColorVariants,
                    primary: {
                        base: colors[process.env.PRIMARY_COLOR || 'indigo'].base,
                        darken1: colors[process.env.PRIMARY_COLOR || 'indigo'].darken1,
                        darken2: colors[process.env.PRIMARY_COLOR || 'indigo'].darken2,
                        darken3: colors[process.env.PRIMARY_COLOR || 'indigo'].darken3,
                        darken4: colors[process.env.PRIMARY_COLOR || 'indigo'].darken4,
                        darken5: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken5,
                        darken6: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken6,
                        darken7: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].darken7,
                        lighten1: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten1,
                        lighten2: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten2,
                        lighten3: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten3,
                        lighten4: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten4,
                        lighten5: colors[process.env.PRIMARY_COLOR || 'indigo'].lighten5,
                        lighten6: extraColorVariants?.[process.env.PRIMARY_COLOR || 'indigo'].lighten6,
                    },
                }
            }
        },
        defaultAssets: {
            font: false,
            icons: false,
        }
    },

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: false,
        config: {
            mode: 'jit',
            theme: {
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1264px',
                    xl: '1904px'
                },
            },
        }
    },

    i18n: {
        locales: [
            {
                code: 'fa',
                iso: 'fa',
                file: 'fa.json',
                dir: 'rtl'
            },
            {
                code: 'en',
                iso: 'en',
                file: 'en.json',
                dir: 'ltr'
            }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: process.env?.DEFAULT_LOCALE ?? 'fa',
        // strategy: 'prefix',
        vueI18n: {
            fallbackLocale: 'fa',
        },
        detectBrowserLanguage: false
    },

    gsap: {
        extraPlugins: {
            scrollTo: true,
            scrollTrigger: true
        }
    },

    sitemap: {
        hostname: process.env.SITE_URL,
        path: '/sitemap.xml',
        xslUrl: '/sitemap-style.xsl',
        sitemaps: [
            // {
            //     path: 'page-sitemap.xml',
            //     xslUrl: '/sitemap-style.xsl',
            //     exclude: [ '/_icons', '/fa/_icons', '/category', '/fa/category', '/category/**', '/fa/category/**', '/product', '/fa/product' ],
            //     routes: [ '/product', '/fa/product', '/category/articles', '/fa/category/articles' ]
            // },
            // {
            //     path: '/post-sitemap.xml',
            //     xslUrl: '/sitemap-style.xsl',
            //     exclude: ['/**'],
            //     routes: async() => {
            //         let result = []
            //         const { data } = await axios.get(process.env.API_URL + '/query/articles', { params: { limit: 500 }});
            //         data.data.forEach(article => {
            //             if (article.attributes?.lang == 'fa') {
            //                 result.push(`/fa/${article.attributes?.slug}`)
            //             } else {
            //                 result.push(`/${article.attributes?.slug}`)
            //             }
            //         })
            //         return result
            //     }
            // },
            // {
            //     path: '/product-sitemap.xml',
            //     xslUrl: '/sitemap-style.xsl',
            //     exclude: ['/**'],
            //     routes: async() => {
            //         let result = []
            //         const { data } = await axios.get(process.env.API_URL + '/query/products', { params: { limit: 500 }});
            //         data.data.forEach(product => {
            //             if (product.attributes?.lang == 'fa') {
            //                 result.push(`/fa/product/${product.attributes?.slug}`)
            //             } else {
            //                 result.push(`/product/${product.attributes?.slug}`)
            //             }
            //         })
            //         return result
            //     }
            // },
            // {
            //     path: '/product-category-sitemap.xml',
            //     xslUrl: '/sitemap-style.xsl',
            //     exclude: ['/**'],
            //     routes: async() => {
            //         let result = []
            //         const { data } = await axios.get(process.env.API_URL + '/query/categories', { params: { limit: 500 }});
            //         data.data.forEach(category => {
            //             category.catalogue?.other?.slug?.en && result.push(`/product-category/${category.catalogue?.other?.slug?.en}`);
            //             category.catalogue?.other?.slug?.fa && result.push(`/fa/product-category/${category.catalogue?.other?.slug?.fa}`);
            //         })
            //         return result
            //     }
            // },
            // {
            //     path: '/industries-sitemap.xml',
            //     xslUrl: '/sitemap-style.xsl',
            //     exclude: ['/**'],
            //     routes: async() => {
            //         let result = []
            //         const { data } = await axios.get(process.env.API_URL + '/query/industries', { params: { limit: 500 }});
            //         data.data.forEach(category => {
            //             category.catalogue?.other?.slug?.en && result.push(`/industries/${category.catalogue?.other?.slug?.en}`);
            //             category.catalogue?.other?.slug?.fa && result.push(`/fa/industries/${category.catalogue?.other?.slug?.fa}`);
            //         })
            //         return result
            //     }
            // }
        ]
    },

    publicRuntimeConfig: {
        SITE_NAME: process.env.SITE_NAME
    },

    pwa: {
        manifest: {
            lang: 'en-GB',
            short_name: process.env.SITE_NAME,
            name: process.env.SITE_NAME,
            version: '1.0.0',
            start_url: process.env.SITE_URL + '/?standalone=true',
            display: 'standalone',
            background_color: '#ffffff',
            theme_color: '#F44336',
            orientation: 'portrait-primary',
            icons: [
                {
                    src: '/pwa/64.png',
                    sizes: '64x64',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/120.png',
                    sizes: '120x120',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/144.png',
                    sizes: '144x144',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/152.png',
                    sizes: '152x152',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/384.png',
                    sizes: '384x384',
                    type: 'image/png',
                    purpose: 'maskable'
                },
                {
                    src: '/pwa/512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        }
    },

    gtm: {
        // id: 'GTM-XXXXXXX'
    }
}