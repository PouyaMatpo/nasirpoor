<template>
    <div v-bind="$attrs" v-on="$listeners" @mouseenter="enter" @mouseleave="leave">
        <div class="flex">
            <div class="relative overflow-hidden cursor-pointer z-1 rtl:pb-1" :class="options?.parentClass"
                :style="options?.parentStyle">
                <slot />
                <div ref="slider" class="absolute w-full -z-1" :style="[options?.childStyle, { height: sliderHeight }]"
                    :class="[start == 'top' || start == 'bottom' ? 'bottom-full left-0' : 'left-full bottom-0', options?.childClass]">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GSlideOverlay',

    props: {
        options: {
            type: Object,
            default: () => ({})
        },

        start: {
            type: String,
            default: 'left'
        },

        end: {
            type: String,
            default: 'right'
        },

        sliderHeight: {
            type: String,
            default: null
        },

        active: {
            type: Boolean,
            default: null
        },

        sliderColor: {
            type: String,
            default: "black",
        },

        duration: {
            type: Number,
            default: 0.2
        },

        easing: {
            type: String,
            default: 'none'
        },

        animateOnce: Boolean,

        reverse: Boolean
    },

    computed: {
        compStart() {
            if (this.start == 'right') return this.$s.rtl ? 'left' : 'right';
            if (this.start == 'left') return this.$s.rtl ? 'right' : 'left';
            return this.start
        },

        compEnd() {
            if (this.end == 'right') return this.$s.rtl ? 'left' : 'right';
            if (this.end == 'left') return this.$s.rtl ? 'right' : 'left';
            return this.end
        },
    },

    watch: {
        active(val) {
            val ? this.animate(this.compStart, 'center') : this.animate('center', this.compEnd)
        }
    },

    mounted() {
        this.active === true && this.animate(this.compStart, 'center')
    },

    methods: {
        enter() {
            if (this.animateOnce) {
                if (this.reverse) {
                    this.active == null && this.animate(this.compStart, 'center')
                    setTimeout(() => {
                        this.active == null && this.animate('center', this.compEnd)
                    }, (this.duration * 1000));
                } else {
                    this.active == null && this.animate(this.compStart, this.compEnd)
                }
            } else {
                this.active == null && this.animate(this.compStart, 'center')
            }
        },

        leave() {
            if (!this.animateOnce) {
                this.active == null && this.animate('center', this.compEnd)
            }
        },

        animate(from, to) {
            this.$gsap.fromTo(this.$refs.slider, this.duration,
                {
                    ...from == 'right' && { left: '100%' },
                    ...from == 'left' && { left: '-100%' },
                    ...from == 'bottom' && { top: '100%' },
                    ...from == 'top' && { top: '-100%' },

                    ...from == 'center' && ((to == 'left' || to == 'right') ? { left: '0%' } : { top: '0%' }),
                },
                {
                    ...to == 'right' && !this.reverse && { left: '100%' },
                    ...to == 'right' && this.reverse && { left: '-100%' },
                    ...to == 'left' && !this.reverse && { left: '-100%' },
                    ...to == 'left' && this.reverse && { left: '100%' },
                    ...to == 'bottom' && !this.reverse && { top: '100%' },
                    ...to == 'bottom' && this.reverse && { top: '-100%' },
                    ...to == 'top' && !this.reverse && { top: '-100%' },
                    ...to == 'top' && this.reverse && { top: '100%' },

                    ...to == 'center' && ((from == 'left' || from == 'right') ? { left: '0%' } : { top: '0%' }),

                    ease: this.easing
                })
        }
    }
}
</script>