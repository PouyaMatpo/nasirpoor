<template>
    <s-wrapper :options="mainSw">
        <s-wrapper class="fixed top-0 left-0 h-full w-full -z-1 pointer-events-none" :options="fixedSw" />
        <s-sticky :top-offset="topOffset" :de-active="$s.smAndDown" :content-class="`ContentClass${name}`"
            :sticky-class="`stickyClass${name}`">
            <div :class="[!$slots.stickySection && 'justify-center', gap]" class="md:flex">
                <div v-if="$slots.stickySection" :class="[stickyWidth, stickyRight ? 'order-1' : 'order-0']">
                    <s-wrapper :options="stickySw" :class="`stickyClass${name}`">
                        <slot name="stickySection" />
                    </s-wrapper>
                </div>
                <div :class="[contentWidth, stickyRight ? 'order-0' : 'order-1']">
                    <s-wrapper :options="contentSw" :class="`ContentClass${name}`">
                        <slot name="ContentSection" />
                    </s-wrapper>
                </div>
            </div>
        </s-sticky>
    </s-wrapper>
</template>

<script>
export default {
    name: 'GPageLayout',

    props: {
        name: {
            type: String,
            default: 'First'
        },

        mainSw: {
            type: Object
        },

        fixedSw: {
            type: Object
        },

        stickySw: {
            type: Object
        },

        contentSw: {
            type: Object
        },

        stickyWidth: {
            type: [String, Number],
            default: ' w-2/5'
        },

        contentWidth: {
            type: [String, Number],
            default: 'w-3/5'
        },

        topOffset: {
            type: Number,
            default: 20
        },

        stickyRight: Boolean,

        gap: {
            type: [String, Number],
            default: 4
        }
    }
}
</script>