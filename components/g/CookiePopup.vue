<template>
    <div>
        <s-falcon :sw-options="{ childClass: $store.state.pageColor + ' lighten-3 p-10 absolute bottom-0 right-0 !h-fit' }" :viva="dialog"
            xs="dialog" no-click-animation persistent>
            <g-text tag="h3">access cookies</g-text>
            <div class="flex gap-2 mt-5 ">
                <s-btn color="green" @click="access">access</s-btn>
                <s-btn color="red" @click="dontShow">dont show anymore</s-btn>
                <s-btn color="yellow" @click="closeDialog">close</s-btn>
            </div>
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: 'GCookiePopup',

    data() {
        return {
            dialog: false,
        }
    },

    mounted() {
        this.checkCookies
    },

    computed: {
        checkCookies() {
            if (this.$cookies.get('access_cookies')) {
                this.dialog = false
            } else {
                this.dialog = true
            }
        }
    },

    methods: {
        closeDialog() {
            this.dialog = false
        },
        dontShow() {
            this.$cookies.set('access_cookies', false)
            this.dialog = false
        },
        access() {
            this.$cookies.set('access_cookies', true)
            this.dialog = false
        }
    }
}
</script>