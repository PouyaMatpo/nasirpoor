<template>
    <v-row ref="gradient">
        <s-col v-for="(card, i) in data" :key="'card' + i" md="3" sm="6">
            <div ref="mirror"
                :class="[$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5', $s.mdAndUp ? 'p-4 rounded-2xl h-full' : 'p-4 rounded-2xl h-full flex flex-col s-center w-full']">
                <div class="inline-block w-14 h-14 overflow-hidden rounded-full">
                    <s-avatar v-bind="$attrs"
                        :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                        :lottie="card?.lottie"
                        :image="card?.avatar?.length ? `${$config.STORAGE_URL}/${card?.avatar}` : '/placeholder/placeholder.svg'"
                        :icon="card?.icon" loop width="56px" rounded="pill" @mounted="playLottie($event)" />
                </div>
                <g-text class="font-bold mt-4" :data="card.title" />
            </div>
        </s-col>
    </v-row>
</template>

<script>
export default {
    name: 'GLittleCard',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    },

    mounted() {
        this.$gsap.timeline({
            scrollTrigger: {
                trigger: this.$refs.gradient,
                start: "top +=700",
                end: "bottom top",
                toggleActions: "restart pause restart pause",
                // markers: true
            }
        })
            .fromTo(this.$refs.mirror,
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