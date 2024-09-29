<template>
    <v-row ref="startScroll">
        <s-col v-for="( data, i ) in data" :key="'product' + i" md="4" sm="12">
            <div ref="card"
                :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                class="rounded-xl h-full relative">
                <svg-icon
                    :class="[$s.dark ? $store.state.pageColor + '--text text--darken-3' : $store.state.pageColor + '--text text--lighten-3', $s.rtl ? 'left-6 rotate-180' : 'right-6']"
                    class="absolute -top-10 w-20 h-20" name="quote" />
                <div class="p-6 flex flex-col justify-between h-full">
                    <div>
                        <g-text class="py-14" :data="data.description" />
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="inline-block w-14 h-14 overflow-hidden rounded-full">
                            <s-avatar v-bind="$attrs"
                                :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                                :lottie="data?.lottie"
                                :image="data?.avatar?.length ? `${$config.STORAGE_URL}/${data?.avatar}` : '/placeholder/placeholder.svg'"
                                :icon="data?.icon" loop width="56px" rounded="pill" @mounted="playLottie($event)" />
                        </div>
                        <div>
                            <g-text class="font-black" :data="data.name" />
                            <g-text class="text-sm opacity-70" :data="data.job" />
                        </div>
                    </div>
                </div>
            </div>
        </s-col>
    </v-row>
</template>

<script>
export default {
    name: 'GQuoteCard',

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
            .fromTo(this.$refs.card,
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