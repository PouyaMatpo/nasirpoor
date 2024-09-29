<template>
    <div v-if="componentKey">
        <slot :activeIndex="activeIndex" :onClick="clickItem" :elements="triggerElements">
            <s-tabs v-model="activeIndex" :btn="btn" centered center-active :slider-color="sliderColor" ref="tabs"
                :rounded="sliderRounded" :background-color="backgroundColor" :class="`rounded-${rounded}`"
                class="overflow-auto !max-w-full">
                <v-tab v-for="(item, i) in data" :key="'activeTab' + i" @click="clickItem(i)" :active-class="activeColor"
                    :class="ripple ? '' : 'ripple'">
                    <div class="flex items-center md:!px-2 !px-1" 
                        :style="activeIndex != i ? unActiveStyle : ''">
                        <div :class="item.description && !activeIndex ? 'darken-2 p-1 rounded-full' : ''">
                            <g-text class="font-medium !text-xs" :data="$l(item.title)" />
                        </div>
                        <div v-if="item.description && !activeIndex">
                            <g-text class="!text-xs" :data="item.description" />
                        </div>
                    </div>
                </v-tab>
            </s-tabs>
        </slot>
    </div>
</template>
<script>
import { nextTick } from 'vue'
export default {
    name: 'ActiveTabs',

    props: {
        data: {
            type: [Array, Object],
            default: () => []
        },

        unActiveStyle: String,

        triggerClass: {
            type: String,
            default: 'active-items__section'
        },

        topOffset: {
            type: Number,
            default: 0
        },

        contentClass: {
            type: String,
            default: 'active-items__content'
        },

        tag: String,

        sliderColor: {
            type: String,
            default: 'primary lighten-4'
        },

        ripple: Boolean,

        activeColor: {
            type: String,
            default: 'primary--text text--lighten-5'
        },

        textColor: {
            type: String,
            default: 'primary--text'
        },

        btn: Boolean,

        backgroundColor: {
            type: String,
            default: 'primary'
        },

        sliderRounded: {
            type: String,
            default: 'xl'
        },

        rounded: {
            type: String,
            default: 'xl'
        },

    },

    data() {
        return {
            activeItem: 0,
            componentKey: true,
            activeIndex: 0,
            triggerElements: [],
            isScrolling: false,
            triggers: [],
            instance: undefined,
            initialDomCheckerInterval: undefined,
            resizeWatcherInterval: undefined,
            oldScrollY: 0,
        }
    },
    mounted() {
        this.startWhenDomAvailable()
        this.$toggleDark()
        setTimeout(() => {
            this.$toggleDark()
        }, 1);
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        startWhenDomAvailable() {
            let elementClass = this.tag ? this.contentClass : this.triggerClass
            this.initialDomCheckerInterval = setInterval(() => {
                if (document.getElementsByClassName(elementClass).length) {
                    this.start();
                    clearInterval(this.initialDomCheckerInterval);
                    this.initialDomCheckerInterval = undefined
                }
            }, 1000)
        },
        start() {
            if (this.tag) {
                this.triggerElements = this.$gsap.utils.toArray(`.${this.contentClass} ${this.tag}`)
            } else {
                this.triggerElements = this.$gsap.utils.toArray(`.${this.triggerClass}`)
            }
            this.$emit('update:trigger-elements', this.triggerElements)
            this.triggerElements.forEach((el, i) => {
                this.triggers[i] = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: () => `top top+=${this.topOffset + 1}px`,
                        end: () => `bottom top+=${this.topOffset + 1}px`,
                        onToggle: self => {
                            if (!this.isScrolling)
                                this.activeIndex = i
                        },
                    }
                })
            })
            this.resizeWatcher();
            this.$config.DEBUG && console.log('%c [S-Active-Items] Initialized!', 'background: green; color: white');
        },
        clickItem(i) {
            this.activeItem = i
            this.$gsap.to(window, {
                scrollTo: { y: this.triggerElements[i], offsetY: this.topOffset - 1 },
                duration: 0.3,
                ease: 'quart.inOut',
                onStart: self => {
                    this.isScrolling = true
                },
                onComplete: self => {
                    this.isScrolling = false
                }
            })
        },
        updateTriggers() {
            this.triggers.forEach(trigger => {
                trigger.scrollTrigger.refresh()
            });
            this.$config.DEBUG && console.log('%c [S-Active-Items] Refreshed!', 'background: blue; color: white');
        },
        resizeWatcher() {
            let sizes = {}
            this.triggerElements.forEach((el, i) => sizes[i] = el.offsetTop)
            this.resizeWatcherInterval = setInterval(() => {
                this.triggerElements.forEach((el, i) => {
                    let newSize = el.offsetTop
                    if (sizes[i] !== newSize) {
                        sizes[i] = newSize;
                        this.updateTriggers()
                    }
                })
            }, 1000);
        },
        destroy() {
            if (this.initialDomCheckerInterval != undefined) { clearInterval(this.initialDomCheckerInterval); this.initialDomCheckerInterval = undefined }
            if (this.resizeWatcherInterval != undefined) { clearInterval(this.resizeWatcherInterval); this.resizeWatcherInterval = undefined }
            if (this.instance != undefined) {
                this.instance.scrollTrigger != undefined && this.instance.scrollTrigger.kill()
                this.instance.kill()
                this.instance = undefined
            };
            this.$config.DEBUG && console.log('%c [S-Active-Items] Destroyed!', 'background: black; color: white');
        },
    },
    watch: {
        async '$s.dark'() {
            this.componentKey = false
            await nextTick()
            this.componentKey = true
        }
    }
}
</script>
<style lang="scss">
.ripple {
    .v-ripple__container {
        display: none !important;
    }
}

.v-tabs {
    width: 100% !important;
}

.v-slide-group__content {
    display: flex !important;
}

.tabButton.horizontal {
    .v-tabs-slider-wrapper {
        .v-tabs-slider {
            padding: 0px 20px !important;
        }
    }

    .v-tab--active {
        padding: 4px 12px !important;
    }

    .v-tab {
        padding: 4px 12px;
    }
}

.v-slide-group__prev {
    display: none !important;
}
</style>