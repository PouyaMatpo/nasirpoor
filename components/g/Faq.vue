<template>
    <div ref="StartFaq">
        <v-expansion-panels v-model="currentPanel" multiple accordion flat class="overflow-hidden">
            <v-expansion-panel v-for="(item, i) in newData" :key="i" class="overflow-hidden my-1"
                :class="[color, rounded, i == newData.length - 1 && '!mb-0']">
                <div ref="faqItem">
                    <v-expansion-panel-header hide-actions>
                        <div :class="TextColor"
                            class="flex items-center justify-between ltr:pl-4 md:ltr:pl-6 ltr:pr-2 md:ltr:pr-3 rtl:pr-4 md:rtl:pr-6 rtl:pl-2 md:rtl:pl-3 py-4 md:py-6">
                            <g-text class="font-semibold leading-6 text-sm" :data="$l(item.question)" />
                            <div>
                                <svg-icon aria-label="plus" class="md:!w-5 md:!h-5 !h-4 !w-4"
                                    :name="checkPanel(currentPanel, i) ? 'minus' : 'plus'" />
                            </div>
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <g-text class="text-sm leading-8 px-6 pb-4" :class="TextColor" :data="$l(item.answer)" />
                    </v-expansion-panel-content>
                </div>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: 'GFaq',

    head() {
        return {
            script: [{ type: 'application/ld+json', json: this.faqSchema }]
        }
    },


    props: {
        data: {
            type: Array,
            default: () => ([])
        },

        color: {
            type: String,
            default: 'primary'
        },

        rounded: {
            type: String,
            default: 'rounded-md'
        },

        label: {
            type: [Array, Object],
            default: []
        },

        isLabel: {
            type: Boolean,
            default: false
        },

        TextColor: {
            type: String,
            default: 'primary'
        }
    },

    data() {
        return {
            currentPanel: [],
            newData: []
        }
    },

    created() {
        if (this.isLabel) {
            let data = []
            for (let id of this.data) {
                data.push(this.label[id].other)
            }
            this.newData = data
        } else {
            this.newData = this.data
        }
    },

    mounted() {
        this.$gsap.timeline({
            scrollTrigger: {
                trigger: this.$refs.StartFaq,
                start: "top +=700",
                end: "bottom top",
                toggleActions: "restart pause restart pause",
                // markers: true
            }
        })
            .fromTo(this.$refs.faqItem,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power4.out",
                }
            );
    },

    methods: {
        checkPanel(panelArray, number) {
            for (let i = 0; i < panelArray.length; i++) {
                if (panelArray[i] == number) {
                    return true
                }
            }
        }
    },

    computed: {
        faqSchema() {
            const structuredData = this.newData.map((item, i) => ({
                "@type": "Question",
                "name": this.$l(item.question),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": this.$l(item.answer),
                }
            }))

            return {
                "@context": "http://schema.org",
                "@type": "FAQPage",
                "mainEntity": structuredData
            }
        }
    }
}
</script>
<style lang="scss">
.v-expansion-panel-header {
    padding: 0px !important;
}

.v-expansion-panel-content__wrap {
    padding: 0px !important;
}
</style>