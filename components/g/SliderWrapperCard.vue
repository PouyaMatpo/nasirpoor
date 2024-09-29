<template>
    <div class="rounded-3xl w-40 md:w-52 h-36 p-8">
        <s-image eager aspect-ratio="1.5" v :src="$config.STORAGE_URL + '/' + data.avatar" contain class="mt-4" alt="wrapper" />
    </div>
</template>
<script>
export default {
    name: 'GSliderWrapperCard',

    props: {
        data: {
            type: Object,
            default: () => { }
        }
    }
}
</script>