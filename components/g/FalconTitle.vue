<template>
    <s-list-item class="my-4">
        <template #title>
            <g-text v-if="title" class="text-lg font-black" :data="title" />
        </template>

        <template #action>
            <s-btn aria-label="close" icon large @click="handleClose">
                <svg-icon :color="$store.state.pageColor" class="!w-8 !h-8" name="close" />
            </s-btn>
        </template>
    </s-list-item>
</template>

<script>
export default {
    name: "GFalconTitle",

    props: {
        title: String,
    },

    methods: {
        handleClose() {
            this.$emit('close-falcon');
        }
    }
}
</script>