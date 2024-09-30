import _ from 'lodash'

export default ({ i18n, $axios, $config, route }, inject) => {

    $axios.defaults.headers.common.lang = i18n.locale

    const downloadFile = (fileId) => {
        const downloadUrl = `${$config.CLIENT_API_URL}/producer/files/download/${fileId}`;
        $axios
            .get(downloadUrl, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', response.headers?.['x-file-name']);
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    const headBuilder = head => {
        const slug = decodeURIComponent(route.path)
        var tags = {}
        tags.meta = [
            { hid: 'og:url', property: 'og:url', content: $config.SITE_URL + slug }
        ]
        tags.link = [
            { rel: 'canonical', href: $config.SITE_URL + slug }
        ]

        if (head) {
            if (head.title) {
                tags.title = head.title
                tags.meta.push({ hid: 'og:title', property: 'og:title', content: head.title + ' - ' + 'شرکت صنعت دوخت و برش پردیس' })
            }

            if (head.description) {
                tags.meta.push(
                    { hid: 'description', name: 'description', content: head.description },
                    { hid: 'og:description', property: 'og:description', content: head.description }
                )
            }

            if (head.type) tags.meta.push({ hid: 'og:type', property: 'og:type', content: head.type });

            if (head.image) tags.meta.push({ hid: 'og:image', property: 'og:image', content: head.image });

            if (head.published_time) tags.meta.push({ hid: 'article:published_time', property: 'article:published_time', content: head.published_time });
            if (head.modified_time) tags.meta.push({ hid: 'article:modified_time', property: 'article:modified_time', content: head.modified_time });
            if (head.no_index) tags.meta.push({ hid: 'robots', property: 'robots', content: 'noindex, nofollow' });
        }
        return tags
    }

    inject('_', _)
    inject('downloadFile', downloadFile)
    inject('headBuilder', headBuilder)
}