<template>
    <div>
        <s-chip rounded="lg" :outlined="items?.find(item => item.value == value)?.label ? false : true" :id="`sort_${_uid}`"
            @click="viva = true"
            :color="$s.dark ? color + '--text text--lighten-6 ' + color + ' darken-5' : color + '--text text--darken-3 ' + color + ' lighten-5'">
            {{ items?.find(item => item.value == value)?.label || 'label' }}
            <svg-icon name="chevron-down" class="w-6 h-6 ltr:-mr-2 rtl:-ml-2 transition-transform"
                :class="[{ 'rotate-180': viva }, $s.dark ? color + '--text text--lighten-6' : color + '--text text--darken-3']" />        </s-chip>
        <s-falcon xs="sky-menu" :viva.sync="viva" :activator="`#sort_${_uid}`"
            :nudge-left="$s.mdAndUp ? $s.rtl ? 35 : null : null" :nudge-right="$s.mdAndUp ? $s.rtl ? null : 30 : null"
            :sw-options="{ parentClass: $s.dark ? color + ' darken-5' : color + ' lighten-5' }">
            <v-list dense nav class="overflow-y-auto" style="max-height: 500px">
                <v-list-item-group>
                    <v-list-item v-for="(item, i) in items" :key="i" :value="item" @click="$emit('input', item.value)"
                        class="sm">
                        <v-list-item-content>
                            <v-list-item-title
                                :class="[{ '!font-bold': item.value == value }, $s.dark ? color + '--text text--lighten-4' : color + '--text text--darken-2']">
                                {{ item.label }}
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon class="items-center flex-wrap">
                            <svg-icon v-if="item.value == value"
                                :class="$s.dark ? color + '--text text--lighten-4' : color + '--text text--darken-2'"
                                class="w-5 h-5" name="check" />
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: 'GSort',

    props: {
        items: {
            type: Array,
            default: () => []
        },

        color: {
            type: String,
            default: 'primary'
        },

        value: {
            type: String
        },
    },

    data() {
        return {
            viva: false
        }
    }
}
</script>
<style lang="scss">
.v-menu__content {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 5px 2px rgba(0, 0, 0, 0.12) !important;
}
</style>