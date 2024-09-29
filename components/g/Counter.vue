<template>
    <div>
        <g-title class="text-3xl md:text-5xl rubik" :text="data.amount" />
        <g-title class="text-lg !mt-2 md:!mt-4" :text="data.title" />
    </div>
</template>

<script>
export default {
    name: 'GCounter',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    }
}
</script>