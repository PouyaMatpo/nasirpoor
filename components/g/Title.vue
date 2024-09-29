<template>
    <div>
        <components :is="tag" id="target">
            <g-animated-text slideUp class="leading-relaxed" :class="$s.rtl ? 'fa-num' : null" :delay="delay"
                :color="color">
                {{ text }}
            </g-animated-text>
        </components>
    </div>
</template>
<script>
export default {
    name: 'GTitle',

    props: {
        tag: {
            type: String,
            default: 'div'
        },

        color: {
            type: String,
        },

        text: {
            type: String,
            default: 'No Title'
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
        }

    },

    data() {
        return {
            opace: 'opacity-0',
            lineHeight: null,
            splitedText: null
        }
    },
}
</script>
<style lang="scss">
#target {
    font-kerning: none;

    & .line {
        overflow: hidden;
    }
}
</style>