<template>
    <div class="relative p-4">
        <s-swiper :options="options" ref="imageSwiper" @input="imageSwiperMounted" :items="data"
            class="overflow-hidden !rounded-3xl">
            <template v-slot:default="{ slide }">
                <div class="overflow-hidden">
                    <s-image eager :aspect-ratio="$s.mdAndUp ? 2.24 : null" v :height="$s.mdAndUp ? null : '55vh'"
                        class="rounded-4xl" :src="`${$config.STORAGE_URL}/${slide?.avatar}`" />
                </div>
            </template>
        </s-swiper>
        <div
            class="md:absolute w-full h-full top-0 bottom-0 left-0 z-1 flex justify-end items-end md:!mt-0 !mt-6 md:p-8 !pointer-events-none">
            <div class="md:w-1/2 w-full !pointer-events-auto">
                <div :class="$s.mdAndUp ? 'glass-swiper' : $s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                    class="flex flex-col justify-between md:rounded-2xl rounded-4xl h-full w-full">
                    <s-swiper ref="textSwiper" @input="textSwiperMounted" :items="data" class="overflow-hidden"
                        :class="data.length == 1 ? 'pb-8' : ''">
                        <template v-slot:default="{ slide }">
                            <div class="pt-8 px-8 ">
                                <g-title
                                    :class="$s.mdAndUp ? $store.state.pageColor + '--text text--lighten-6' : $s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                    class="text-xl md:text-4xl rubik font-black !leading-normal"
                                    :text="$l(slide.title)" />
                                <s-btn :to="slide?.link" rounded="pill" :color="$store.state.pageColor + 'lighten-6'"
                                    class="mt-10">
                                    <g-text :darkColor="$store.state.pageColor + '--text text--lighten-6'"
                                        :data="$l(slide.btn_text)" />
                                </s-btn>
                            </div>
                        </template>
                    </s-swiper>
                    <div v-if="data.length > 1" class="flex justify-end gap-1 p-4">
                        <div @click="PrevSlide" v-if="data.length > 1" v-ripple
                            :class="$s.rtl ? $store.state.pageColor + ' lighten-6 rounded-r-3xl rounded-l-md' : $store.state.pageColor + ' lighten-6 rounded-l-3xl rounded-r-md'"
                            class="h-12 flex s-center cursor-pointer">
                            <div class="w-16 flex s-center !h-12">
                                <svg-icon aria-label="prev slide"
                                    :class="$store.state.pageColor + '--text text--darken-6'" class="!w-8 !h-8"
                                    :name="$s.rtl ? 'chevron-right' : 'chevron-left'" />
                            </div>
                        </div>
                        <div @click="NextSlide" v-if="data.length > 1" v-ripple
                            :class="$s.rtl ? $store.state.pageColor + ' lighten-6 rounded-l-3xl rounded-r-md' : $store.state.pageColor + ' lighten-6 rounded-r-3xl rounded-l-md'"
                            class="h-12 flex s-center cursor-pointer">
                            <div class="w-16 flex s-center !h-12">
                                <svg-icon aria-label="prev slide"
                                    :class="$store.state.pageColor + '--text text--darken-6'" class="!w-8 !h-8"
                                    :name="$s.rtl ? 'chevron-left' : 'chevron-right'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GHomeSlider',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        }
    },

    data() {
        return {
            activeIndex: 0,
            imageSwiper: null,
            textSwiper: null,
            options: {
                speed: 800,
                spaceBetween: 10,
            }
        };
    },

    mounted() {
        this.imageSwiper = this.$refs.imageSwiper.swiper;
        this.textSwiper = this.$refs.textSwiper.swiper;

        this.imageSwiper.on('slideChange', () => {
            this.activeIndex = this.imageSwiper.activeIndex;
            this.textSwiper.slideTo(this.imageSwiper.activeIndex);
            this.$emit('changeSlide', this.imageSwiper.activeIndex);
        });

        this.textSwiper.on('slideChange', () => {
            this.activeIndex = this.textSwiper.activeIndex;
            this.imageSwiper.slideTo(this.textSwiper.activeIndex);
            this.$emit('changeSlide', this.textSwiper.activeIndex);
        });
    },

    methods: {
        NextSlide() {
            if (this.imageSwiper) {
                const nextIndex = this.imageSwiper.activeIndex + 1;
                this.imageSwiper.slideTo(nextIndex);
                this.textSwiper.slideTo(nextIndex);
                this.$emit('NextSlide', nextIndex);
            }
        },

        PrevSlide() {
            if (this.imageSwiper) {
                const prevIndex = this.imageSwiper.activeIndex - 1;
                this.imageSwiper.slideTo(prevIndex);
                this.textSwiper.slideTo(prevIndex);
                this.$emit('PrevSlide', prevIndex);
            }
        },

        imageSwiperMounted(swiperInstance) {
            this.imageSwiper = swiperInstance;
            this.$emit('input', swiperInstance);
        },

        textSwiperMounted(swiperInstance) {
            this.textSwiper = swiperInstance;
        }
    }
}
</script>

<style lang="scss">
.glass-swiper {
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
}
</style>