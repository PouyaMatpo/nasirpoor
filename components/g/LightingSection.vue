<template>
  <div class="flex h-screen relative"
    style="background: linear-gradient(0deg, #D9D9D9, #D9D9D9)"
  >
    <div class="w-1/2 h-full inline-block lighting" style="transform: rotateX(180deg) ;" />
    <div class="w-1/2 h-full inline-block rotate-180 lighting" />
    <div class="rubik w-full h-full absolute font-black text-[300px] text-center"
    >
      <span style="background: linear-gradient(180deg, #1C055B 2.61%, #3811A7 100%);
        text-shadow: -5.023872375488281px -5.023872375488281px 10.047744750976562px #010004;
        text-shadow: 5.023872375488281px 5.023872375488281px 10.047744750976562px #511CE8;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;"
      >
        ALAE
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lightingSection',

  created() {
    this.lightingAnimation()
  },

  methods: {
    lightingAnimation() {
      this.$gsap.to
    }
  }
}
// --mainLight: hsba(256, 100%, 39%, 1);
</script>

<style lang="scss">
:root {
  --mainLight: #400CD5;
}

.lighting {
  background: conic-gradient(from 269.95deg at 50.1% 50%, #1A0063 -0.01deg, #000000 180.22deg, var(--mainLight) 180.22deg, #1A0063 359.99deg, #000000 540.22deg);
}

</style>