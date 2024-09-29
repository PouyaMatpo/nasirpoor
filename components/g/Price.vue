<template>
    <div>
        <div v-if="data.price" class="flex items-center gap-2 justify-end">
            <div>
                <g-text :class="[single ? 'text-xl' : 'text-sm', $s.rtl ? 'fa-num' : null]" :color="$store.state.pageColor + '--text text--lighten-1'" class="line-through"
                    :data="data.price" />
            </div>
            <s-chip small color="red darken-2" rounded="pill" outlined>
                <g-text :class="[single ? 'text-sm' : 'text-xs', $s.rtl ? 'fa-num' : null]" color="red--text text--darken-2"
                    data="%15" />
            </s-chip>
        </div>
        <div v-if="data.sale_price" class="flex items-center gap-2 pt-1">
            <div>
                <g-text :class="[single ? 'text-2xl' : 'text-lg', $s.rtl ? 'fa-num' : null]" :color="$store.state.pageColor + '--text text--darken-1'"
                    :data="data.sale_price" />
            </div>
            <g-text class="text-sm" :color="$store.state.pageColor + '--text text--darken-1'" :data="$l({ en: 'Toman', fa: 'تومان' })" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'GPrice',

    props: {
        data: {
            type: Object,
            default: () => { }
        },
        single: Boolean
    }
}
</script>