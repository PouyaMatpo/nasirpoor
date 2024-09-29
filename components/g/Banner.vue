<template>
    <div class="overflow-hidden rounded-3xl">
        <div class="md:relative w-full h-full">
            <s-image v-if="newImages.length === 1" :skeletonColor="$s.dark ? $store.state.pageColor + ' darken-2' : $store.state.pageColor + ' lighten-4'
                " :src="`${$config.STORAGE_URL}/${newImages[0]}`" :height="height" class="h-full" />
            <div v-else-if="newImages.length > 1" class="md:relative rounded-3xl w-full h-full">
                <div v-if="$s.mdAndUp" class="flex gap-2 absolute ltr:left-4 rtl:right-4 bottom-4 z-3">
                    <g-arrow :position="$s.rtl ? 'right' : 'left'" @click="PrevSlide" class="cursor-pointer" />
                    <g-arrow :position="$s.rtl ? 'left' : 'right'" @click="NextSlide" class="cursor-pointer" />
                </div>
                <s-swiper :options="options" @input="swiperMounted" :items="newImages"
                    class="w-full h-full overflow-hidden rounded-3xl">
                    <template #default="{ slide }">
                        <s-image :aspect-ratio="aspectRatio" :src="`${$config.STORAGE_URL}/${slide}`" :height="height"
                            alt="bannerr" class="h-full" />
                    </template>
                </s-swiper>
            </div>
        </div>
        <div v-if="$s.smAndDown" class="flex justify-center mt-8 mb-1">
            <div v-for="(item, index) in newImages" :key="index" :class="[$store.state.pageColor + 
                ' h-2 w-2 rounded-full mx-1 cursor-pointer',
                {
                    'darken-4': activeSlideIndex === index,
                    'lighten-3': activeSlideIndex !== index,
                },
            ]" @click="goToSlide(index)" />
        </div>
    </div>
</template>

<script>
export default {
    name: "GBanner",

    props: {
        height: String,

        images: {
            type: Array,
            default: () => ["/placeholder/placeholder.svg"],
        },

        aspectRatio: Number,

        label: {
            type: Object,
            default: () => { },
        },
    },

    data() {
        return {
            swiper: null,
            newImages: [],
            activeSlideIndex: 0,
            options: {
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                },
            },
        };
    },

    computed: {
        computedData() {
            return this.$_.merge(this.swiperOptions, this.swipersettings);
        },
    },

    watch: {
        jumpToSlide(e) {
            this.jumpSlide(e);
        },
    },

    mounted() {
        if (this?.label) {
            let images = [];
            for (let id of this.images) {
                images.push(this.label[id]?.path);
            }
            this.newImages = images;
        } else {
            this.newImages = this.images;
        }
    },

    methods: {
        NextSlide() {
            this.swiper.slideNext() &&
                this.$emit("NextSlide", this.swiper.activeIndex);
        },

        PrevSlide() {
            this.swiper.slidePrev() &&
                this.$emit("PrevSlide", this.swiper.activeIndex);
        },

        swiperMounted(swiperinstance) {
            this.$emit("input", swiperinstance);
            this.swiper = swiperinstance;

            this.swiper?.on("slideChange", () => {
                this.activeSlideIndex = this.swiper.activeIndex;
                this.$emit("changeSlide", this.swiper.activeIndex);
            });
        },

        goToSlide(index) {
            this.swiper.slideTo(index);
        },
    },
};
</script>
