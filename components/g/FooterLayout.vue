<template>
    <div ref="parent">
        <div v-bind="$attrs" ref="fixedFooter" :class="fixed ? 'fixed bottom-0' : ''"
            class="z-1 w-full !pt-14 md:!pt-24 !pb-6">
            <div v-if="$slots.TopSection">
                <slot name="TopSection" />
            </div>
            <div>
                <slot name="MiddleSection" />
            </div>
            <div v-if="$slots.SocialSection">
                <slot name="SocialSection" />
            </div>
            <div v-if="$slots.PowerdSection">
                <slot name="PowerdSection" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GFooterLayout',

    props: {
        fixed: Boolean
    },

    mounted() {
        setTimeout(() => {
            if (this.fixed) {
                this.footerHeight()
                window.addEventListener("resize", this.footerHeight)
            }
        }, 10);
    },

    methods: {
        footerHeight() {
            this.$gsap.to(this.$refs.parent, {
                height: this.$refs.fixedFooter.clientHeight,
                duration: 0
            })
        }
    }
}
</script>