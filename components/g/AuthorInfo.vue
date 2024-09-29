<template>
    <nuxt-link :to="localePath(`/author/${data?.id}`)" class="flex items-center gap-3 ">
        <div class="inline-block w-12 h-12 overflow-hidden rounded-full">
            <s-image v :class="imageClass" v-if="!comment" :src="data?.image ? data?.image : '/test/avatar.jpg'" />
            <s-avatar v-if="comment" v-bind="$attrs"
                :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-3'"
                :lottie="data?.lottie" loop :width="size" :rounded="rounded" @mounted="playLottie($event)" />
        </div>
        <g-text class="text-sm"
            :color="$s.dark ? $store.state.pageColor + '--text text--lighten-5' : $store.state.pageColor + '--text text--darken-2'"
            :data="data.name" />
    </nuxt-link>
</template>

<script>
export default {
    name: "GAuthorInfo",

    props: {
        data: {
            type: Object,
            default: () => ({})
        },

        imageClass: String,

        rounded: {
            type: String,
            default: 'full'
        },

        size: {
            type: String,
            default: '28'
        },

        comment: Boolean
    },

    methods: {
        playLottie(event) {
            event.play()
        }
    }
}
</script>