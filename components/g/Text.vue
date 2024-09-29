<template>
    <components :is="tag" :class="[$s.dark ? darkColor : color, $s.rtl ? 'fa-num ' + rtlClass : ltrClass]">
        <slot>
            {{ data }}
        </slot>
    </components>
</template>

<script>
export default {
    name: 'GText',

    props: {
        data: [Number, String],

        color: {
            type: String,
            default: 'primary--text text--darken-5'
        },

        darkColor: {
            type: String,
            default: 'primary--text text--lighten-5'
        },

        rtlClass: {
            type: String,
            default: 'leading-relaxed'
        },

        ltrClass: String,

        tag: {
            type: String,
            default: 'div'
        }
    },
}
</script>
