<template>
    <div>
        <div class="!w-fit">
            <a aria-label="icon" :href="'tel:' + data">
                <g-text :data="data" class="cursor-pointer" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GTel',

    props: {
        data: {
            type: String
        }
    }
}
</script>
