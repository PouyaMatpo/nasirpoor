<template>
    <div class="overflow-hidden">
        <div ref="text" :class="opace" class="w-fit">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'GAnimatedText',

    props: {
        slideUp: Boolean,
        slideLeft: Boolean,
        slideRight: Boolean,

        color: {
            type: String
        },

        end: {
            type: [Number, String],
            default: 'bottom top'
        },

        start: {
            type: [Number, String],
            default: 'top bottom'
        },

        delay: {
            type: [Number, String],
            default: .3
        }
    },

    data() {
        return {
            opace: 'opacity-0',
        }
    },

    mounted() {
        setTimeout(() => {
            this.animate()
        }, 200)
    },

    methods: {
        animate() {
            let tl = this.$gsap.timeline(
                {
                    scrollTrigger: {
                        trigger: this.$refs.text,
                        start: this.start,
                        end: this.end,
                    }
                }
            )
            if (this.slideUp) {
                tl.fromTo(this.$refs.text,
                    {
                        y: 50,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        delay: this.delay,
                        ease: 'power4',
                        onComplete: () => {
                            this.$emit('animationFinished')
                        }
                    })
            }
            if (this.slideLeft) {
                tl.fromTo(this.$refs.text,
                    {
                        x: -50,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        delay: this.delay,
                        ease: 'power4',
                        onComplete: () => {
                            this.$emit('animationFinished')
                        }
                    })
            }
            if (this.slideRight) {
                tl.fromTo(this.$refs.text,
                    {
                        x: 50,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        delay: this.delay,
                        ease: 'power4',
                        onComplete: () => {
                            this.$emit('animationFinished')
                        }
                    })
            }
        }
    }
}
</script>