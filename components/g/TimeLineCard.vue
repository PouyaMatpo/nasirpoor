<template>
    <div class="flex flex-col md:flex-row overflow-hidden rounded-3xl">
        <s-image v-if="data?.src && !project" class="w-full md:w-1/2" :min-height="$s.mdAndUp ? '100%' : null" v
            :aspect-ratio="1.5" :src="`${$config.STORAGE_URL}/${data?.src}`" alt="year-image" />
        <s-image v-if="data?.src && project" class="w-full md:w-1/2" :min-height="$s.mdAndUp ? '100%' : null" v
            :aspect-ratio="1.5" :src="data?.src" alt="year-image" />
        <div class="flex flex-col justify-between p-8 w-full" :class="color">
            <g-text class="text-5xl md:!mb-0 !mb-6" :data="data.date" />
            <div>
                <g-text class="mb-6 text-xl md:text-2xl font-semibold" :data="$l(data.title)" />
                <g-text :data="$l(data.description)" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GTimeLineCard',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        },

        color: {
            type: String,
            default: 'primary'
        },

        project: Boolean
    }
}
</script>