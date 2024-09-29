<template>
    <div @mouseenter="btnArrowGo" @mouseleave="btnArrowBack">
        <nuxt-link :to="localePath(slug)">
            <div @mouseenter="play" @mouseleave="playReverse" ref="btnWidth" :class="colorBtn"
                class="flex relative lighten-4 items-center overflow-hidden rounded-full h-10 w-10">
                <div ref="textOpac" style="transform: translateX(45px);">
                    <g-text :data="text" class="pr-12 pl-4 font-medium text-sm whitespace-nowrap"
                        :darkColor="colorBtn + '--text text--darnken-4'" />
                </div>
                <s-avatar :lottie="lottie" width="40px" :color="colorBtn + ' lighten-3'" @mounted="lottieInstance = $event"
                    class="absolute right-0" :class="$s.rtl ? 'rotate-180' : null" />
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: "GReadMore",

    props: {
        text: {
            type: String,
            default: "Read More"
        },

        colorBtn: {
            type: String,
            default: "primary"
        },

        colorText: {
            type: String,
            default: "primary"
        },

        slug: {
            type: String,
            default: "/"
        },

        lottie: {
            type: String,
            default: "/lottie/arrow.lottie"
        }
    },

    data() {
        return {
            lottieInstance: null
        }
    },

    methods: {
        btnArrowGo() {
            this.$gsap.to(this.$refs.btnWidth, {
                width: 'auto',
                duration: .3,
                ease: 'power4'

            })
            this.$gsap.to(this.$refs.textOpac, {
                opacity: 1,
                x: 0,
                ease: 'power3'
            })
        },

        btnArrowBack() {
            this.$gsap.to(this.$refs.btnWidth, {
                width: 40,
                duration: .3,
                ease: 'power4'
            })
            this.$gsap.to(this.$refs.textOpac, {
                opacity: 0,
                x: 45,
                ease: 'power1'
            })
        },

        play() {
            this.lottieInstance.setDirection(1)
            this.lottieInstance.play()
        },

        playReverse() {
            this.lottieInstance.setDirection(-1)
            this.lottieInstance.play()
        }
    }
};
</script>