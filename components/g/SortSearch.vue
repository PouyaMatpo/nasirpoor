<template>
    <div class="w-full md:w-72">
        <s-text-field no-col flat hide-details v-bind="$attrs" rounded="pill" :background-color="color" :loading="isLoading"
            :id="`search_${_uid}`" :placeholder="$t('do_search')"
            @blur="(searchInput === null || searchInput == '') && (showResult = false)" :value="searchInput"
            @input="search($event)">
            <template v-slot:prepend-inner>
                <svg-icon name="search" :class="`${closeColor} w-6 h-6`" />
            </template>
            <template v-slot:append>
                <div class="flex h-6">
                    <svg-icon v-if="searchInput" name="close-circle" :class="`${closeColor} w-6 h-6 cursor-pointer`"
                        @click="searchInput = null, showResult = false, $emit('update:search-input', searchInput)" />
                    <s-btn aria-label="sort-search" v-if="resources.length > 1" height="auto"
                        :id="`search_resource_${_uid}`" @click="searchResourceFalcn = true" text>{{ searchResourceText
                        }}</s-btn>
                    <s-falcon :viva.sync="searchResourceFalcon" xs="sky-menu" :activator="`#search_resource_${_uid}`"
                        :sw-options="{ parentClass: 'white wh-full' }" :close-on-content-click="false">
                        <v-list dense nav class="overflow-y-auto" style="max-height: 500px">
                            <v-list-item-group>
                                <v-list-item class="sm">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ $t('search_resources') }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <s-divider />
                                <v-list-item v-for="(roesource, i) in resources" :key="i" :value="resource" :color="$store.state.pageColor"
                                    class="sm" @click="resourceClick(resource)">
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
        <s-falcon xs="sky-menu" :viva.sync="showResult" :activator="`#search_${_uid}`"
            :sw-options="{ parentClass: 'white wh-full' }" :close-on-content-click="false" hide-overlay
            :open-on-click="shouldOpenOnClick">
            <v-card-text class="overflow-y-auto" style="max-height: calc(100vh - 40vh)">
                <v-list v-for="(resourceItems, resourceName) in results" :key="resourceName">
                    <v-subheader>{{ resourceName }}</v-subheader>
                    <v-list-item v-for="(item, i) in resourceItems" :key="i">
                        <v-list-item-avatar>
                            <v-img
                                :src="item.banner ? `${$config.STORAGE_URL}/${item.banner}` : '/placeholder/placeholder.svg'" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="getLabel(item)" />
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: 'GSortSearch',

    props: {
        resources: {
            type: Array,
            default: () => []
        },

        inputOnly: {
            type: Boolean,
            default: false
        },

        closeColor: {
            type: String,
            default: 'primary--text text--darken-2'
        },

        color: {
            type: String,
            default: 'primary lighten-4'
        }
    },

    data() {
        return {
            searchInput: null,
            isLoading: false,
            results: {},
            showResult: false,
            searchResourceFalcon: false,
            selectedResources: this.$_.cloneDeep(this.resources)
        }
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

                    if (res.data?.length) {
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
        }
    }
}
</script>