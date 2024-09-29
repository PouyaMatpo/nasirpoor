<template>
    <s-btn height="40" outlined :rounded="rounded" aria-label="attachment" :color="color" @click="$downloadFile(fileId)"
        class="!px-3">
        <div class="flex items-center gap-1">
            <s-avatar :icon="icon" :src="lottie" auto-play loop :textColor="textColor" width="25px" color="transparent" />
            <g-text :data="text" class="px-1" :class="textColor" />
        </div>
    </s-btn>
</template>

<script>
export default {
    name: 'GAttachment',

    props: {
        text: {
            type: String,
            default: 'Download'
        },

        fileId: Number,

        icon: String,

        rounded: String,

        lottie: String,

        color: String,

        textColor: String
    },
}
</script>