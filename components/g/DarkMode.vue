<template>
    <div>
        <s-btn icon v-if="btn" @click="toggleDarkMode" rounded="pill" :color="color">
            <svg-icon :height="size" :width="size" :class="['animated-icon', isDark ? 'lunar' : 'solar']"
                :name="isDark ? 'moon' : 'sun'" />
        </s-btn>
        <s-select v-else :items="selectModes" rounded="lg" :background-color="color" @change="changeSelect"
            v-model="mode" class="!p-0">
            <template v-slot:selection="{ item }">
                <div class="flex items-center justify-between w-full gap-2" :class="textColor">
                    <div class="flex items-center gap-2">
                        <svg-icon :name="item === 'DARK' ? 'moon' : 'sun'" class="w-5 h-5 animated-icon"
                            :class="item === 'DARK' ? 'lunar' : 'solar'" />
                        <div class="font-medium">{{ item }}</div>
                    </div>
                    <svg-icon name="menu-down" class="w-5 h-5" />
                </div>
            </template>
            <template v-slot:item="{ item }">
                <div class="flex items-center w-full gap-3" :class="$s.dark ? 'white--text' : 'black--text'">
                    <svg-icon :name="item === 'DARK' ? 'moon' : 'sun'" class="!w-5 !h-5 animated-icon"
                        :class="item === 'DARK' ? 'lunar' : 'solar'" />
                    <div class="font-medium">{{ item }}</div>
                </div>
            </template>
        </s-select>
    </div>
</template>
<script>
export default {
    name: 'GDarkMode',

    props: {
        icon: Boolean,
        totalIcon: String,
        darkIcon: String,
        lightIcon: String,
        size: { type: String, default: '30' },
        color: { type: String, default: 'primary' },
        btn: Boolean,
        textColor: String,
    },

    data() {
        return {
            mode: 'LIGHT',
            selectModes: ['LIGHT', 'DARK', 'SYSTEM THEME'],
            isDark: false, // To track dark mode state
        }
    },

    created() {
        this.isDark = this.$s.dark;
        this.mode = this.isDark ? 'DARK' : 'LIGHT';
    },

    methods: {
        toggleDarkMode() {
            this.$toggleDark();
            this.isDark = !this.isDark; // Toggle dark mode state
        },

        changeSelect() {
            if (this.mode === 'DARK') {
                this.$toggleDark();
            } else if (this.mode === 'LIGHT') {
                this.$toggleDark();
            }
            // Add logic for SYSTEM THEME if needed
        }
    },

    watch: {
        '$s.dark'() {
            this.isDark = this.$s.dark;
            this.mode = this.isDark ? 'DARK' : 'LIGHT';
        }
    }
}
</script>
<style scoped>
.animated-icon {
    transition: transform 0.5s ease, filter 0.5s ease;
}

.animated-icon:hover {
    filter: brightness(1.2);
}

.solar {
    transform: rotate(360deg);
}

.lunar {
    animation: glow 0.5s ease forwards;
}

@keyframes glow {
    0% {
        filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.5));
    }

    100% {
        filter: drop-shadow(0 0 15px rgba(255, 255, 0, 1));
    }
}
</style>
