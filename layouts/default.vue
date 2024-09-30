<template>
    <v-app>
        <s-wrapper :options="computedOptions" class="z-0">
            <g-nav v-if="$s.mdAndUp" glassy />
            <g-nav-alma v-else />
            <v-main app class="z-2 relative" :class="$s.dark ? $store.state.pageColor + ' darken-6' : 'white'">
                <!-- <g-transition mode="scaleX"> -->
                <nuxt />
                <!-- </g-transition> -->
            </v-main>
            <g-footer />
            <s-snackbar v-model="snackbar" v-bind="$store.state.snackbar">
                {{ $store.state.snackbar.message }}
                <template v-slot:action>
                    <s-btn aria-label="snackbar" icon @click="snackbar = false">
                        <svg-icon class="white--text !w-8 !h-8" name="close" />
                    </s-btn>
                </template>
            </s-snackbar>
        </s-wrapper>
    </v-app>
</template>
<script>
export default {
    head() {
        const head = this.$nuxtI18nHead({
            addDirAttribute: true,
            addSeoAttribute: true
        });
        head.htmlAttrs.lang = this.$i18n.locale;
        head.htmlAttrs.class = this.$s.dark ? 'theme--dark' : 'theme--light';
        head.script = [{ type: 'application/ld+json', json: this.structuredData }]
        return head;
    },

    data() {
        return {
            structuredData: {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://nuxtmf.com",
            }
        }
    },

    created() {
        this.$vuetify.rtl = this.$i18n.localeProperties.dir == 'rtl'
    },

    computed: {
        snackbar: {
            get() {
                return this.$store.state.snackbar.isActive
            },
            set(value) {
                this.$store.commit('setSnackbarToggle', value)
            }
        },

        computedOptions() {
            return this.$s.dark ?
                {
                    parentClass: 'primary darken-6'
                } :
                {
                    parentClass: 'primary lighten-6'
                }
        }
    }
}
</script>