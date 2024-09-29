<template>
    <v-row ref="startScroll">
        <s-col v-for="( data, i ) in data" :key="'product' + i" md="4" sm="12">
            <div ref="whatCard"
                :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                class="rounded-xl h-full flex flex-col justify-between">
                <div class="p-6">
                    <div class="inline-block w-14 h-14 overflow-hidden rounded-full">
                        <s-avatar v-bind="$attrs"
                            :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                            :lottie="data?.lottie"
                            :image="data?.avatar?.length ? `${$config.STORAGE_URL}/${data?.avatar}` : '/placeholder/placeholder.svg'"
                            :icon="data?.icon" loop width="56px" rounded="pill" @mounted="playLottie($event)" />
                    </div>
                    <g-text class="text-xl my-8" :data="data.title" />
                    <g-text class="text-sm" :data="data.description" />
                </div>
                <div v-if="data.slug" class="flex justify-end p-2">
                    <g-read-more :colorBtn="$store.state.pageColor" :text="$t('read')" :slug="data.slug" />
                </div>
            </div>
        </s-col>
    </v-row>
</template>

<script>
export default {
    name: 'GWhatDoCard',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    },

    mounted() {
        this.$gsap.timeline({
            scrollTrigger: {
                trigger: this.$refs.startScroll,
                start: "top +=700",
                end: "bottom top",
                toggleActions: "restart pause restart pause",
                // markers: true
            }
        })
            .fromTo(this.$refs.whatCard,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.2,
                    ease: "power4.out",
                }
            );
    }
}
</script>