<template>
    <div>
        <div v-show="$s.mdAndUp" class="relative flex">
            <div class="sticky top-0 left-0 w-1/2 h-screen flex flex-col s-center">
                <div class="absolute top-28 w-full text-center text-3xl rubik px-10">
                    {{ title }}
                </div>
                <svg class="w-3/5 mt-16" viewBox="-50,-50,100,100">
                    <circle class="progress-ring-circle" r="46" />
                    <path :class="$s.dark
                            ? 'dark-progress-ring-ring'
                            : 'progress-ring-ring'
                        " :d="path" />
                    <circle :class="$s.dark
                            ? 'dark-progress-ring-ring'
                            : 'progress-ring-end'
                        " :cx="endX" :cy="endY" r="1" />
                    <circle v-for="(circle, i) in data" :key="`circle${i}`" :style="checkColor(i)
                            ? $s.dark
                                ? 'fill: #B2DFDB'
                                : 'fill: #023D33'
                            : 'fill: grey'
                        " :cx="positionX(i)" :cy="positionY(i)" :r="checkPosition(i) ? '2' : '1'" />
                </svg>
                <div v-for="(item, i) in data" :key="`item${i}`"
                    class="!absolute w-2/5 mt-[70px] rounded-full overflow-hidden">
                    <s-image eager alt="banner" v :src="`${$config.STORAGE_URL}/${item.avatar}`" :aspect-ratio="1"
                        class="w-full transition-opacity duration-500"
                        :class="checkPosition(i) ? 'opacity-100' : 'opacity-0'" />
                </div>
            </div>
            <div :class="$store.state.pageColor" class="darken-4 w-1/2 rounded-3xl px-20 white--text"
                style="padding-top: 40vh" ref="dataDiv">
                <div v-for="(item, i) in data" :key="`data${i}`" style="height: 50vh"
                    class="flex flex-col justify-center" :class="checkPosition(i) ? 'opacity-100' : 'opacity-50'">
                    <div class="mb-10 text-3xl rubik leading-relaxed">
                        {{ $l(item.title) }}
                    </div>
                    <div>{{ $l(item.description) }}</div>
                </div>
            </div>
        </div>
        <div v-show="$s.mdAndDown" class="relative">
            <div class="flex justify-center">
                <svg class="w-full" viewBox="-50,-50,100,100">
                    <circle class="progress-ring-circle" r="46" />
                    <path :class="$s.dark
                            ? 'dark-progress-ring-ring'
                            : 'progress-ring-ring'
                        " :d="pathMobile" />
                    <circle :class="$s.dark
                            ? 'dark-progress-ring-ring'
                            : 'progress-ring-end'
                        " :cx="endXMobile" :cy="endYMobile" r="1" />
                    <circle v-for="(circle, i) in data" :key="`circle${i}`" :style="checkColorMobile(i)
                            ? $s.dark
                                ? 'fill: #B2DFDB'
                                : 'fill: #023D33'
                            : 'fill: grey'
                        " :cx="positionX(i)" :cy="positionY(i)" :r="checkPositionMobile(i) ? '2' : '1'" />
                </svg>
            </div>
            <div v-for="(item, i) in data" :key="`item${i}`"
                class="!absolute w-[calc(100%-120px)] rounded-full overflow-hidden top-[60px] left-[60px]">
                <s-image eager alt="banner" v :src="`${$config.STORAGE_URL}/${item.avatar}`" :aspect-ratio="1"
                    class="w-full transition-opacity duration-500" :class="checkPositionMobile(i + 1) ? 'opacity-100' : 'opacity-0'
                        " />
            </div>
            <s-swiper :options="options" ref="mySwiper" @input="swiperMounted" :items="data"
                class="w-full overflow-hidden h-fit p-5">
                <template #default="{ slide, i }">
                    <div class="font-bold" :class="activeSlideIndex - 1 === i ? $store.state.pageColor + '--text' : ''
                        ">
                        {{ $l(slide.title) }}
                    </div>
                    <div class="text-sm">{{ $l(slide.description) }}</div>
                </template>
            </s-swiper>
            <div class="flex gap-3 mb-7 md:mb-6 px-5" v-if="data.length > 1">
                <div v-if="data" aria-label="prev slide"
                    class="flex w-10 h-10 rounded-lg cursor-pointer blue-grey lighten-4 s-center"
                    v-ripple="{ class: 'white--text' }" @click="PrevSlide">
                    <svg-icon aria-label="prev slide" class="!w-8 !h-8 blue-grey--text text--darken-4"
                        :name="$s.rtl ? 'chevron-right' : 'chevron-left'" />
                </div>
                <div v-if="data" aria-label="next slide"
                    class="flex w-10 h-10 rounded-lg cursor-pointer blue-grey lighten-4 s-center"
                    v-ripple="{ class: 'white--text' }" @click="NextSlide">
                    <svg-icon aria-label="next slide" class="!w-8 !h-8 blue-grey--text text--darken-4"
                        :name="!$s.rtl ? 'chevron-right' : 'chevron-left'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GCircleSlider",

    props: {
        data: {
            type: Array,
            default: () => [],
        },

        title: String,
    },

    data() {
        return {
            circleCenter: null,
            degreeUnit: undefined,
            rotationDeg: 0,
            current: 0,
            circle: { value: 0, mobileValue: 0 },
            activeSlideIndex: 1,
            options: {
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
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
        };
    },

    mounted() {
        this.degreeUnit = 360 / this.data.length;
        this.swiper = this.$refs.mySwiper;
        this?.swiper?.swiper?.on("slideChange", () => {
            this.activeSlideIndex = this.swiper.swiper.activeIndex + 1;
            this.$emit("changeSlide", this.activeSlideIndex);
        });
        window.addEventListener("resize", this.animation());
        setTimeout(() => {
            this.animation();
        }, 100);
    },

    methods: {
        positionX(i) {
            const frac = (this.degreeUnit * i) / 360 || 0;
            return Math.cos(frac * 2 * Math.PI - Math.PI * 0.5) * 46;
        },
        positionY(i) {
            const frac = (this.degreeUnit * i) / 360 || 0;
            return Math.sin(frac * 2 * Math.PI - Math.PI * 0.5) * 46;
        },
        animation() {
            let target = this.$refs.dataDiv;
            let tl = this.$gsap.timeline({
                scrollTrigger: {
                    trigger: target,
                    start: "top top",
                    end: "bottom 90%",
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                    // markers: true,
                },
            });
            tl.to(this.circle, { value: 360, ease: "none" });
        },
        checkPosition(i) {
            if (this.circle.value) {
                return (
                    this.circle.value >= this.degreeUnit * i &&
                    this.circle.value <= this.degreeUnit * (i + 1)
                );
            }
        },
        checkPositionMobile(i) {
            return (
                this.activeSlideIndex * this.degreeUnit == this.degreeUnit * i
            );
        },
        checkColor(i) {
            if (this.$s.mdAndUp) {
                if (this.circle.value) {
                    return this.circle.value >= this.degreeUnit * i;
                }
            } else {
                return (
                    this.activeSlideIndex * this.degreeUnit >=
                    this.degreeUnit * i
                );
            }
        },
        checkColorMobile(i) {
            return (
                this.activeSlideIndex * this.degreeUnit >= this.degreeUnit * i
            );
        },
        NextSlide() {
            this.swiper.swiper.slideNext();
        },

        PrevSlide() {
            this.swiper.swiper.slidePrev();
        },
        swiperMounted(swiperInstance) {
            this.$emit("input", swiperInstance);
        },
    },

    computed: {
        theta() {
            const frac = this.circle.value / 360 || 0;
            return frac * 2 * Math.PI;
        },
        thetaMobile() {
            const frac = (this.activeSlideIndex * this.degreeUnit) / 360 || 0;
            return frac * 2 * Math.PI;
        },
        path() {
            const large = this.theta > Math.PI;
            return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX},${this.endY
                }`;
        },
        pathMobile() {
            const large = this.thetaMobile > Math.PI;
            return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endXMobile},${this.endYMobile
                }`;
        },
        endX() {
            if (this.circle.value == 360) {
                return (
                    Math.cos((359.99 / 360) * 2 * Math.PI - Math.PI * 0.5) * 46
                );
            } else {
                return Math.cos(this.theta - Math.PI * 0.5) * 46;
            }
        },
        endY() {
            if (this.circle.value == 360) {
                return (
                    Math.sin((359.99 / 360) * 2 * Math.PI - Math.PI * 0.5) * 46
                );
            } else {
                return Math.sin(this.theta - Math.PI * 0.5) * 46;
            }
        },
        endXMobile() {
            if (this.activeSlideIndex * this.degreeUnit == 360) {
                return (
                    Math.cos((359.99 / 360) * 2 * Math.PI - Math.PI * 0.5) * 46
                );
            } else {
                return Math.cos(this.thetaMobile - Math.PI * 0.5) * 46;
            }
        },
        endYMobile() {
            if (this.activeSlideIndex * this.degreeUnit == 360) {
                return (
                    Math.sin((359.99 / 360) * 2 * Math.PI - Math.PI * 0.5) * 46
                );
            } else {
                return Math.sin(this.thetaMobile - Math.PI * 0.5) * 46;
            }
        },
    },
};
</script>

<style lang="scss">
.progress-ring-circle {
    stroke: rgba(105, 105, 105, 0.1);
    stroke-width: 0.5;
    fill: none;
}

.progress-ring-ring {
    stroke: #023d33;
    stroke-width: 0.5;
    fill: none;
}

.dark-progress-ring-ring {
    stroke: #b2dfdb;
    stroke-width: 0.5;
    fill: none;
}

.progress-ring-end {
    fill: #023d33;
}

.dark-progress-ring-end {
    fill: #b2dfdb;
}
</style>
