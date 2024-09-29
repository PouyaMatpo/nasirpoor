<template>
    <div>
        <s-falcon :swOptions="{ parentClass: `w-full p-2` }" xs="bar" flat bottom height="fit-content">
            <div v-if="sheet.show" class="relative transition-transform"
                :class="[sheet.status && sheet.show ? 'translate-y-0' : 'translate-y-full']">
                <slot />
            </div>
        </s-falcon>
        <div ref="block_sheet" :style="`min-height: ${sheetHeight}px`">
            <div ref="bottom_sheet">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GBottomNav',

    props: {
        distance: {
            type: String,
            default: '1000px'
        },

        block: Boolean
    },

    data() {
        return {
            sheet: { status: false, show: true },
            sheetHeight: ''
        }
    },

    mounted() {
        setTimeout(() => {
            const sheet = this.$refs.bottom_sheet
            if (sheet) {
                this.sheetHeight = sheet.clientHeight
                this.bottomSheet()
                sheet.style.display = 'none'
            }
        }, 500);
    },

    methods: {
        bottomSheet() {
            const nuxt = document.getElementById('__nuxt')

            let tl = this.$gsap.timeline({
                scrollTrigger: {
                    trigger: nuxt,
                    start: `+=${this.distance} bottom`,
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                    // markers: true,
                },
            })

            tl.to(this.sheet, { status: true })

            const sheet_parent = this.$refs.block_sheet

            if (this.block) {
                let tl2 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: sheet_parent,
                        start: `bottom bottom`,
                        end: `bottom bottom`,
                        toggleActions: "play reverse play reverse",
                        scrub: true,
                        // markers: true,
                    },
                })
                const sheet = this.$refs.bottom_sheet

                tl2.to(this.sheet, { show: false })
                tl2.to(sheet, { display: 'block' })
            }
        }
    },
}
</script>