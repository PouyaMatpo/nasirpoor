export default async ({ $axios, $config, store, $_, error: errorFn, i18n, $cookies, $serval, $vuetify }, inject) => {
    $axios.defaults.baseURL = process.client ? $config.CLIENT_API_URL : ($config.SERVER_API_URL || $config.CLIENT_API_URL);
    $axios.defaults.headers.common.lang = i18n.locale || 'en';
    if (process.server) $axios.defaults.headers.common.host = $config.SERVER_HOST_DOMAIN;

    const caches = {}
    const api = {
        getConfigs() { return $axios.$get(`/config/catalog/pages,models,global`) },
        getIndex({ page = 1, limit = 12, name = 'posts', status, lang, paramName, group, categoryId, cache, paramValue, notId, search, userId, tagId, resource, error = true, sort }) {
            if (cache && caches.hasOwnProperty(cache)) return new Promise((resolve, reject) => { resolve($_.cloneDeep(caches[cache])) })

            let url = `/query/${name}?limit=${limit}&page=${page}`;
            if (status) url += `&modes[status]=${status}`;
            if (group) url += `&modes[group]=${group}`;
            if (lang) url += `&filter[attributes.lang][is]=${lang}`;
            if (categoryId) url += `&filter[attributes.category_id][is]=${categoryId}`;
            if (tagId) url += `&filter[attributes.tag_id][is]=${tagId}`;
            if (paramName) url += `&params[${paramName}]=${paramValue}`;
            if (notId) url += `&filter[id][is_not]=${notId}`;
            if (search) url += `&search=${search}`;
            if (resource) url += `&filter[resource][in]=${resource}`;
            if (sort) url += `&sorts=${sort}`;
            if (userId) url += `&filter[attributes.user_id][is]=${userId}`;

            return $axios.$get(url)
                .then(res => {
                    if (cache) caches[cache] = $_.cloneDeep(res)
                    return res
                })
                .catch(err => {
                    error && errorFn({ statusCode: err.response?.status || 500, message: err.message || '' });
                    // if (!process.server) throw err;
                    return err
                })
        },
        getDocument({ model, id, error = true, cache }) {
            if (cache && caches.hasOwnProperty(cache)) return new Promise((resolve, reject) => { resolve($_.cloneDeep(caches[cache])) })
            return $axios.$get(`/producer/${model}/${id}`)
                .then(res => {
                    if (cache) caches[cache] = $_.cloneDeep(res)
                    return res
                })
                .catch(err => {
                    error && errorFn({ statusCode: err.response?.status || 500, message: err.message || '' });
                    // if (!process.server) throw err;
                    // throw err
                    return err
                })
        },
        save({ model, payload }) { return $axios.post(`/producer/${model}`, payload) },
        auth({ model, payload }) { return $axios.post(`/auth/${model}`, payload) },
        otp({ id, payload }) { return $axios.put(`/auth/${id}`, payload) }
    }

    var configs = {}

    if (process.server) {
        await api.getConfigs()
            .then(res => {
                configs = res
                store.commit('setter', { configs: res })

                const themedark = $cookies.get('themedark');
                // if (!themedark && configs?.global?.color?.color?.hasOwnProperty('is_dark')) {
                //     const isThemeDark = configs.global.color.color.is_dark

                //     $serval.$s.dark = isThemeDark
                //     $vuetify.theme.isDark = isThemeDark
                //     // $vuetify.theme.dark = isThemeDark
                // }
                // const preferredUserLang = $cookies.get('preferredUserLang')
                // if (!preferredUserLang && configs?.global?.lang?.langs?.default_lang) i18n.setLocale(configs.global.lang.langs.default_lang);

                // lang: i18n setLocale
            })
            .catch(err => {
                return errorFn({ statusCode: 302, message: 'Config Fetch Failed' })
            })
    } else {
        configs = $_.cloneDeep(store.state.configs)
        store.commit('setter', { configs: {} })

        const themedark = $cookies.get('themedark');
        // if (!themedark && configs?.global?.color?.color?.hasOwnProperty('is_dark')) {
        //     const isThemeDark = configs.global.color.color.is_dark

        //     $serval.$s.dark = isThemeDark
        //     $vuetify.theme.isDark = isThemeDark
        //     $vuetify.theme.dark = isThemeDark
        // }
    }

    inject('api', api)
    inject('configs', configs)
}