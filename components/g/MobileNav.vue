<template>
    <div v-if="$s.mdAndDown" class="navMoibile">
        <s-falcon fixed flat :viva="!$s.mdAndUp" xs="bar" height="80"
            :swOptions="{ parentClass: `w-full ${$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-6'}` }">
            <g-container>
                <div class="flex items-center justify-between py-4 h-full">
                    <nuxt-link :to="localePath('/')">
                        <g-logo
                            :icon="$s.dark ? $l($configs?.global?.icon).dark?.avatar : $l($configs?.global?.icon).light?.avatar"
                            :image="$s.dark ? $l($configs?.global?.text).dark?.avatar : $l($configs?.global?.text).light?.avatar"
                            iconWidth="37px" :imageWidth="$s.mdAndUp ? '75px' : '50px'" />
                    </nuxt-link>
                    <div class="flex gap-6 items-center h-full">
                        <g-search/>
                        <g-call />
                        <!-- <g-floating-btn :data="{ title: $t('contact'), slug: '/contact' }" /> -->
                        <div v-show="$s.smAndDown" @click="showMobileMenu" class="flex flex-col gap-2">
                            <div class="h-0.5 w-7" :class="$s.dark ? $store.state.pageColor + ' lighten-6' : $store.state.pageColor + ' darken-6'"></div>
                            <div class="h-0.5 w-7" :class="$s.dark ? $store.state.pageColor + ' lighten-6' : $store.state.pageColor + ' darken-6'"></div>
                        </div>
                    </div>
                </div>
            </g-container>
            <div v-show="mobileMenu && type == 'default'" :class="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-3'" ref="mobileMenu"
                class="p-4 pb-16 flex flex-col gap-4 fixed left-0 top-0 h-screen w-full overflow-scroll opacity-0">
                <div class="h-full flex flex-col justify-between" style="height: calc(100vh - 50px)">
                    <div class="flex justify-between items-center">
                        <nuxt-link :to="localePath('/')">
                            <g-logo
                            :icon="$s.dark ? $l($configs?.global?.icon).dark?.avatar : $l($configs?.global?.icon).light?.avatar"
                            :image="$s.dark ? $l($configs?.global?.text).dark?.avatar : $l($configs?.global?.text).light?.avatar"
                            iconWidth="50px" :imageWidth="$s.mdAndUp ? '100px' : '80px'" />
                        </nuxt-link>
                        <div class="px-2">
                            <s-btn @click="hideMobileMenu" class="!px-0" :color="$s.dark ? 'black' : 'white'">
                                <svg-icon name="close" class="w-7 h-7" :class="$s.dark ? 'white--text' : 'black--text'" />
                            </s-btn>
                        </div>
                    </div>
                    <div>
                        <div v-for="(link, i) in ($s.rtl ? $configs?.global?.nav['mobile-fa-nav'] : $configs?.global?.nav['mobile-en-nav'])"
                            :key="`link${i}`" class="mb-4" @click="goTo(link?.link)">
                            <g-text class="!py-1 text-3xl font-black px-16" ref="mobileList">
                                {{ $l(link.title) }}
                            </g-text>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center gap-8">
                            <div class="flex items-center gap-1">
                                <!-- <g-lang-changer multiLangBtn :btnText="$s.dark ? 'white--text' : 'black--text'" /> -->
                                <!-- <g-lang-changer :btnText="$s.dark ? 'white--text' : 'black--text'" multiLangBtn /> -->
                                <g-dark-mode btn size="20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </s-falcon>
        <s-falcon :viva="mobileMenu && type == 'drawer'" app xs="drawer" :right="$s.rtl ? false : true"
            :swOptions="{ parentClass: `w-full ${$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-6'}` }"
            width="100%" no-border
            class="border-none" id="drawerSection">
            <div class="flex flex-col justify-between w-full h-full max-h-[100vh] overflow-auto">
                <div class="flex justify-between items-center">
                    <nuxt-link :to="localePath('/')">
                        <g-logo
                            :icon="$s.dark ? $l($configs?.global?.icon).dark?.avatar : $l($configs?.global?.icon).light?.avatar"
                            :image="$s.dark ? $l($configs?.global?.text).dark?.avatar : $l($configs?.global?.text).light?.avatar"
                            iconWidth="50px" :imageWidth="$s.mdAndUp ? '100px' : '80px'" />
                    </nuxt-link>
                    <div class="px-2">
                        <s-btn @click="mobileMenu = false" class="!px-0" :color="$s.dark ? 'black' : 'white'">
                            <svg-icon name="close" class="w-7 h-7" :class="$s.dark ? 'white--text' : 'black--text'" />
                        </s-btn>
                    </div>
                </div>
                <v-list rounded>
                    <template v-for="(link, i) in ($s.rtl ? $configs?.global?.nav['mobile-fa-nav'] : $configs?.global?.nav['mobile-en-nav'])">
                        <v-list-group :key="`listGroup${i}`" v-if="link._items" :to="link?.link" class="!py-2">
                            <template v-slot:activator >
                                <s-list-item :ripple="false" class="!px-0 !mb-0" @click="groupIndex == i ? (groupIndex = -1, multiMenuIndex = []) : ( groupIndex = i, multiMenuIndex = [])">
                                    <template v-slot:title>
                                        <g-text class="w-full text-xl font-bold">
                                            {{$l(link.title)}}
                                        </g-text>
                                    </template>
                                    <template v-slot:actionText>
                                        <svg-icon name="chevron-down" class="w-8 h-8 transition-all" :class="groupIndex == i ? 'rotate-180' : ''"/>
                                    </template>
                                </s-list-item>
                            </template>
                            <template v-for="(items, index) in link._items">
                                <v-list-group v-if="items._items" :key="`multiMenu${index}`" sub-group class="!py-2">
                                    <template v-slot:activator >
                                        <s-list-item color="transparent" :ripple="false" class="!px-0 !mb-0" @click="manageUnderMenu(index, i)">
                                            <template v-slot:title>
                                                <g-text class="w-full !px-4">
                                                    {{$l(items.title)}}
                                                </g-text>
                                            </template>
                                            <template v-slot:action>
                                                <svg-icon name="chevron-down" class="w-8 h-8 transition-all" :class="multiMenuIndex.filter(el => el == `${i}${index}`).length ? 'rotate-180' : ''"/>
                                            </template>
                                        </s-list-item>
                                    </template>
                                    <s-list-item v-for="(underMenu, j) in items._items" :to="underMenu.link" :key="`underMenu${j}`">
                                        <template v-slot:title>
                                            <g-text class="!py-3 !px-10">
                                                {{$l(underMenu.title)}}
                                            </g-text>
                                        </template>
                                    </s-list-item>
                                </v-list-group>
                                <s-list-item
                                    :key="`singleMenu${index}`"
                                    v-else
                                    :to="items?.link"
                                >
                                    <template v-slot:title>
                                        <g-text class="!py-3 !px-8">
                                            {{$l(items.title)}}
                                        </g-text>
                                    </template>
                                </s-list-item>
                            </template>
                        </v-list-group>
                        <s-list-item v-else :key="`listItem${i}`" :to="link?.link" class="!py-3">
                            <template v-slot:title>
                                <g-text class="!py-1 text-xl font-bold">
                                    {{ $l(link.title) }}
                                </g-text>
                            </template>
                        </s-list-item>
                    </template>
                </v-list>
                <div class="p-4">
                    <div class="flex items-center gap-8">
                        <div class="flex items-center gap-1">
                            <g-lang-changer :btnText="$s.dark ? 'white--text' : 'black--text'" multiLangBtn />
                            <g-dark-mode btn size="20" />
                        </div>
                    </div>
                </div>
            </div>
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: 'GNav',

    props: {
        type: {
            type: String,
            default: 'default',
        }
    },

    data() {
        return {
            mobileList: [],
            mobileMenu: false,
            groupIndex: -1,
            multiMenuIndex: [],
        }
    },

    mounted() {
        this.$refs?.mobileList?.forEach((item) => {
            this?.mobileList.push(item?.$el)
        })
    },

    methods: {
        showMobileMenu() {
            this.mobileMenu = true
            setTimeout(() => {
                this.$gsap.fromTo(this.$refs.mobileMenu, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: .1,
                })
                this.menuAnimation = this.$gsap.fromTo(this.mobileList, {
                    transform: 'translateY(20px)',
                    opacity: 0,
                }, {
                    transform: 'translateY(0px)',
                    opacity: 1,
                    duration: .5,
                    stagger: .1,
                })
            }, 1);
        },
        hideMobileMenu() {
            this.menuAnimation.kill()
            setTimeout(() => {
                this.$gsap.fromTo(this.$refs.mobileMenu, {
                    opacity: 1,
                }, {
                    opacity: 0,
                    duration: .5,
                })
                this.$gsap.to(this.mobileList, {
                    transform: 'translateY(20px)',
                    opacity: 0,
                    duration: 0,
                })
            }, 1);
            setTimeout(() => {
                this.mobileMenu = false
            }, 500);
        },
        goTo(link) {
            this.hideMobileMenu()
            this.$router.push(link ? link : '#')
        },
        manageUnderMenu(index, i) {
            if(this.multiMenuIndex.includes(`${i}${index}`)) {
                this.multiMenuIndex = this.multiMenuIndex.filter( el => el !== `${i}${index}`)
            } else {
                this.multiMenuIndex.push(`${i}${index}`)
            }
            console.log(this.multiMenuIndex)
        }
    },

    watch: {
        '$s.rtl'() {
            this.mobileMenu = false
        },
        '$route'(){
            this.mobileMenu = false
        }
    }
}
</script>

<style lang="scss">
.navMoibile{
    .v-list-item__icon {
        margin: 0px !important;
        width: 0px !important;
        min-width: 0px !important;
    }
    .v-list-item--link {
        &::before {
            background-color: transparent !important;
        }
    }
}
</style>