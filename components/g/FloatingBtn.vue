<template>
    <nuxt-link :to="localePath(data?.slug)" class="h-7 md:h-8">
        <button @mouseenter="hoverBtn" @mouseleave="unHoverBtn"
            class="rounded-full px-4 h-full font-semibold text-sm md:text-base"
            :style="$s.dark ? 'border:2px solid  white;background-color: white;color: black;' : 'border:2px solid  black;background-color: black;color: white;'">
            {{ data?.title }}
        </button>
    </nuxt-link>
</template>
<script>
export default {
    name: 'GFloatingBtn',

    props: {
        data: {
            type: Object,
            default: {},
        }
    },
    methods: {
        hoverBtn(e) {
            this.$gsap.to(e.target, {
                background: this.$s.dark ? 'black' : 'white',
                scale: 1.1,
                color: this.$s.dark ? 'white' : 'black',
                duration: .2
            })
        },
        unHoverBtn(e) {
            this.$gsap.to(e.target, {
                background: this.$s.dark ? 'white' : 'black',
                scale: 1,
                color: this.$s.dark ? 'black' : 'white',
                duration: .2
            })
        },
    }
}
</script>
<style lang="">
    
</style>