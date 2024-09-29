<template>
    <components :data="initial" :is="data" />
</template>

<script>
export default {
    name: 'GRandomLayout',

    props: {
        data: {
            type: String
        },

        initial: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>