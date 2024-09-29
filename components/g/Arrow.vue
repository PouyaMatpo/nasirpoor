<template>
    <div v-on="$listeners" :style="`width: ${size}px; height:${size}px`">
        <s-avatar icon="chevron-right" width="100%" :color="color" rounded="pill" :textColor="arrowColor"
            :class="checkPosition" />
    </div>
</template>
<script>
export default {
    props: {
        position: {
            type: String,
            default: 'right'
        },

        size: {
            type: String,
            default: '50'
        },

        rounded: {
            type: String,
            default: 'pill'
        },

        color: {
            type: String,
            default: 'primary'
        },

        arrowColor: {
            type: String,
            default: 'white'
        }
    },

    computed: {
        checkPosition() {
            if (this.position == 'top') {
                return '-rotate-90'
            } else if (this.position == 'bottom') {
                return 'rotate-90'
            } else if (this.position == 'left') {
                return 'rotate-180'
            } else {
                return ''
            }
        }
    }
}
</script>