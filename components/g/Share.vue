<template>
    <div>
        <slot name="activator" :action="doShare">
            <s-btn aria-label="share" :text="!icon" :icon="icon" @click="doShare" :color="color"
                class="items-center !px-2 cursor-pointer" rounded="pill" :class="[textColor, icon ? '!w-8 !h-8' : null]">
                <div class="flex items-center">
                    <svg-icon class="w-5 h-5" name="share-variant" />
                    <div v-if="!icon" class="px-2 font-bold">
                        {{ $t('share') }}
                    </div>
                </div>
            </s-btn>
        </slot>
        <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }"
            :sw-options="{ parentClass: $s.dark ? colorFalcon + ' darken-6 overflow-hidden !rounded-t-3xl md:!rounded-3xl' : colorFalcon + ' lighten-5 overflow-hidden !rounded-t-3xl md:!rounded-3xl' }"
            :viva.sync="shareDialog" xs="bottom-sheet" sm="dialog" width="xs">
            <v-card-text>
                <div class="p-3">
                    <div class="flex justify-center">
                        <s-btn aria-label="copy" @click="$s.smAndDown ? !shareDialog : null" text :color="color"
                            :class="$s.dark ? `${color}--text text--lighten-4` : `${color}--text text--darken-4`">
                            <div @click="copyToClipboard" class="flex gap-3">
                                <div>
                                    <svg-icon class="w-5 h-5" name="link" />
                                </div>
                                <div class="text-sm">
                                    {{ $t('copy') }}
                                </div>
                            </div>
                        </s-btn>
                    </div>
                    <s-divider :opacity="0.5" :color="$s.dark ? `${color} lighten-4` : `${color} darken-4`" thickness="2px"
                        length="100%" class="my-3" />
                    <div class="flex justify-center gap-3">
                        <s-btn aria-label="close" @click="close" v-for="(item, i) in computedItems" :key="'social' + i"
                            icon>
                            <a :href="item.url + url" target="_blank">
                                <svg-icon class="w-6 h-6"
                                    :class="$s.dark ? `${color}--text text--lighten-4` : `${color}--text text--darken-4`"
                                    :name="item.icon" />
                            </a>
                        </s-btn>
                    </div>
                </div>
            </v-card-text>
        </s-falcon>
    </div>
</template>

<script>
export default {
    name: 'GShare',

    props: {
        color: {
            type: String,
            default: 'primary'
        },

        colorFalcon: {
            type: String,
            default: 'primary'
        },

        textColor: {
            type: String,
            default: 'primary'
        },

        icon: {
            type: Boolean,
        },

        facebook: {
            type: Boolean,
        },

        x: {
            type: Boolean,
        },

        whatsapp: {
            type: Boolean,
        },

        telegram: {
            type: Boolean,
        },

        email: {
            type: Boolean,
        },

        linkedin: {
            type: Boolean,
        },

        pinterest: {
            type: Boolean,
        },

        instagram: {
            type: Boolean,
        }
    },

    data() {
        return {
            shareDialog: false,
            items: [],
            availableItems: [{
                name: 'facebook',
                label: 'فیس بوک',
                color: 'indigo',
                icon: 'facebook',
                url: 'https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]='
            },
            {
                name: 'x',
                label: 'توییتر',
                icon: 'x',
                url: 'https://twitter.com/intent/tweet?url='
            },
            {
                name: 'whatsapp',
                label: 'واتس اپ',
                icon: 'whatsapp',
                url: 'https://wa.me/?text='
            },
            {
                name: 'telegram',
                label: 'تلگرام',
                color: 'light-blue',
                icon: 'telegram',
                url: 'mailto:?body='
            },
            {
                name: 'pinterest',
                label: 'پینترست',
                color: 'red',
                icon: 'pinterest',
                url: 'http://pinterest.com/pin/create/link/?url='
            },
            {
                name: 'linkedin',
                label: 'لینکدین',
                color: 'indigo',
                icon: 'linkedin',
                url: 'https://www.linkedin.com/sharing/share-offsite/?url='
            },
            {
                name: 'email',
                label: 'ایمیل',
                color: 'red',
                icon: 'email',
                url: 'mailto:?body='
            },
            {
                name: 'instagram',
                label: 'اینستاگرام',
                icon: 'instagram',
                url: 'https://www.instagram.com/sharing/share-offsite/?url='
            }
            ]
        }
    },

    computed: {
        computedItems() {
            this.availableItems.map((e) => {
                this.$_.keys(this.$_.pickBy(this.$props)).map(a => {
                    if (e.name == a) {
                        this.items.push(e)
                    }
                })

            })
            return this.items
        },

        url() {
            return this.$config.SITE_URL + this.$route.path
        }
    },

    methods: {
        close() {
            this.shareDialog = false
        },

        doShare() {
            let shareData = {
                url: this.url,
            }
            try {
                navigator.share(shareData)
                // should close the falon
            } catch (err) {
                this.shareDialog = true
            }
        },

        copyToClipboard() {
            try {
                navigator.clipboard.writeText(this.url)
                this.$store.commit('setSuccessSnackbar', { message: this.$t('link_copy') })
                this.shareDialog = false
            } catch (err) {
                this.$store.commit('setFailSnackbar', { message: this.$t('error_link') })
                process.env.NODE_ENV === 'development' && console.error('[HShare]: copy nashod dash! bayad HTTPS bashi');
            }
        }
    }
}
</script>