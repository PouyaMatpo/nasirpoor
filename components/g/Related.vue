<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <g-text :data="$t(title)" tag="h2" class="text-2xl" />
            <div v-if="data.length > 2" class="flex items-center justify-between">
                <div v-if="showBtn && $s.mdAndUp" class="flex gap-3">
                    <g-arrow
                        :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-5'"
                        :arrowColor="$s.dark ? 'white' : $store.state.pageColor" :position="$s.rtl ? 'right' : 'left'"
                        @click="PrevSlide" class="cursor-pointer" />
                    <g-arrow
                        :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-5'"
                        :arrowColor="$s.dark ? 'white' : $store.state.pageColor" :position="$s.rtl ? 'left' : 'right'"
                        @click="NextSlide" class="cursor-pointer" />
                </div>
            </div>
        </div>
        <div class="rounded-3xl overflow-hidden">
            <s-swiper :options="computedData" ref="mySwiper" @input="swiperMounted" :items="data"
                class="w-full overflow-hidden h-fit md:ltr:!pr-40 ltr:!pr-4 md:rtl:!pl-40 rtl:!pl-4">
                <template #default="{ slide }">
                    <slot :slide="slide">{{ slide }}</slot>
                </template>
            </s-swiper>
            <div v-if="showDots" class="flex justify-center mt-5">
                <div v-for="(item, index) in data" :key="index" :class="[$store.state.pageColor +
                    ' h-2 w-2 rounded-full mx-1 cursor-pointer',
                {
                    ' darken-4': activeSlideIndex === index,
                    ' lighten-3': activeSlideIndex !== index,
                },
                ]" @click="goToSlide(index)"></div>
            </div>
            <div v-if="$s.smAndDown" class="flex justify-center mt-5">
                <div v-for="(item, index) in data" :key="index" :class="[$store.state.pageColor +
                    ' h-2 w-2 rounded-full mx-1 cursor-pointer',
                {
                    ' darken-4': activeSlideIndex === index,
                    ' lighten-3': activeSlideIndex !== index,
                },
                ]" @click="goToSlide(index)"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GRelated",

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        },

        title: {
            type: String,
            default: 'related-post'
        },

        slug: {
            type: String
        },

        showBtn: {
            type: Boolean,
            default: true
        },

        showDots: {
            type: Boolean,
            default: false
        },

        swiperSettings: {
            type: Object,
            default: {
                options: {
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        640: {
                            slidesPerView: 2.3,
                            spaceBetween: 80,
                        },
                    }
                }
            }
        }
    },

    data() {
        return {
            activeSlideIndex: 0,
        };
    },

    computed: {
        computedData() {
            return this.$_.merge(this.swiperOptions, this.swiperSettings);
        },
    },

    watch: {
        jumpToSlide(e) {
            this.jumpSlide(e);
        },
    },

    mounted() {
        this.swiper = this.$refs.mySwiper;
        this?.swiper?.swiper?.on("slideChange", () => {
            this.activeSlideIndex = this.swiper.swiper.activeIndex;
            this.$emit("changeSlide", this.activeSlideIndex);
        });
    },

    methods: {
        NextSlide() {
            this.swiper.swiper.slideNext();
        },

        PrevSlide() {
            this.swiper.swiper.slidePrev();
        },

        swiperMounted(swiperInstance) {
            this.$emit("input", swiperInstance);
        },

        goToSlide(index) {
            this.activeSlideIndex = index;
            this.swiper.swiper.slideTo(index);
        },
    },
};
</script>

<style>
.swiper {
    height: 100%;
}

.swiper-slide {
    height: auto !important;
}

.swiper-content {
    height: 100% !important;
}
</style>