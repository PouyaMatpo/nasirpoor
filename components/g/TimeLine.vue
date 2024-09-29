<template>
    <div class="relative">
        <g-text tag="h2" class="text-2xl mb-4" :data="title" />
        <div v-if="$s.smAndDown" class="py-4">
            <v-tabs center-active v-model="activeSlideIndex" class="rounded-3xl overflow-hidden"
                :color="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-1'"
                :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                :background-color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'
                    " :slider-color="$s.dark ? $store.state.pageColor + ' darken-2' : $store.state.pageColor + ' darken-4'
                        " grow>
                <v-tab v-for="(date, i) in data" :key="i" :ripple="false" @click="goToSlide(activeSlideIndex)">
                    <g-text :color="activeSlideIndex == i
                        ? $store.state.pageColor + '--text text--darken-4'
                        : $store.state.pageColor + '--text text--lighten-2'
                        " :data="date.date" />
                </v-tab>
            </v-tabs>
        </div>
        <div>
            <s-swiper :options="options" ref="mySwiper" @input="swiperMounted" :items="data"
                class="w-full overflow-hidden !rounded-3xl h-full">
                <template #default="{ slide, i }">
                    <div class="flex items-center w-full h-full">
                        <g-time-line-card v-if="project" :project="project" class="h-full w-full white--text" :color="$s.dark
                            ? $store.state.pageColor + ' darken-6'
                            : $store.state.pageColor + ' lighten-5'
                            " :data="{
                                src: slide.link,
                                date: slide.date,
                                title: slide.title,
                                description: slide.description,
                            }" />
                        <g-time-line-card v-if="!project" class="h-full w-full white--text" :color="$s.dark
                            ? $store.state.pageColor + ' darken-6'
                            : $store.state.pageColor + ' lighten-5'
                            " :data="{
                                src: slide.avatar,
                                date: slide.date,
                                title: slide.title,
                                description: slide.description,
                            }" />
                        <template v-if="i !== data.length - 1">
                            <s-divider length="15%" :opacity="1" :color="$s.dark
                                ? $store.state.pageColor + ' lighten-4'
                                : $store.state.pageColor + ' darken-4'
                                " thickness="1px" class="mx-2" />
                        </template>
                    </div>
                </template>
            </s-swiper>

            <div v-if="$s.mdAndUp" class="w-full overflow-x-auto relative z-3 my-6">
                <div class="flex mb-2 gap-16 justify-between">
                    <div v-for="(date, index) in data" :key="`date${index}`"
                        class="text-lg cursor-pointer" @click="goToSlide(index)" :class="$s.dark
                            ? activeSlideIndex == index
                                ? $store.state.pageColor + '--text text--lighten-6'
                                : $store.state.pageColor + '--text text--lighten-4'
                            : activeSlideIndex == index
                                ? $store.state.pageColor + '--text text--darken-6'
                                : $store.state.pageColor + '--text text--darken-2'
                            ">
                        {{ date.date }}
                    </div>
                </div>
                <div class="flex items-center mx-5">
                    <div v-for="(date, index) in data" :key="`dot${index}`" class="flex items-center"
                        :class="index !== 0 ? 'w-full' : ''">
                        <div v-if="index != 0" :class="$s.dark
                            ? $store.state.pageColor + ' lighten-4'
                            : $store.state.pageColor + ' darken-2'
                            " class="inline-block w-full h-0.5" />
                        <div class="inline-block rounded-full cursor-pointer" :class="$s.dark
                            ? activeSlideIndex == index
                                ? $store.state.pageColor + ' lighten-6 w-4 h-4 mx-1'
                                : $store.state.pageColor + ' lighten-2 w-2 h-2 mx-2'
                            : activeSlideIndex == index
                                ? 'w-4 h-4 darken-6 mx-1'
                                : 'w-2 h-2 darken-2 mx-2'
                            " @click="goToSlide(index)" />
                    </div>
                </div>
            </div>
            <div v-if="data.length > 1" class="flex gap-2 md:!mt-0 !mt-4">
                <g-arrow :position="$s.rtl ? 'right' : 'left'" :arrowColor="$s.dark ? 'white' : $store.state.pageColor"
                    class="cursor-pointer" @click="PrevSlide"
                    :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-5'" />
                <g-arrow :position="$s.rtl ? 'left' : 'right'" :arrowColor="$s.dark ? 'white' : $store.state.pageColor"
                    class="cursor-pointer" @click="NextSlide"
                    :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-5'" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GTimeLine",

    props: {
        data: {
            type: [Array, Object],
            default: () => [],
        },

        title: String,

        project: Boolean,
    },

    data() {
        return {
            activeSlideIndex: 0,
            options: {
                breakpoints: {
                    320: {
                        slidesPerView: 1.1,
                        spaceBetween: 0,
                    },
                    480: {
                        slidesPerView: 1.1,
                        spaceBetween: 0,
                    },
                    640: {
                        slidesPerView: 1.1,
                        spaceBetween: 0,
                    },
                },
            },
        };
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
            // console.log('h')
        },

        PrevSlide() {
            this.swiper.swiper.slidePrev();
            // console.log('h')
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

<style lang="scss">
.swiper {
    height: auto !important;
}

.swiper-slide {
    height: auto !important;
}
</style>
