<template>
    <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="carousel"
        class="relative overflow-hidden w-full" :style="`height: ${cards[0]?.offsetHeight}px`">
        <g-slider-wrapper-card v-for="(datas, index) in data" :key="index" :data="datas" ref="card" class="absolute" />
        <template v-if="data.length < 10">
            <g-slider-wrapper-card v-for="(datas, index) in data" :key="`card${index}`" :data="datas" ref="card" class="absolute" />
        </template>
        <template v-if="data.length < 5">
            <g-slider-wrapper-card v-for="(datas, index) in data" :key="`cards${index}`" :data="datas" ref="card" class="absolute" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'GSliderWrapper',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    },

    data() {
        return {
            isCarouselRunning: true,
            animationTimeline: [],
            items: null,
            cards: [],
        };
    },

    mounted() {
        this.animateCarousel();
    },

    methods: {
        handleMouseLeave() {
            if (!this.isCarouselRunning) {
                for (let i in this.animationTimeline) {
                    this.animationTimeline[i].resume();
                }
                this.isCarouselRunning = true;
            }
        },

        handleMouseEnter() {
            this.isCarouselRunning = false;
            for (let i in this.animationTimeline) {
                this.animationTimeline[i].pause();
            }
        },

        animateCarousel() {
            this.items = Array.from(this.$refs.card)
            this.items.forEach((item) => {
                this.cards.push(item.$el)
            })
            this.cards.forEach((card, index) => {
                const animation = this.$gsap.fromTo(card, {
                    x: (this.$s.rtl ? 1 : -1) * (this.cards[0]?.offsetWidth),
                }, {
                    x: this.$refs.carousel?.offsetWidth < (this.cards?.length) * (this.cards[0]?.offsetWidth) ? (this.$s.rtl ? -1 : 1) * (this.cards.length) * (this.cards[0]?.offsetWidth) : (this.$s.rtl ? -1 : 1) * this.$refs.carousel?.offsetWidth,
                    duration: this.cards?.length * 2,
                    ease: 'none',
                    repeat: -1,
                    delay: index * 2 
                }, -20)
                this.animationTimeline.push(animation)
            })
        }
    },
};
</script>