<template>
    <div class="searchSection">
        <s-btn @click="isSearchOpen = true" icon>
            <svg-icon name="magnify"
                :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                class="w-6 h-6" />
        </s-btn>
        <div class="fixed right-0 top-0 w-full rounded-b-3xl z-10 pt-10 h-screen md:h-fit md:min-h-[300px]"
            style="transition: transform .7s cubic-bezier(1,0,0,1);"
            :class="[!isSearchOpen ? '-translate-y-full' : 'translate-y-0', $s.dark ? 'dark-glass' : 'ligh-glass']">
            <g-container>
                <div v-show="$s.mdAndUp" class="flex justify-end mb-5">
                    <div @click="closeSearch">
                        <g-text :data="$t('close')" class="font-black text-4xl cursor-pointer" />
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <s-text-field no-col dense flat hide-details dark
                        :background-color="$s.dark ? $store.state.pageColor + ' darken-6' : $store.state.pageColor + ' darken-4'"
                        rounded="pill" :height="$s.mdAndUp ? '60' : '42'" :loading="isLoading" :id="`search_${_uid}`"
                        class="w-full" :placeholder="$t('do_search')"
                        @blur="(searchInput === null || searchInput == '') && (showResult = false)" :value="searchInput"
                        @input="search($event)">
                        <template v-slot:prepend-inner>
                            <div class="md:mt-1.5 md:px-4 ">
                                <svg-icon name="magnify" class="md:w-8 md:h-8 w-6 h-6" />
                            </div>
                        </template>
                        <template v-slot:append>
                            <div class="flex h-6 md:mt-2 md:px-4">
                                <div v-show="searchInput" @click="emptyInput" ref="closeIcon">
                                    <svg-icon name="close" class="white--text md:w-8 md:h-8 w-6 h-6 cursor-pointer" />
                                </div>
                                <s-btn aria-label="search" v-if="resources.length > 1" height="auto"
                                    :id="`search_resource_${_uid}`" @click="searchResourceFalcon = true" text>{{
                                        searchResourceText }}</s-btn>
                                <s-falcon :viva.sync="searchResourceFalcon" xs="sky-menu"
                                    :activator="`#search_resource_${_uid}`"
                                    :sw-options="{ parentClass: 'white wh-full' }" :close-on-content-click="false">
                                    <v-list dense nav class="overflow-y-auto" style="max-height: 500px">
                                        <v-list-item-group>
                                            <v-list-item class="sm">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ $t('search_resources') }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <s-divider />
                                            <v-list-item v-for="(resource, i) in resources" :key="i" :value="resource"
                                                :color="$store.state.pageColor" class="sm"
                                                @click="resourceClick(resource)">
                                                <v-list-item-content>
                                                    <v-list-item-title
                                                        :class="{ '!font-bold': selectedResources.includes(resource) }">{{
                                                            $t(resource) }}</v-list-item-title>
                                                </v-list-item-content>
                                                <v-list-item-icon class="items-center flex-wrap">
                                                    <svg-icon :class="$store.state.pageColor + '--text w-5 h-5'"
                                                        :name="selectedResources.includes(resource) ? 'checkbox-marked' : 'checkbox-blank-outline'" />
                                                </v-list-item-icon>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </s-falcon>
                            </div>
                        </template>
                    </s-text-field>
                    <div @click="closeSearch">
                        <g-text v-if="$s.mdAndDown" :color="$store.state.pageColor + '--text'">
                            {{ $t('cancel') }}
                        </g-text>
                    </div>
                </div>
                <v-card-text class="overflow-y-auto mt-8"
                    :style="$s.mdAndUp ? 'max-height: calc(100vh - 50vh)' : 'max-height: calc(100vh - 122px)'">
                    <div v-for="(resourceItems, resourceName) in results" :key="resourceName">
                        <v-row v-if="$s.mdAndUp">
                            <s-col md="12" class="black--text font-bold text-xl">{{ resourceName }}</s-col>
                            <s-col v-for="(item, i) in resourceItems" :key="`search${i}`" md="3">
                                <product-card v-if="item.resource == 'products'"
                                    :data="{ title: item?.label, slug: localePath(`/product/${item?.slug}`), src: item.banner ? `${$config.STORAGE_URL}/${item.banner}` : '/placeholder.svg' }" />
                                <blog-card v-if="item.resource == 'posts'"
                                    :data="{ title: item?.label, slug: localePath(`/blog/${item?.slug}`), src: item.banner ? `${$config.STORAGE_URL}/${item.banner}` : '/placeholder.svg' }" />
                                <s-chip v-if="item.resource == 'tags'" :to="localePath(`/blog-tags/${item?.slug}`)"
                                    class="w-full">{{
                                        $l(item.labels)
                                    }}</s-chip>
                            </s-col>
                        </v-row>
                    </div>
                    <!-- <div v-if="$s.mdAndDown">
                        <v-list v-for="(resourceItems, resourceName) in results" :key="resourceName"
                            class=" rounded-xl mb-3" :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-4'">
                            <v-subheader :class="$s.dark ? 'white--text' : $store.state.pageColor + '--text text--darken-5'">{{ resourceName
                            }}</v-subheader>
                            <nuxt-link aria-label="search" v-for="(item, i) in resourceItems" :key="i"
                                :to="(item.resource == 'articles' ? '/blog/' : item.resource == 'products' ? '/product/' : '/blog-category/') + item?.other?.slug">
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-img
                                            :src="item.banner ? `${$config.STORAGE_URL}/${item.banner}` : '/placeholder.svg'" />
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            :class="$s.dark ? 'white--text' : $store.state.pageColor + '--text text--darken-5 lighten-4'"
                                            v-text="getLabel(item)" />
                                    </v-list-item-content>
                                </v-list-item>
                            </nuxt-link>
                        </v-list>
                    </div> -->
                </v-card-text>
            </g-container>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GSearch',

    props: {
        resources: {
            type: Array,
            default: () => [],
        },
        inputOnly: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            isSearchOpen: false,
            searchInput: null,
            isLoading: false,
            results: {},
            showResult: false,
            searchResourceFalcon: false,
            selectedResources: this.$_.cloneDeep(this.resources)
        }
    },

    mounted() {
        setTimeout(() => {
            window.addEventListener('keyup', (e) => {
                if (e.keyCode === 27) {
                    this.closeSearch()
                }
            });
            window.addEventListener('click', (e) => {
                if (!document.querySelector('.searchSection').contains(e.target) && e.target != this.$refs.closeIcon) {
                    this.closeSearch()
                }
            })
        }, 10);
    },

    computed: {
        shouldOpenOnClick() {
            return !this.$_.isEmpty(this.results)
        },
        searchResourceText() {
            return this.$t(this.selectedResources[0] || '') + (this.selectedResources.length >= 2 ? ` + ${this.selectedResources.length - 1}` : '')
        }
    },

    methods: {
        search(searchInput) {
            // console.log(searchInput)
            this.searchInput = searchInput

            if (this.inputOnly) {
                this.$emit('update:search-input', searchInput)
                return;
            }

            if (!searchInput) {
                this.showResult = false
                this.results = {}
                return
            }

            this.isLoading = true
            this.$api.getIndex({ name: 'global-search', search: searchInput, limit: 100, resource: this.selectedResources.join(','), error: false })
                .then(res => {
                    this.results = {}
                    console.log(res)
                    if (res.data.length) {
                        for (let item of res.data) {
                            if (!this.results[item.resource]) this.results[item.resource] = [];
                            this.results[item.resource].push(item)
                        }
                        this.showResult = true;
                    } else {
                        this.showResult = false
                    }
                })
                .finally(() => {
                    this.isLoading = false
                })
        },

        getLabel(res) {
            return res.labels ? this.$l(res.labels) : (res.label || res.id)
        },

        resourceClick(resource) {
            this.selectedResources.includes(resource) ? (this.selectedResources.length > 1 && this.selectedResources.splice(this.selectedResources.findIndex(item => item == resource), 1)) : this.selectedResources.push(resource)
        },

        emptyInput() {
            this.searchInput = null
            this.search('')
        },

        closeSearch() {
            this.isSearchOpen = false;
            this.searchInput = null
            this.search('')
        }
    },

    watch: {
        $route(from, to) {
            this.closeSearch()
        }
    },

}
</script>