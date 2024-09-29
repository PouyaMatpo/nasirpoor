<template>
    <div @mouseenter="toggleMenu" @mouseleave="toggleMenu" class="h-full">
        <nuxt-link :to="localePath(data.slug || '#')"
            :class="[isVisible ? data.color || $store.state.pageColor : '', $s.dark ? 'darken-4' : ' lighten-4']"
            class="h-full w-full ltr:pl-3 ltr:pr-2 rtl:pr-3 rtl:pl-2 py-2 rounded-full flex s-center text-sm cursor-pointer">
            <g-text>
                {{ $l(data.title) }}
            </g-text>
            <svg-icon name="chevron-down" class="w-4 h-4 ltr:ml-1 rtl:mr-1" />
        </nuxt-link>
        <div class="absolute pt-8 top-7 flex justify-center"
            :style="multiMenu ? 'left:' + menuDistance + 'px' : ($s.rtl ? 'right: 0px' : 'left: 0px')" :class="''">
            <div v-show="isVisible" class="flex gap-4  p-4 !rounded-2xl relative" :style="multiMenu ? 'max-width: 1300px; min-width: 1300px' : 'width: 40vw'" ref="multiMenuSection"
                :class="$s.dark ? 'dark-glass' : 'ligh-glass'">
                <div :class="multiMenu ? 'w-1/4' : 'w-1/2'">
                    <nuxt-link :to="localePath(item?.link || '#')" v-for="(item, i) in data?.items" :key="`item${i}`"
                        v-show="item?.title">
                        <v-hover v-slot="{ hover }">
                            <div :ref="`listItem${_uid}`"
                                @mouseenter="manageUnderMenu(i, data?.color, item?.title, item?.description, item?.avatar, item?.link)">
                                <div :ref="`listItem${i}${_uid}`" class="p-4 !rounded-xl transition-all"
                                    :class="[(hover ? ($s.dark ? $store.state.pageColor + ` darken-5` : $store.state.pageColor + ` lighten-5`) : ''), underMenuIndex == i ? ($s.dark ? $store.state.pageColor + ` darken-4` : $store.state.pageColor + ` lighten-4`) : '']">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <g-text class="text-lg font-black">{{ $l(item?.title) }}</g-text>
                                            <g-text class="font-normal mt-1 text-xs">{{ $l(item?.description) }}</g-text>
                                        </div>
                                        <svg-icon :name="$s.rtl ? 'chevron-left' : 'chevron-right'" :ref="`icon${i}${_uid}`"
                                            :class="hover || underMenuIndex == i ? ($s.rtl ? 'right-0 opacity-100' : 'left-0 opacity-100') : ($s.rtl ? '-right-4 opacity-0' : '-left-4 opacity-0')"
                                            class="w-7 h-7 transition-all relative duration-300  "></svg-icon>
                                    </div>
                                </div>
                            </div>
                        </v-hover>
                    </nuxt-link>
                </div>
                <div v-if="multiMenu" class="w-3/4">
                    <v-row v-for="(items, i) in data?.items" :key="`underMenu${i}`" v-show="underMenuIndex == i"
                        class="!mt-3">
                        <s-col v-for="(item, j) in items?._items" :key="`item${j}`" cols="6" md="6" class="!py-0">
                            <nuxt-link :to="localePath(item?.link || '#')">
                                <div :ref="`underMenues${i}${_uid}`">
                                    <v-hover v-slot="{ hover }">
                                        <div class="px-4 py-2 !rounded-xl transition-all"
                                            :class="hover ? ($s.dark ? $store.state.pageColor + ` darken-5` : $store.state.pageColor + ` lighten-5`) : ''">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <g-text class="text-sm">{{ $l(item?.title) }}</g-text>
                                                    <g-text class="font-normal text-sm">{{ $l(item?.description) }}</g-text>
                                                </div>
                                                <!-- <svg-icon :name="$s.rtl ? 'chevron-left' : 'chevron-right'"
                                                    class="w-7 h-7 transition-all relative duration-300"
                                                    :class="$s.rtl ? (hover ? 'right-0 opacity-100' : '-right-4 opacity-0') : (hover ? 'left-0 opacity-100' : '-left-4 opacity-0')"></svg-icon> -->
                                            </div>
                                        </div>
                                    </v-hover>
                                </div>
                            </nuxt-link>
                        </s-col>
                    </v-row>
                </div>
                <div v-else class="w-1/2 flex">
                    <v-hover v-slot="{ hover }">
                        <nuxt-link :to="localePath(card?.link || '#')"
                            class="p-2 w-full !rounded-xl transition-all flex flex-col justify-between"
                            :class="[data?.color, $s.dark ? (hover ? 'darken-6' : 'darken-5') : (hover ? 'lighten-6' : 'lighten-5')]">
                            <div class="p-2">
                                <g-text class="text">{{ $l(card?.title) }}</g-text>
                                <g-text class="font-normal text-sm mb-4">{{ $l(card?.description) }}</g-text>
                            </div>
                            <div class="!rounded-lg overflow-hidden">
                                <s-image eager :skeletonColor="$s.dark ? $store.state.pageColor + ' darken-2' : $store.state.pageColor + ' lighten-4'"
                                    :src="card?.image ? `${$config.STORAGE_URL}/${card?.image}` : '/placeholder/placeholder.svg'"
                                    class="transition-all duration-500" :class="hover ? 'scale-110' : 'scale-100'" />
                            </div>
                        </nuxt-link>
                    </v-hover>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GNavMenu',

    props: {
        data: {
            type: Object,
            default: {}
        },
    },

    data() {
        return {
            menuDistance: null,
            isVisible: false,
            menuAnim: null,
            underMenuIndex: null,
            underMenuAnim: null,
            multiMenu: false,
            card: {
                title: null,
                description: null,
                image: null,
                link: null,
            }
        }
    },

    mounted() {
        // console.log(this.data)
        for (let item of this.data?.items) {
            // console.log(item)
            if (item?._items) {
                this.multiMenu = true
                this.$refs.multiMenuSection.style.innerWidth = '90vw'
            }
        }
        this.card.title = this.data?.title
        this.card.description = this.data?.description
        this.card.image = this.data?.image
    },

    methods: {
        toggleMenu(e) {

            if (this.isVisible) {
                this.isVisible = false
                this.underMenuIndex = null
                this.card.title = this.data?.title
                this.card.description = this.data?.description
                this.card.image = this.data?.image
                this.menuAnim.kill()
                this.menuAnim = this.$gsap.timeline()
                this.menuAnim.to(this.$refs[`listItem${this._uid}`], {
                    opacity: 0,
                    y: '20px',
                    duration: 0,
                    stagger: 0,
                })
            } else {
                // console.log( );
                this.menuDistance = -(e.target.getBoundingClientRect().left - (window.innerWidth - 1300) / 2)
                // console.log(this.menuDistance);
                this.isVisible = true
                this.menuAnim = this.$gsap.timeline()
                this.menuAnim.fromTo(this.$refs[`listItem${this._uid}`],
                    {
                        opacity: 0,
                        y: '20px',
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: .2,
                        stagger: .03
                    })
            }

        },
        manageUnderMenu(i, color, title, description, image, link) {
            if (this.underMenuIndex != i) {
                for (let index in this.data?.items) {
                    this.$refs[`listItem${index}${this._uid}`][0].classList.remove(color)
                }
                this.underMenuIndex = i
                this.$refs[`listItem${i}${this._uid}`][0].classList.add(color)
                this.card.title = title
                this.card.description = description
                this.card.image = image
                this.card.link = link

                this.underMenuAnim = this.$gsap.timeline()
                if (this.$refs[`underMenues${i}${this._uid}`]) {
                    this.underMenuAnim.fromTo(this.$refs[`underMenues${i}${this._uid}`],
                        {
                            opacity: 0,
                            y: '20px',
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: .2,
                            stagger: .03
                        })
                }
            }
        }
    }

}
</script>
<style lang="scss">
.ligh-glass {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
}

.dark-glass {
    background: rgba(1, 49, 41, 0.4);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
}
</style>