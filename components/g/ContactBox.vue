<template>
    <div :style="$s.dark ? 'background-color: #0d1019;' : 'background-color: #FFF9C4;'"
        class="rounded-3xl p-2 w-full flex items-center gap-2 hover-animation">
        <div :class="$s.dark ? 'cyan darken-5' : $store.state.pageColor + ' lighten-4'"
            class="rounded-2xl p-4 flex s-center swing-animation">
            <svg-icon :class="$s.dark ? 'swing-icon' : $store.state.pageColor + '--text text--darken-2 swing-icon'"
                class="w-5 h-5" :name="icon" />
        </div>
        <div>
            <g-text class="text-sm" :data="title" />
            <slot name="descSection" />
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactBox",

    props: {
        icon: {
            type: String,
            default: 'minus'
        },

        title: {
            type: String,
            default: '-'
        }
    }
}
</script>

<style scoped>
@keyframes swing {
    0% {
        transform: rotate(0deg);
    }

    20% {
        transform: rotate(15deg);
    }

    40% {
        transform: rotate(-10deg);
    }

    60% {
        transform: rotate(5deg);
    }

    80% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

.hover-animation:hover .swing-icon {
    animation: swing 0.6s ease-in-out infinite;
}

@media (max-width: 768px) {
    .swing-animation .swing-icon {
        animation: swing 0.6s ease-in-out infinite;
    }
}

@media (min-width: 769px) {
    .swing-animation .swing-icon {
        animation: none;
    }
}
</style>
