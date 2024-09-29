<template>
    <div>
        <div alt="icon" tabindex="650" ref="map" :class="[height, rounded]" />
    </div>
</template>
<script>
import 'leaflet/dist/leaflet.css'

export default {
    name: 'GMap',

    props: {
        lat: {
            type: [Number, String],
            default: '35.700962'
        },

        long: {
            type: [Number, String],
            default: '51.397705'
        },

        rounded: {
            type: String
        },

        zoom: {
            type: String,
            default: '16'
        },

        icon: {
            type: String,
            default: '/icon.png'
        },

        iconSizeWidth: {
            type: String,
            default: '35'
        },

        iconSizeHeight: {
            type: String,
            default: '35'
        },

        height: {
            type: String,
            default: 'h-[450px]'
        },

        theme: {
            type: String,
            default: 'https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=0ad98d9b1cdc47a0866963c31a5487b9'
        }
    },

    mounted() {
        const L = require('leaflet')
        var map = L.map(this.$refs.map, { scrollWheelZoom: false }).setView([this?.lat, this?.long], this?.zoom);
        L.tileLayer(this?.theme).addTo(map);
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [this?.iconSizeWidth, this?.iconSizeHeight],
            }
        });
        var tlIcon = new LeafIcon({ iconUrl: this?.icon });
        L.marker([this?.lat, this?.long], { icon: tlIcon }).addTo(map);
    }
}
</script>
<style lang="scss">
.leaflet-control-zoom {
    a {
        span {
            color: black;
        }
    }
}
</style>