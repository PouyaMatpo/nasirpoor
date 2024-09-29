<template>
    <div>
        <div class="flex gap-2 items-center">
            <s-avatar v-bind="$attrs" :lottie="`${lottie}.lottie`" @click="toggleSkyMenu"
                :color="$s.dark ? $store.state.pageColor + ' darken-3' : $store.state.pageColor + ' lighten-3'" loop width="42px" rounded="pill" ref="avatar"
                autoPlay class="cursor-pointer" />
            <s-btn :id="`sky_${_uid}`" @click="toggleSkyMenu" rounded="pill" class="p-2" outlined>
                <g-text :data="$t('emojie')" />
            </s-btn>
        </div>
        <s-falcon
            :sw-options="{ childClass: $s.dark ? $store.state.pageColor + ' darken-3 p-6 rounded-3xl' : $store.state.pageColor + ' lighten-3 p-6 rounded-3xl' }"
            :viva.sync="sky" :activator="`#sky_${_uid}`" xs="sky-menu" z-index="11"
            :nudge-left="$s.mdAndUp ? $s.rtl ? 198 : null : null" :nudge-right="$s.mdAndUp ? $s.rtl ? null : 160 : null"
            nudge-bottom="10" bottom>
            <div class="md:w-80">
                <div class="flex flex-wrap gap-4">
                    <div v-for="(item, i) in lotties" :key="`lottie${i}`">
                        <s-image :src="item" @click="selectLottie(i)" class="cursor-pointer w-10 h-10" />
                    </div>
                </div>
            </div>
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: 'GLottiesPopup',

    data() {
        return {
            lottie: '/emojis/like.png',
            sky: false,
            lotties: [
                '/emojis/flower.png',
                '/emojis/heart.png',
                '/emojis/eye-heart.png',
                '/emojis/thanks.png',
                '/emojis/like.png',
                '/emojis/laugh.png',
                '/emojis/fun.png',
                '/emojis/glass.png',
                '/emojis/shame.png',
                '/emojis/poker.png',
                '/emojis/heh.png',
                '/emojis/angry.png',
                '/emojis/noo.png',
                '/emojis/cry.png'
            ]
        }
    },

    methods: {
        toggleSkyMenu() {
            this.sky = !this.sky;
        },

        selectLottie(index) {
            this.lottie = this.lotties[index];
            setTimeout(() => {
                this.$refs.avatar.$el.querySelector('dotlottie-player').play();
            }, 100);
            this.toggleSkyMenu();
            this.emitLottie();
        },

        emitLottie() {
            this.toggleSkyMenu();
            this.$emit('lottieSelected', this.lottie + '.lottie');
        }
    }
}
</script>
<style lang="scss">
.v-menu__content {
    border-radius: 24px;
}
</style>