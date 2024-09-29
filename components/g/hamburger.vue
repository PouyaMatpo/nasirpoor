<template>
    <div class="py-3 cursor-pointer" v-on="$listeners" @click="hamburgerManager">
        <div class="h-flex items-center w-10 h-5 relative">
            <div ref="topLeft" class="h-1.5 w-6 absolute top-0 left-0 rounded-xl"
                :class="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-6'" />
            <div ref="topRight" class="h-1.5 w-6 absolute top-0 right-0 rounded-xl"
                :class="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-6'" />
            <div ref="bottomLeft" class="h-1.5 w-6 absolute bottom-0 left-0 rounded-xl"
                :class="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-6'" />
            <div ref="bottomRight" class="h-1.5 w-6 absolute bottom-0 right-0 rounded-xl"
                :class="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-6'" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'GHamburger',

    props: {
        open: Boolean,

        menu: Boolean,

        openMenu: {
            type: Boolean,
            defualt: undefined
        }

    },

    data() {
        return {
            isOpen: false,
        }
    },

    watch: {
        openMenu(e) {
            this.isOpen = e
            this.hamburgerManager()
        }
    },

    mounted() {
        if (this.open) {
            this.hamburgerManager()
        }
    },

    methods: {
        hamburgerManager() {
            if (this.$s.mdAndUp) {
                this.$gsap.to(this.$refs.topLeft, {
                    rotate: !this.$s.rtl ? this.isOpen ? 0 : -45 : this.isOpen ? 0 : 45,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.topRight, {
                    rotate: !this.$s.rtl ? this.isOpen ? 0 : -45 : this.isOpen ? 0 : 45,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.bottomLeft, {
                    rotate: !this.$s.rtl ? this.isOpen ? 0 : 45 : this.isOpen ? 0 : -45,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.bottomRight, {
                    rotate: !this.$s.rtl ? this.isOpen ? 0 : 45 : this.isOpen ? 0 : -45,
                    duration: .3,
                    ease: 'power1'
                })
            } else {
                this.$gsap.to(this.$refs.topLeft, {
                    rotate: this.isOpen ? 0 : -30,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.topRight, {
                    rotate: this.isOpen ? 0 : 30,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.bottomLeft, {
                    rotate: this.isOpen ? 0 : -30,
                    duration: .3,
                    ease: 'power1'
                })
                this.$gsap.to(this.$refs.bottomRight, {
                    rotate: this.isOpen ? 0 : 30,
                    duration: .3,
                    ease: 'power1'
                })
            }
        },
    }
}
</script>