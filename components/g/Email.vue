<template>
    <div>
        <div class="!w-fit">
            <a aria-label="icon" :href="'mailto:' + data">
                <g-text :data="data" class="cursor-pointer" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GEmail',

    props: {
        data: String
    }
}
</script>