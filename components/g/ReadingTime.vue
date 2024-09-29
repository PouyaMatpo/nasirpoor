<template>
    <div>
        <v-progress-circular v-if="!bar" :size="circleSize" :value="time.bar" :rotate="-90"
            :color="$s.dark ? `${color} lighten-5` : `${color} darken-5`" class="p-2">
            <g-text v-if="withNumber" :data="Math.round(time.number)" :color="`${color}--text text--darken-5`"
                :darkColor="`${color}--text text--lighten-6`" class="font-bold" />
            <!-- <g-text v-if="withText" :data="$t('min')" :color="`${color}--text text--darken-5`"
                :darkColor="`${color}--text text--lighten-6`" class="px-0.5 text-xs font-thin" /> -->
        </v-progress-circular>
        <v-progress-linear v-if="bar" :value="time.bar" :color="color" class="!fixed left-0 top-0 !w-full !z-10" />
    </div>
</template>

<script>
export default {
    name: 'GReadingBar',

    data() {
        return {
            time: {
                bar: 0,
                number: 0
            },
        }
    },

    props: {
        className: String,

        bar: Boolean,

        withText: Boolean,

        withNumber: Boolean,

        words: Number,

        circleSize: {
            type: String,
            default: '35'
        },

        color: {
            type: String,
            default: 'primary'
        },
    },

    mounted() {
        setTimeout(() => {
            this.progressBar()
            this.time.number = this.words > 150 ? this.words / 150 : 1
        }, 100);
    },

    methods: {
        progressBar() {
            let target = document.getElementsByClassName(this.className)[0]
            let tl = this.$gsap.timeline({
                scrollTrigger: {
                    trigger: target,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                    // markers: true,
                },
            })
            tl.to(this.time, { bar: 100, number: 1 })
        }
    }
}
</script>