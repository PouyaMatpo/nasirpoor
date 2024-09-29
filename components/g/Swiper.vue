<template>
    <div>
        <div v-if="data.length > 2" class="flex items-center justify-between">
            <div
                v-if="showBtn"
                class="flex gap-3 mb-7 md:mb-6"
                :class="btnClass"
            >
                <s-avatar
                    :color="
                        $s.dark
                            ? $store.state.pageColor + ' darken-3'
                            : $store.state.pageColor + ' lighten-4'
                    "
                    icon="chevron-left"
                    :rounded="btnRounded"
                    :position="$s.rtl ? 'right' : 'left'"
                    @click="PrevSlide"
                    class=""
                    :class="
                        activeSlideIndex == 0
                            ? 'opacity-50 cursor-default'
                            : 'opacity-100 cursor-pointer'
                    "
                />
                <s-avatar
                    :color="
                        $s.dark
                            ? $store.state.pageColor + ' darken-3'
                            : $store.state.pageColor + ' lighten-4'
                    "
                    icon="chevron-right"
                    :rounded="btnRounded"
                    :position="$s.rtl ? 'left' : 'right'"
                    @click="NextSlide"
                    class=""
                    :class="
                        activeSlideIndex == data.length - 1
                            ? 'opacity-50 cursor-default'
                            : 'opacity-100 cursor-pointer'
                    "
                />
            </div>
        </div>
        <s-swiper
            :options="computedData"
            ref="mySwiper"
            @input="swiperMounted"
            :items="data"
            class="w-full overflow-hidden h-fit"
        >
            <template #default="{ slide }">
                <slot :slide="slide">{{ slide }}</slot>
            </template>
        </s-swiper>
        <div
            v-if="showDots"
            class="flex justify-center mt-5"
            :class="dotsClass"
        >
            <div
                v-for="(item, index) in data"
                :key="index"
                :class="[
                    $store.state.pageColor +
                        ' h-2 w-2 rounded-full mx-1 cursor-pointer',
                    {
                        ' darken-4': activeSlideIndex === index,
                        ' lighten-3': activeSlideIndex !== index,
                    },
                ]"
                @click="goToSlide(index)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GSwiper",

    props: {
        data: {
            type: [Array, Object],
            default: () => [],
        },

        showBtn: Boolean,

        showDots: Boolean,

        dotsClass: String,

        btnClass: String,

        btnRounded: {
            type: String,
            default: "pill",
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
                    },
                },
            },
        },
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
