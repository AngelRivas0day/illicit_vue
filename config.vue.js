module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('vue', '@vue/compat')
        config.moduleo
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
            return {
                ...options,
                compilerOptions: {
                    compatConfig: {
                        MODE: 2,
                    }
                }
            }
        })
    }
}