<template>
    <div class="flex gap-2 s-center h-full" :class="vertical ? 'flex-col' : 'flex-row'">
        <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" :alt="alt" v-if="icon"
            :src="`${$config.STORAGE_URL}/${icon}`" class="!grow-0" style="height: 100% !important;"
            :style="{ aspectRatio: iconRatio, width: iconWidth }" />
        <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" :alt="alt" v-if="image"
            :src="`${$config.STORAGE_URL}/${image}`" class="!grow-0 !h-full"
            :style="{ aspectRatio: imageRatio, width: imageWidth }" />
    </div>
</template>

<script>
export default {
    name: 'GLogo',

    props: {

        icon: {
            type: String
        },

        lighter: Boolean,

        darker: Boolean,

        image: {
            type: String
        },

        vertical: {
            type: Boolean,
        },

        iconWidth: {
            type: String,
            default: '50px',
        },

        iconRatio: {
            type: String,
        },

        imageWidth: {
            type: String,
            default: '150px',
        },

        imageRatio: {
            type: String,
        },

        alt: {
            type: String,
            default: null
        }
    }
}
</script>
<style>
img {
    height: 100%;
}
</style>