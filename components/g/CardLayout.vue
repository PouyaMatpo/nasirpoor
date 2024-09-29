<template>
    <div :class="horizontal ? 'flex-row' : 'flex-col'" class="flex h-full overflow-hidden">
        <div :class="horizontal ? imgWidth : null">
            <slot name="pictureSection" />
        </div>
        <div :class="horizontal ? textWidth : null" class="flex flex-col justify-between h-full">
            <div>
                <div>
                    <slot name="title" />
                </div>
                <div>
                    <slot name="subtitle" />
                </div>
                <div>
                    <slot name="statusTags" />
                </div>
                <div>
                    <slot name="abstract" />
                </div>
            </div>
            <div>
                <div>
                    <slot name="readingAuthor" />
                </div>
                <div>
                    <slot name="dateBtn" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GCardLayout',

    props: {
        horizontal: Boolean,

        imgWidth: {
            type: String,
            default: "w-1/3"
        },

        textWidth: {
            type: String,
            default: "w-full"
        }
    }
}
</script>