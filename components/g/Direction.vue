<template>
    <div>
        <s-chip :outlined="outlined" v-if="!$slots.default" :rounded="rounded" :color="color" class="!px-2">
            <a target="_blank" aria-label="address" :href="`https://www.google.com/maps/search/${lat},${long}`"
                class="flex items-center gap-1">
                <s-avatar :icon="icon" :src="lottie" auto-play loop :textColor="textColor" width="20px"
                    :color="icon ? $store.state.pageColor + '--text' : $store.state.pageColor" />
                <g-text :data="title" class="cursor-pointer" />
            </a>
        </s-chip>
        <div>
            <a target="_blank" aria-label="address" :href="`https://www.google.com/maps/search/${lat},${long}`">
                <slot name="default" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GDirection',

    props: {
        title: {
            type: String,
            default: "location"
        },

        lat: [Number, String],

        outlined: {
            type: Boolean,
            default: true
        },
        
        long: [Number, String],

        color: String,

        rounded: String,

        icon: String,

        lottie: String,

        textColor: String
    }
}
</script>