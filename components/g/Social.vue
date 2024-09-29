<template>
    <div>
        <div class="flex w-full h-full p-2" :class="vertical && 'flex-col'">
            <s-btn target="_blank" :href="item?.link" class="w-fit" v-for="(item, i) in data" :key="i"
                aria-label="social-button" icon fab small tile>
                <svg-icon :class="[size, color + '--text']" :name="item?.type" />
            </s-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GSocial',

    props: {
        vertical: {
            type: Boolean,
        },

        data: {
            type: Array,
            default: () => []
        },

        size: {
            type: String,
            default: 'w-6 h-6'
        },

        color: {
            type: String,
            default: 'yellow'
        }
    }
}
</script>