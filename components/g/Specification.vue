<template>
    <div>
        <div class="md:flex justify-between items-center mb-4">
            <g-text tag="h2" class="text-2xl" :data="$t('specification')" />
            <!-- <s-text-field v-model="specData" half label="text" /> -->
        </div>
        <div :class="$s.dark ? $store.state.pageColor + ' darken-6' : $store.state.pageColor + ' lighten-5'" class="p-8 relative rounded-3xl">
            <div v-if="$s.mdAndUp" :class="[$s.rtl ? 'left-0' : 'right-0', $s.dark ? $store.state.pageColor + ' darken-5' : 'white']"
                class="absolute top-0 h-full w-2/3 rounded-3xl" />
            <div class="md:flex w-full" v-for="(item, index) in Specification" :key="`title${index}`">
                <div class="md:w-1/3" v-if="$l(item.value)">
                    <g-text class="pt-2 md:py-3 text-sm" :color="$store.state.pageColor + '--text text--lighten-1'" :darkColor="$store.state.pageColor + '--text text--lighten-3'" :data="$l(item.name)" />
                    <div v-if="$s.mdAndUp">
                        <s-divider length="80%" :opacity="1" :color="$s.dark ? $store.state.pageColor : $store.state.pageColor + ` lighten-6`"
                            thickness="1px" v-if="index < Specification.length - 1" />
                    </div>
                </div>
                <div v-if="$l(item.value)" class="md:w-2/3 z-1 px-2">
                    <g-text class="pb-2 pt-1 md:py-3 text-sm font-bold md:font-normal" :data="$l(item.value)" />
                    <s-divider :opacity="1"
                        :color="$s.mdAndUp ? $s.dark ? $store.state.pageColor : $store.state.pageColor + ` lighten-5` : $s.dark ? $store.state.pageColor : ` lighten-4`"
                        thickness="1px" v-if="index < Specification.length - 1" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GSpecification',

    props: {
        data: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
            specData: null
        }
    },

    computed: {
        Specification() {
            let arr = [];
            if (this.specData) {
                this.data.forEach((e) => {
                    if (typeof e.name === 'object') {
                        const nameValues = Object.values(e.name);
                        if (nameValues.some(value => typeof value === 'string' && value.toLowerCase().includes(this.specData.toLowerCase())) && !arr.includes(e)) {
                            arr.push(e);
                        }
                    }

                    if (typeof e.value === 'object') {
                        const valueValues = Object.values(e.value);
                        if (valueValues.some(value => typeof value === 'string' && value.toLowerCase().includes(this.specData.toLowerCase())) && !arr.includes(e)) {
                            arr.push(e);
                        }
                    }
                });
                return arr;
            } else {
                return this.data;
            }
        }
    }
}

</script>