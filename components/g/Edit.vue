<template>
    <div class="relative">
        <div class="absolute -top-2 rtl:-left-1 ltr:-right-1">
            <s-btn v-if="showText" icon rounded="pill" class="indigo lighten-5 p-2 !w-8 !h-8" target="_blank"
                aria-label="address" :href="address">
                <svg-icon class="!w-6 !h-6 indigo--text" name="pencil" />
            </s-btn>
        </div>
        <slot name="default" />
    </div>
</template>

<script>
export default {
    name: 'GEdit',

    props: {
        address: {
            type: String,
            default: 'https://www.google.com/'
        }
    },

    data() {
        return {
            showText: false,
        };
    },

    mounted() {
        document.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.shiftKey && event.keyCode === 69) {
                this.toggleText();
            }
        })
    },

    methods: {
        toggleText() {
            this.showText = !this.showText;
        }
    }
};
</script>