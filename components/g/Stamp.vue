<template>
    <div class="flex flex-col gap-5">
        <div v-for="slot in 20" :key="`slot${slot}`" v-if="$slots[`slot${slot}`]" class="relative opacity-70" ref="section">
            <div class="absolute top-0 left-0 w-full h-full -z-1" ref="effect">
                <slot :name="`effect${slot}`" />
            </div>
            <slot :name="`slot${slot}`" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'GStamp',

    data() {
        return {
            gifStatus: false,
            lastSlot: 'slot1',
        }
    },

    mounted() {
        this.scrollAnimation()
        for (let i in this.$slots) {
            if (parseInt(this.lastSlot.split('slot')[1]) < parseInt(i.split('slot')[1]))
                this.lastSlot = i
        }
    },

    methods: {
        scrollAnimation() {
            let sections = Array.from(this.$refs.section)
            let effects = Array.from(this.$refs.effect)

            sections.forEach((item, index) => {
                this.$gsap.to(item, {
                    scrollTrigger: {
                        trigger: item,
                        toggleActions: "restart pause resume reverse",
                        start: 'top center',
                        end: 'bottom center',
                        // markers: true,
                        onEnter: () => {
                            this.$emit('active', index)
                            sections.slice(0, index).forEach((element) => {
                                this.$gsap.to(element, {
                                    opacity: 0.7,
                                    duration: 0.3,
                                });
                            });
                            effects.slice(0, index).forEach((element) => {
                                this.$gsap.to(element, {
                                    scale: 1,
                                    duration: 0.3,
                                });
                            });
                            this.$gsap.to(sections[index], {
                                opacity: 1,
                                duration: 0.3,
                            });
                            this.$gsap.to(effects[index], {
                                scale: 1.01,
                                duration: 0.3,
                            });
                        },
                        onLeaveBack: () => {
                            this.$gsap.to(sections[index], {
                                opacity: 0.7,
                                duration: 0.3,
                            });
                            this.$gsap.to(effects[index], {
                                scale: 1,
                                duration: 0.3,
                            });
                            this.$emit('deactive', index)

                            if (index != 0) {
                                this.$emit('active', index - 1)

                                this.$gsap.to(sections[index - 1], {
                                    opacity: 1,
                                    duration: 0.3,
                                });
                                this.$gsap.to(effects[index - 1], {
                                    scale: 1.01,
                                    duration: 0.3,
                                });
                            }
                        },
                        onLeave: () => {
                            if (index != parseInt(this.lastSlot.split('slot')[1]) - 1)
                                this.$emit('deactive', index)
                        }
                    },
                })
            })
        }
    },
}
</script>
<style lang="">
    
</style>