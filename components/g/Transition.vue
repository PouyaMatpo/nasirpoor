<template>
    <transition mode="out-in" @before-enter="beforeEnter" @enter="enter">
        <slot />
    </transition>
</template>
<script>
export default {
    props: {
        mode: String,

        duration: {
            tyep: Number,
            default: 1,
        },

        easing: {
            type: String,
            default: 'power3'
        }
    },
    methods: {
        ent() {
            console.log('ent')
        },
        beforeEnter(el) {
            el.style.opacity = '0';
            el.style.transform = this.mode == 'fromLeft' ? 'translateX(-100vw)' :
                (this.mode == 'fromRight' ? 'translateX(100vw)' :
                    (this.mode == 'fromTop' ? 'translateY(-100vw)' :
                        (this.mode == 'fromBottom' ? 'translateY(100vw)' :
                            (this.mode == 'scale' ? 'scale(0)' :
                                (this.mode == 'scaleX' ? 'scaleX(0)' : '')))))

        },
        enter(el) {
            if (this.mode == 'fromLeft' || this.mode == 'fromRight') {
                this.$gsap.to(el, {
                    duration: this.duration,
                    translateX: '0vw',
                    ease: this.easing,
                })
            } else if (this.mode == 'fromTop' || this.mode == 'fromBottom') {
                this.$gsap.to(el, {
                    duration: this.duration,
                    translateY: '0vw',
                    ease: this.easing,
                });
            } else if (this.mode == 'scale' || this.mode == 'scaleX') {
                this.$gsap.to(el, {
                    duration: this.duration,
                    scale: 1,
                    ease: this.easing,
                });
            }
            this.$gsap.to(el, {
                duration: this.duration + 1,
                opacity: 1,
                ease: this.easing,
            });
        },
    },
}
</script>
<style lang="">
    
</style>