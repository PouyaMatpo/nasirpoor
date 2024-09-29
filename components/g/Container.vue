<template>
    <s-wrapper :class="containerClass" :options="swOptions">
        <slot />
    </s-wrapper>
</template>
<script>
export default {
    name: 'GContainer',

    props: {
        swOptions: {
            type: Object,
            default: () => ({})
        },

        containerClass: {
            type: String,
            default: 'containerClass px-6'
        }
    }
}
</script>

<style lang="scss" scoped>
.containerClass {
    max-width: 1300px;
    margin: auto;
}
</style>