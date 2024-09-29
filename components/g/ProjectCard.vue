<template>
    <div :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'" class="rounded-3xl p-4">
        <div class="flex items-center gap-4">
            <div class="inline-block w-14 h-14 overflow-hidden rounded-2xl">
                <s-avatar v-bind="$attrs" :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                    :lottie="data?.lottie" :image="data?.src?.length ? `${$config.STORAGE_URL}/${data?.src}` : '/placeholder/placeholder.svg'" :icon="data?.icon" loop width="20" rounded="2xl"
                    @mounted="playLottie($event)" />
            </div>
            <div>
                <g-text class="text-xl font-black" :data="data?.name" />
                <g-text :data="data?.job" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GProjectCard',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    }

}
</script>