<template>
    <div>
        <s-btn tonal aria-label="share" @click="themeManager = !themeManager" :color="color">
            <div class="flex items-center">
                <div class="px-2 font-bold">
                    Open Editor
                </div>
            </div>
        </s-btn>
        <s-falcon app xs="drawer"
            :sw-options="{ parentClass: $s.dark ? $store.state.pageColor + ' darken-4' : 'white w-full', childClass: 'w-full' }"
            :viva.sync="themeManager" width="300px" no-border class="border-none">
            <div
                class="gap-6 gap-7 gap-8 gap-9 gap-11 gap-12 gap-14 gap-16 w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-12/12 ">
            </div>
            <div class="flex flex-wrap gap-1 p-4">
                <div v-for="item in data.colors" @click="storeManager('color', item)" :key="item" :class="item"
                    class="w-10 h-10 rounded-md cursor-pointer gap">
                </div>
            </div>
            <div class="p-4">
                <div class="text-xl font-semibold">
                    Gap:
                </div>
                <s-slider :value="$store.state.options.gap" @input="storeManager('gap', $event)" min="1" max="16" />
            </div>
            <div class="p-4">
                <div class="text-xl font-semibold">
                    Sticky?
                </div>
                <s-switch :input-value="$store.state.options.sticky"
                    @change="storeManager('sticky', $event ? $event : false)" />
            </div>
            <div class="p-4">
                <div class="text-xl font-semibold">
                    Width:
                </div>
                <s-slider :value="$store.state.options.width" @input="storeManager('width', $event)" min="2" max="10" />
            </div>
            <div class="p-4">
                <div class="text-xl font-semibold">
                    Rounded:
                </div>
                <s-select :value="$store.state.options.round" @change="storeManager('round', $event)" rounded="pill"
                    :items="data.rounded" outlined></s-select>
            </div>
            <div class="p-4">
                {{ $store.state.options }}
            </div>
        </s-falcon>
    </div>
</template>

<script>
export default {
    name: 'GThemeManager',

    props: {
        color: {
            type: String,
            default: 'red'
        }
    },

    data() {
        return {
            themeManager: false,
            options: {
                color: 'primary',
            },
            data: {
                colors: [
                    'red',
                    'pink',
                    'purple',
                    'deep-purple',
                    'indigo',
                    'blue',
                    'light-blue',
                    'cyan',
                    'teal',
                    'green',
                    'light-green',
                    'lime',
                    'yellow',
                    'amber',
                    'orange',
                    'deep-orange',
                    'brown',
                    'primary'
                ],
                rounded: [
                    'rounded-none',
                    'rounded-sm',
                    'rounded-md',
                    'rounded-lg',
                    'rounded-xl',
                    'rounded-2xl',
                    'rounded-3xl',
                    'rounded-4xl',
                    'rounded-5xl',
                    'rounded-6xl',
                    'rounded-full',
                ]
            }
        }
    },
    methods: {
        storeManager(type, item) {
            // console.log(type, item);
            this.$store.commit('setOptionsManager', { type: type, item: item })
        }
    }
}
</script>