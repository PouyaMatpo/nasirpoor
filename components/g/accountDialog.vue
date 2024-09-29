<template>
  <div>
    <v-hover v-slot="{ hover }">
      <div @click="dialog = true" class="flex justify-between items-center cursor-pointer p-4 rounded-lg" :class="data?.color">
        <g-text :color="data?.textColor">{{ data?.title }}</g-text>
        <svg-icon :name="$s.rtl ? 'chevron-left' : 'chevron-right'"
          :class="[hover ? ($s.rtl ? 'right-0 opacity-100' : 'left-0 opacity-100') : ($s.rtl ? '-right-4 opacity-0' : '-left-4 opacity-0'), data?.textColor]"
          class="w-7 h-7 transition-all relative duration-300  "></svg-icon>
      </div>
    </v-hover>
    <s-falcon :overlay="{ parentClass: $s.dark ? $store.state.pageColor + ' darken-5 opacity-70' : $store.state.pageColor + ' lighten-4 opacity-70' }"
      :sw-options="{ childClass: $s.dark ? $store.state.pageColor + ' darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' : $store.state.pageColor + ' lighten-6 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' }"
      :viva.sync="dialog" xs="dialog" :overlayZIndex="5">
      <slot />
    </s-falcon>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      dialog: false
    }
  }
}
</script>