<template>
    <div>
        <div v-if="$s.smAndDown" class="tab-image-tabs mb-4">
            <v-tabs
                center-active
                v-model="activeItem"
                class="rounded-4xl overflow-hidden text-xs md:text-xl md:font-black h-16 md:h-[160px]"
                :color="$s.dark ? color + ' lighten-4' : color + ' lighten-1'"
                :class="$s.dark ? color + ' darken-5' : color + ' lighten-3'"
                :background-color="
                    $s.dark ? color + ' darken-5' : color + ' lighten-4'
                "
                :slider-color="
                    $s.dark ? color + ' darken-2' : color + ' lighten-4'
                "
                grow
            >
                <v-tab v-for="(tab, i) in items" :key="i" :ripple="false">
                    <div class="tab-image-content">
                        <span v-if="$s.mdAndUp">{{
                            $l(i + 1 < 10 ? `${i + 1}` : i + 1)
                        }}</span>
                        {{ $l(tab.subtitle) }}
                    </div>
                </v-tab>
            </v-tabs>
        </div>
        <div class="rounded-4xl overflow-hidden">
            <g-swiper
                :swiperSettings="swiperSettings"
                :data="items"
                @input="swiperMounted"
            >
                <template v-slot="{ slide }">
                    <v-img
                        alt="image"
                        aspect-ratio="3"
                        gradient="rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%"
                        :src="`${$config.STORAGE_URL}/${slide?.file}`"
                        class="rounded-4xl w-full !h-full"
                    >
                        <div
                            class="w-full flex flex-col justify-between p-5 md:p-14"
                        >
                            <div
                                class="text-4xl font-black mb-20 md:mb-64 white--text"
                            >
                                {{ $l(slide.title) }}
                            </div>
                            <div class="text-lg white--text w-full md:w-[70%]">
                                {{ $l(slide.description) }}
                            </div>
                        </div>
                    </v-img>
                </template>
            </g-swiper>
        </div>
        <div v-if="$s.mdAndUp" class="tab-image-tabs mt-4">
            <v-tabs
                center-active
                v-model="activeItem"
                :class="$s.dark ? color + ' darken-5' : color + ' lighten-4'"
                class="rounded-4xl text-xs md:text-xl md:font-black h-16 md:h-[160px]"
                :color="$s.dark ? color + ' lighten-3' : color + ' darken-1'"
                :background-color="
                    $s.dark ? color + ' darken-5' : color + ' lighten-4'
                "
                :slider-color="
                    $s.dark ? color + ' darken-4' : color + ' lighten-5'
                "
                grow
            >
                <v-tab v-for="(tab, i) in items" :key="i" :ripple="false">
                    <div class="tab-image-content">
                        <span v-if="$s.mdAndUp">{{
                            i + 1 < 10 ? `${i + 1}` : i + 1
                        }}</span
                        >{{ $l(tab.title) }}
                    </div>
                </v-tab>
            </v-tabs>
        </div>
    </div>
</template>
<script>
export default {
    name: "ATabImage",

    props: {
        items: {
            type: Array,
            default: () => [],
        },

        color: {
            type: String,
            default: "green",
        },
    },

    data() {
        return {
            activeItem: 0,
            swiperInstance: null,
            swiperSettings: {
                slidesPerView: 1,
                spaceBetween: 100,
            },
        };
    },

    watch: {
        activeItem(val) {
            this.swiperInstance.slideTo(val);
        },
    },

    methods: {
        swiperMounted(swiperInstance) {
            this.swiperInstance = swiperInstance;
            this.swiperInstance.on("slideChange", (swiper) => {
                this.activeItem = swiper.activeIndex;
            });
        },
    },
};
</script>
<style lang="scss">
.tab-image-tabs {
    .v-tabs-slider-wrapper {
        height: 100% !important;
        z-index: auto;
        padding: 5px;

        @media (min-width: 576px) {
            padding: 12px;
        }

        .v-tabs-slider {
            border-radius: 24px;
        }
    }

    .v-item-group {
        height: 100%;
    }

    .v-tab--active:focus::before {
        opacity: 0 !important;
    }

    .v-tab:hover::before {
        opacity: 0 !important;
    }

    .v-tab {
        font-weight: inherit;
        font-size: inherit;
    }

    .tab-image-content {
        position: relative;

        span {
            position: absolute;
            top: -35px;
            font-size: 16px;
        }
    }
}

.swiper-slide .v-image {
    display: flex;
    width: 100% !important;
    height: 100% !important;
}
</style>
