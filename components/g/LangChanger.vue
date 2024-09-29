<template>
    <div>
        <div v-if="multiLangBtn" class="flex items-center gap-2">
            <s-btn v-if="$i18n.localeProperties.code !== item.code" aria-label="lang-changer" icon
                v-for="(item, i) in $i18n.locales" :key="'btn' + i" :active-class="i.toString()"
                @click="handleBtnClick(item.code), $i18n.setLocale(item.code)">
                <div :class="btnText" class="font-black text">
                    {{ item.code }}
                </div>
            </s-btn>
        </div>
        <s-btn aria-label="lang" v-else :id="`sky_${_uid}`" @click="cropMenu = true">
            {{ $i18n.localeProperties.code }}
        </s-btn>
        <s-falcon :sw-options="{ parentClass: '!w-full h-full' }" nudge-top="12" top :viva.sync="cropMenu"
            :activator="`#sky_${_uid}`" xs="sky-menu" z-index="11">
            <v-list nav dense tile>
                <v-list-item-group>
                    <v-list-item v-if="$i18n.localeProperties.code !== item.code" @click="$i18n.setLocale(item.code)"
                        v-for="(item, i) in $i18n.locales" :key="i">
                        <v-list-item-content>
                            <v-list-item-title v-text="item.code"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </s-falcon>
    </div>
</template>

<script>
export default {
    name: 'GLangChanger',

    props: {
        multiLangBtn: {
            type: Boolean,
            default: false
        },

        btnText: {
            type: String,
            default: 'black--text'
        }
    },

    data() {
        return {
            cropMenu: null,
        }
    },

    mounted() {
        let currentLang = this.$route.path.split('/')[1]
        if (currentLang != 'ar' && currentLang != 'fa') {
            this.$store.commit("setActiveBtnIndex", 'en');
        } else {
            this.$store.commit("setActiveBtnIndex", currentLang);
        }
    },

    methods: {
        handleBtnClick(index) {
            this.$store.commit("setActiveBtnIndex", index);
        },
    }
}
</script>