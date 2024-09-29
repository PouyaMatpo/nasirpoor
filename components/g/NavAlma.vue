<template>
    <div>
        <s-falcon :viva="true" xs="bar" md="drawer" :width="$s.mdAndUp ? 96 : null" flat permanent
            class="main-navigation-container" :right="$s.rtl"
            :sw-options="{ parentClass: `${$s.dark ? 'blue-grey darken-4' : $store.state.pageColor + ' lighten-5'} w-full` }">
            <div class="flex flex-col justify-between items-center h-full">
                <div dir="rtl"
                    class="w-full h-full flex justify-between md:justify-center items-center md:items-start px-5 md:px-0">
                    <g-hamburger class="md:!mt-8 !mt-0" :openMenu="!nav" @click="toggleNav" />
                    <div class="flex items-center gap-2 h-full">
                        <!-- <div v-show="$s.smAndDown" @click="nav = false">
                            <g-search :schema="{ dataset: ['search'] }" />
                        </div>
                        <g-call v-show="$s.smAndDown" /> -->
                        <div class="h-12">
                            <nuxt-link :to="localePath('/')" aria-label="logo">
                                <g-logo :icon="$s.dark ? '../New_Project.png' : '../New_Project_4.png'"
                                    iconWidth="160px" />
                            </nuxt-link>
                        </div>
                        <!-- <div v-else class="h-12">
                            <nuxt-link :to="localePath('/')" aria-label="logo">
                                <g-logo :darker="$store.state.darker" :lighter="$store.state.lighter"
                                    :alt="$s.dark ? $l($ocean.config?.pages?.global?.icon)?.files?.['dark-banner']?.attributes?.alt : $l($ocean.config?.pages?.global?.icon)?.files?.['light-banner']?.attributes?.alt"
                                    :image="$s.dark ? $l($ocean.config?.pages?.global?.text)?.files?.['dark-banner']?.server_path : $l($ocean.config?.pages?.global?.text)?.files?.['light-banner']?.server_path"
                                    imageWidth="auto" />
                            </nuxt-link>
                        </div> -->
                    </div>
                </div>
                <div v-if="$s.mdAndUp" class="flex flex-col gap-12 mb-12 items-center">
                    <g-social vertical class="rounded-full"
                        v-if="$l($ocean.config?.pages?.global?.socials)?.attributes?.social_networks?.length"
                        :data="$l($ocean.config?.pages?.global?.socials)?.attributes?.social_networks"
                        :color="$s.dark ? $store.state.pageColor + '--text text--lighten-4' : $store.state.pageColor + '--text text--darken-4'"
                        :class="$s.dark ? $store.state.darker ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' darken-4' : $store.state.lighter ? $store.state.pageColor + ' lighten-5' : $store.state.pageColor + ' lighten-4'" />
                    <g-dark-mode btn size="20" />
                </div>
            </div>
        </s-falcon>
        <s-falcon :viva.sync="nav" xs="drawer" temporary hide-overlay stateless class="navigation-container"
            :width="$s.mdAndUp ? 'calc(100%)' : '100%'" :height="$s.mdAndUp ? '100vh' : 'calc(100%)'" :right="$s.rtl"
            :sw-options="{ parentClass: `backdrop-blur-xl ${$s.mdAndUp ? 'ltr:ml-24 rtl:mr-24' : '!mt-14'}` }">
            <div id="wrapper-anim-item" style="height: calc(100% - 56px);"
                class="w-full flex flex-col pt-5 md:p-16 overflow-hidden"
                :style="$s.dark ? 'background: rgba(0, 0, 0, 0.4);' : 'background: rgba(255, 255, 255, 0.7);'">
                <!-- <div @click="toggleNav">
                    <nuxt-link v-show="$s.mdAndUp" :to="localePath('/')" class="flex gap-2 justify-end "
                        id="top-anim-item">
                        <g-logo
                            :alt="$s.dark ? $l($ocean.config?.pages?.global?.icon)?.files?.['dark-banner']?.attributes?.alt : $l($ocean.config?.pages?.global?.icon)?.files?.['light-banner']?.attributes?.alt"
                            :icon="$s.dark ? $l($ocean.config?.pages?.global?.icon)?.files?.['dark-banner']?.server_path : $l($ocean.config?.pages?.global?.icon)?.files?.['light-banner']?.server_path"
                            :image="$s.dark ? $l($ocean.config?.pages?.global?.text)?.files?.['dark-banner']?.server_path : $l($ocean.config?.pages?.global?.text)?.files?.['light-banner']?.server_path"
                            iconWidth="37px" :imageWidth="$s.mdAndUp ? '75px' : '50px'" />
                    </nuxt-link>
                </div> -->
                <v-row class="!m-0 px-5 md:p-0">
                    <!-- <s-col v-show="$s.mdAndUp" :md="4"
                        class="!p-0 overflow-x-hidden overflow-y-auto primary-items-wrapper"
                        style="max-height: calc(100vh - 224px)">
                        <div v-for="(item, i) in ($s.rtl ? $ocean.config?.pages?.global?.nav?.fa?.attributes?.main_nav : $ocean.config?.pages?.global?.nav?.en?.attributes?.main_nav)"
                            :key="i" id="primary-anim-item" class="primary-anim-item flex flex-col md:flex-row py-2"
                            @mouseenter="$s.mdAndUp ? mouseEnterHandler(item) : null">
                            <div class="flex items-center justify-between py-1">
                                <nuxt-link aria-label="slug" :to="item.data?.link || '/'"
                                    class="flex text-4xl font-black"
                                    :class="[{ 'logical-deActive': currentItem?._items?.length && item.data?.link != currentItem.data?.link }, $s.dark ? $store.state.pageColor + '--text text--accent-4' : $store.state.pageColor + '--text text--darken-4']">
                                    <div @click="toggleNav">
                                        <g-text>{{ $l(item.data?.title) }}</g-text>
                                    </div>
                                </nuxt-link>
                                <div v-if="item?._items?.length"
                                    class="item-plus relative flex items-center w-2 h-2 md:w-6 md:h-6 ltr:ml-5 rtl:mr-5 cursor-pointer p-3"
                                    :class="[{ 'logical-active': currentItem?._items?.length && item.data?.link == currentItem.data?.link }, $s.dark ? $store.state.pageColor + '--text text--accent-4' : $store.state.pageColor + '--text text--darken-4']"
                                    @click.stop="mouseEnterHandler(item)">
                                </div>
                            </div>
                            <v-expand-transition>
                                <div class="px-3"
                                    v-show="$s.smAndDown && item?._items?.length && currentItem.data?.link == item.data?.link"
                                    id="secondary-items-wrapper">
                                    <nuxt-link v-for="(cItem, i) in item?._items || {}" :key="i" aria-label="slug"
                                        :to="localePath(cItem.data?.link || '/')" class="flex text-md mb-2 font-bold"
                                        :class="[{ 'mt-2': i == 0 }, $s.dark ? $store.state.pageColor + '--text text--accent-4' : $store.state.pageColor + '--text text--darken-4']"
                                        id="secondary-anim-item">
                                        <div @click="toggleNav">
                                            <g-text>{{ $l(cItem.data?.title) }}</g-text>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </v-expand-transition>
                        </div>
                    </s-col> -->
                    <s-col v-show="$s.smAndDown" :md="4"
                        class="!p-0 overflow-x-hidden overflow-y-auto primary-items-wrapper"
                        style="max-height: calc(100vh - 224px)">
                        <div v-for="(item, i) in menu" :key="i" id="primary-anim-item"
                            class="primary-anim-item !rounded-md flex flex-col md:flex-row my-1 px-4 py-2"
                            @mouseenter="$s.mdAndUp ? mouseEnterHandler(item) : null"
                            :style="$s.dark ? 'background-color: #0d1019;' : 'background-color: #FFF9C4;'" :class="[
                                { '!rounded-t-3xl': i == 0 },
                                { '!rounded-b-3xl': i == menu.length - 1 },
                            ]">
                            <div @click.stop="mouseEnterHandler(item)" class="flex items-center justify-between py-1">
                                <template v-if="item._items && item._items.length">
                                    <div class="text-lg font-black"
                                        :class="[{ 'logical-deActive': currentItem?._items?.length && item.slug != currentItem?.slug }]">
                                        <g-text>{{ item.title }}</g-text>
                                    </div>
                                </template>
                                <template v-else>
                                    <nuxt-link aria-label="slug" :to="localePath(item.slug || '/')"
                                        class="text-lg font-black"
                                        :class="[{ 'logical-deActive': currentItem?._items?.length && item.slug != currentItem?.slug }]">
                                        <div @click="toggleNav">
                                            <g-text color="black--text">{{ item.title }}</g-text>
                                        </div>
                                    </nuxt-link>
                                </template>
                                <div v-if="item?._items?.length"
                                    class="item-plus relative flex items-center !w-4 !h-4 md:!w-6 md:!h-6 ltr:ml-5 rtl:mr-5 cursor-pointer"
                                    :class="[{ 'logical-active': currentItem?._items?.length && item.slug == currentItem.slug }]"
                                    @click.stop="mouseEnterHandler(item)">
                                </div>
                            </div>
                            <v-expand-transition>
                                <div class="px-3"
                                    v-show="$s.smAndDown && item?._items?.length && currentItem.slug == item.slug"
                                    id="secondary-items-wrapper">
                                    <nuxt-link v-for="(cItem, i) in item._items || {}" :key="i" aria-label="slug"
                                        :to="localePath(cItem.slug || '/')" class="flex mb-2 font-bold"
                                        :class="[{ 'mt-2': i == 0 }, $s.dark ? $store.state.pageColor + '--text text--accent-4' : $store.state.pageColor + '--text text--darken-4']"
                                        id="secondary-anim-item">
                                        <div @click="toggleNav">
                                            <g-text>{{ cItem.title }}</g-text>
                                        </div>
                                    </nuxt-link>
                                </div>
                            </v-expand-transition>
                        </div>
                    </s-col>
                    <!-- <s-col v-show="$s.mdAndUp" :md="8" class="!p-0 overflow-x-hidden overflow-y-auto"
                        style="max-height: calc(100vh - 224px)">
                        <div v-if="$s.mdAndUp" id="secondary-items-wrapper">
                            <nuxt-link v-for="(item, i) in currentItem?._items || {}" :key="i" aria-label="slug"
                                :to="item.data?.link || '/'"
                                :class="$s.dark ? $store.state.pageColor + '--text text--accent-4' : $store.state.pageColor + '--text text--darken-4'"
                                class="flex font-bold text-xl mb-4" id="secondary-anim-item">
                                <div @click="toggleNav">{{ $l(item.data.title) }}</div>
                            </nuxt-link>
                        </div>
                    </s-col> -->
                </v-row>
                <div class="p-5">
                    <div id="bottom-anim-item"
                        :style="$s.dark ? 'background-color: #0d1019;' : 'background-color: #FFF9C4;'"
                        class="flex justify-between items-center p-2 rounded-3xl">
                        <g-social class="w-fit rounded-full" :data="social_networks"
                            :color="$store.state.pageColor + '--text text--darken-3'"
                            :style="$s.dark ? 'background-color: #040b25;' : null"
                            :class="$s.dark ? 'rounded-full' : $store.state.pageColor + ' lighten-4 rounded-full'" />
                        <div class="flex items-center justify-between">
                            <div @click="toggleNav">
                                <g-dark-mode btn size="20" />
                            </div>
                            <!-- <div @click="toggleNav">
                                <g-lang-changer
                                    :btnText="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                    multiLangBtn />
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </s-falcon>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                { title: 'خانه', slug: '/' },
                { title: 'گارانتی', slug: '/warranty' },
                { title: 'ارتباط با ما', slug: '/contact' }
            ],

            social_networks: [
                {
                    type: 'instagram',
                    link: 'https://www.instagram.com/masoud131155?igsh=amN6a3d1cGU0MzA2'
                },
                {
                    type: 'telegram',
                    link: ''
                },
                {
                    type: 'whatsapp',
                    link: ''
                },
            ],
            mobileList: [],
            mobileMenu: false,
            nav: false,
            primaryAnim: null,
            secondaryAnim: null,
            currentItem: {},
            closingTimeout: null,
            openingTimeout: null
        }
    },

    mounted() {
        this.$refs?.mobileList?.forEach((item) => {
            this?.mobileList.push(item?.$el)
        })
    },

    beforeDestroy() {
        this.secondaryAnim && this.secondaryAnim.reverse()
    },

    methods: {
        showMobileMenu() {
            this.mobileMenu = true
            setTimeout(() => {
                this.$gsap.to(this.$refs.mobileItem, {
                    transform: 'translateY(0px)',
                    duration: .4
                })
                this.$gsap.to(this.mobileList, {
                    transform: 'translateX(0px)',
                    duration: .4
                })
            }, 1);
        },
        hideMobileMenu() {
            this.mobileMenu = false
            setTimeout(() => {
                this.$gsap.to(this.$refs.mobileItem, {
                    transform: 'translateY(40px)'
                })
                this.$gsap.to(this.mobileList, {
                    transform: 'translateX(64px)'
                })
            }, 1);
        },
        manageAuth() {
            if (this.$cookies.get('token')) {
                this.$router.push('/profile')
            } else {
                this.$store.commit('setAuthDialog', true)
            }
        },
        createPrimaryAnim() {
            this.primaryAnim?.kill()
            this.primaryAnim = null
            this.primaryAnim = this.$gsap.timeline({ paused: true })
            this.primaryAnim.fromTo('#wrapper-anim-item',
                {
                    autoAlpha: 0.001,
                    duration: 0
                },
                {
                    autoAlpha: 1,
                    duration: 0
                })
            if (this.$s.mdAndUp) {
                this.primaryAnim.fromTo('#top-anim-item',
                    {
                        y: -85,
                        autoAlpha: 0.001,
                        stagger: 0.1,
                        duration: 0.2
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.1,
                        duration: 0.2
                    }, '<25%')
            }
            this.primaryAnim.fromTo('#primary-anim-item',
                {
                    y: this.$s.rtl ? 85 : -85,
                    autoAlpha: 0.001,
                    stagger: 0.03,
                    duration: 0.3
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.03,
                    duration: 0.3
                }, '<25%')
                .fromTo('#bottom-anim-item',
                    {
                        y: 85,
                        autoAlpha: 0.001,
                        stagger: 0.1,
                        duration: 0.1
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.1,
                        duration: 0.1
                    }, '<25%')
        },
        toggleNav() {
            if (this.nav) {
                clearTimeout(this.closingTimeout)
                this.primaryAnim.reverse()
                this.closingTimeout = setTimeout(() => {
                    this.nav = false
                }, 500);
            } else {
                this.currentItem = {}
                clearTimeout(this.openingTimeout)
                this.nav = true
                if (!this.primaryAnim) this.$nextTick(() => this.createPrimaryAnim());
                this.openingTimeout = setTimeout(() => {
                    this.primaryAnim.restart()
                }, 300)
            }
        },
        mouseEnterHandler(item) {
            if (item?._items?.length) {
                if (!this.$s.mdAndUp && this.currentItem.data?.link == item.data?.link && this.secondaryAnim) {
                    this.secondaryAnim.reverse()
                    return;
                }
                if (this.secondaryAnim?.isActive()) {
                    this.secondaryAnim.kill()
                    this.currentItem = {}
                }
                this.currentItem = item
                this.$nextTick(() => {
                    this.secondaryAnim = this.$gsap
                        .timeline({
                            paused: true,
                            onReverseComplete: e => {
                                this.currentItem = {}
                                this.secondaryAnim.kill()
                            }
                        })
                        .fromTo('#secondary-anim-item',
                            {
                                x: this.$s.rtl ? '100%' : '-100%',
                                autoAlpha: 0.001,
                                stagger: 0.05,
                            },
                            {
                                x: 0,
                                autoAlpha: 1,
                                stagger: 0.05,
                            })
                    this.secondaryAnim.restart()
                })
            } else {
                this.secondaryAnim && this.secondaryAnim.reverse()
            }
        }
    },

    watch: {
        '$s.rtl'(val) {
            this.$nextTick(() => {
                this.createPrimaryAnim()
                this.primaryAnim.restart()
            })
        }
    },
}
</script>

