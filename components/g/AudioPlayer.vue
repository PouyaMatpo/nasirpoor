<template>
    <div class="flex flex-col items-end p-4">
        <div class="flex s-center gap-3 w-full">
            <s-btn icon @click="setSeek(seek - 10)">
                <svg-icon name="skip-previous" class="w-8 h-8" />
            </s-btn>
            <s-btn @click="togglePlayback" icon x-large class="shadow-lg">
                <svg-icon :name="playing ? 'pause' : 'play'" class="w-8 h-8" />
            </s-btn>
            <s-btn icon @click="setSeek(seek + 10)">
                <svg-icon name="skip-next" class="w-8 h-8" />
            </s-btn>
        </div>
        <s-btn icon @click="toggleMute">
            <svg-icon :name="muted ? 'volume-off' : 'volume-high'" class="w-8 h-8" />
        </s-btn>
        <div class="flex items-center w-full">
            <div class="min-w-fit">{{ seekTime ? seekTime : '00 : 00' }}</div>
            <s-slider v-model="sliderValue" @mousedown="mouseDown = true" @mouseup="mouseUp" class="shrink"></s-slider>
            <div class="min-w-fit">{{ changeTime(Math.round(duration)) }}</div>
        </div>
    </div>
</template>
<script>
import VueHowler from 'vue-howler'

export default {
    mixins: [VueHowler],

    data() {
        return {
            seekTime: null,
            sliderValue: 0,
            mouseDown: false
        }
    },

    methods: {
        changeTime(value) {
            const min = value / 60
            const sec = value % 60
            if (value >= 60) {
                if (min < 10) {
                    if (sec < 10) {
                        return `0${min.toString().split('.')[0]} : 0${Math.round(sec)}`
                    } else {
                        return `0${min.toString().split('.')[0]} : ${sec}`
                    }
                } else {
                    if (sec < 10) {
                        return `${min.toString().split('.')[0]} : 0${Math.round(sec)}`
                    } else {
                        return `${min.toString().split('.')[0]} : ${sec}`
                    }
                }
            } else {
                if (sec < 10) {
                    return `00 : 0${Math.round(sec)}`
                } else {
                    return `00 : ${sec}`
                }
            }
        },
        mouseUp() {
            const seek = ((this.duration / 100) * this.sliderValue)
            this.setSeek(seek)
            setTimeout(() => {
                this.mouseDown = false
            }, 500);
        }
    },

    watch: {
        seek() {
            this.seekTime = this.changeTime(Math.round(this.seek))
            if (!this.mouseDown) {
                this.sliderValue = Math.round(this.progress * 100)
            }
        },
    }
}
</script>
 