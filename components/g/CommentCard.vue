<template>
    <div :class="[$s.dark ? color + ' darken-6 ' + color + '--text text--lighten-6' : color + ' lighten-5 ' + color + '--text text--darken-6']"
        class="w-full !p-4 md:!p-8 overflow-hidden">
        <div class="flex !mb-4 flex-row items-center justify-between">
            <g-author-info comment :data="{ name: data.name, lottie: data.lottie, image: data.image, size: 12 }" />
            <s-date :class="$s.dark ? color + '--text text--lighten-5' : color + '--text text--darken-2'"
                class="text-xs md:text-sm" :data="data.date" />
        </div>
        <g-text class="s-body2" :data="data.description" />
        <div v-if="data.answer" class="rounded-lg p-6 mt-4"
            :class="$s.dark ? color + ' darken-5' : color + ' lighten-4'">
            <g-text class="pb-1" :data="$t('answer')" />
            <g-text class="s-body2" :data="data.answer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'GCommentCard',

    props: {
        data: {
            type: Object,
            default: () => ({})
        },

        color: {
            type: String,
            default: 'primary'
        },
    }
}
</script>