<style lang="scss">
.navigation-container {

    .v-navigation-drawer {
        box-shadow: none !important;
        transition-duration: .2s;
        margin: inherit;
    }

    nav {
        z-index: 10;
        overflow: hidden
    }

    .v-navigation-drawer__content {
        overflow-y: hidden
    }
}

.main-navigation-container {

    nav,
    header {
        z-index: 11 !important;
    }
}

.primary-items-wrapper {
    a {
        transition: opacity 0.3s ease-in-out 0s;

        &.logical-deActive {
            opacity: 0.4;
        }
    }

    @media (min-width: 960px) {
        .primary-anim-item:hover {
            a {
                opacity: 1 !important;
            }

            .item-plus {
                opacity: 1 !important;

                &:after {
                    transform: translateX(-50%) rotate(45deg);
                }

                &:before {
                    transform: translateY(-50%) rotate(45deg);
                }
            }
        }

        &:hover {

            a,
            .item-plus {
                opacity: 0.4;
            }
        }
    }

    .item-plus {
        transition: opacity 0.3s ease-in-out 0s;

        &:before,
        &:after {
            position: absolute;
            content: "";
            background: currentColor;
        }

        &:before {
            top: 50%;
            left: 0px;
            width: 100%;
            height: 4px;
            transform: translateY(-50%);
            transition: transform 0.3s ease-out 0s;
        }

        &:after {
            left: 50%;
            width: 4px;
            height: 100%;
            transform: translateX(-50%);
            transition: transform 0.3s ease-out 0s;
        }

        &.logical-active:after {
            transform: translateX(-50%) rotate(45deg);
        }

        &.logical-active:before {
            transform: translateY(-50%) rotate(45deg);
        }
    }
}

#secondary-items-wrapper {
    a {
        transition: opacity 0.3s ease-in-out 0s;

        &:hover {
            opacity: 1 !important;
        }
    }

    &:hover {
        a {
            opacity: 0.4;
        }
    }
}
</style>