<template>
    <div>
        <div v-show="$s.mdAndUp" class="relative w-full flex flex-col gap-10">
            <div class="flex w-full gap-10 sticky top-[100px] h-[calc(100vh-120px)]" v-for="(item, index) in data"
                :key="`aboutSection${index}`">
                <div class="rounded-3xl overflow-hidden h-full w-1/2" :class="[
                    color[index]?.color,
                    `${color[index]?.color}--text`,
                    $s.dark
                        ? 'darken-5 text--lighten-4'
                        : 'lighten-5 text--darken-3',
                ]">
                    <div>
                        <div class="flex flex-col items-center py-20 gap-14 px-20 s-center" :style="`height: calc(100vh - ${80 / data.length
                            }px);`" :id="`section${index}`">
                            <g-text class="text-5xl rubik !leading-normal">{{
                                $l(item?.title)
                                }}</g-text>
                            <g-text class="text-xl font-light">{{
                                $l(item?.description)
                                }}</g-text>
                        </div>
                    </div>
                </div>
                <div class="h-full w-1/2 z-2 rounded-3xl overflow-hidden">
                    <s-image :skeletonColor="$s.dark
                            ? $store.state.pageColor + ' darken-2'
                            : $store.state.pageColor + ' lighten-4'
                        " alt="banner" v eager min-height="100%" v-if="item?.avatar" class="w-full h-full"
                        :src="`${$config.STORAGE_URL}/${item?.avatar}`" />
                    <div v-else :class="$store.state.pageColor + ' darken-4'"
                        class="inline-block w-full h-full rounded-b-4xl" />
                </div>
            </div>
        </div>
        <div v-show="!$s.mdAndUp" class="w-full relative">
            <div v-for="(item, index) in data" :key="`item${index}`" class="rounded-4xl mb-2 sticky top-20" :class="[
                color[index]?.color,
                `${color[index]?.text_color}--text`,
                $s.dark
                    ? 'darken-5 text--lighten-4'
                    : 'lighten-5 text--darken-3',
            ]">
                <s-image :skeletonColor="$s.dark
                        ? $store.state.pageColor + ' darken-2'
                        : $store.state.pageColor + ' lighten-4'
                    " alt="bannerr" v eager v-if="item?.avatar" class="w-full h-auto rounded-4xl" :aspect-ratio="1"
                    :src="`${$config.STORAGE_URL}/${item?.avatar}`" />
                <div v-else :class="$store.state.pageColor + ' darken-4'" class="inline-block w-full rounded-4xl"
                    style="aspect-ratio: 1" />
                <div class="flex flex-col gap-5 px-4 pt-8 pb-20">
                    <div class="text-3xl font-normal">
                        {{ $l(item?.title) }}
                    </div>
                    <div class="text-base font-thin">
                        {{ $l(item?.description) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "GColorChange",

    props: {
        data: {
            type: [Array, Object],
            default: () => [],
        },
    },

    data() {
        return {
            sectionColor: { background: "red", text: "red" },
            color: [],
        };
    },

    async mounted() {
        await this.$nextTick();
        await this.setColors();
        this.sectionColor.background = this.color.color;
    },

    methods: {
        goToSection(num) {
            if (this.$route.fullPath.split("#")[1] == `section${num}`) {
                this.$router.push(this.$route.path);
            }
            setTimeout(() => {
                this.$router.push(this.$route.path + `#section${num}`);
            }, 100);
        },
        async setColors() {
            this.data?.forEach((el) => {
                this.color.push({ color: el.color, text_color: el.color });
            });
        },
    },
};
</script>
