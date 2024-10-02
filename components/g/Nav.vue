<template>
    <div :style="$s.dark ? 'background-color: #0d1019;' : 'background-color: #FFF9C4;'" class="w-full">
        <g-container>
            <div class="flex items-center justify-between py-4 h-full">
                <nuxt-link :to="localePath('/')">
                    <g-logo :icon="$s.dark ? '../New_Project.png' : '../New_Project_4.png'" iconWidth="160px" />
                </nuxt-link>
                <div class="flex h-full items-center">
                    <div v-for="(link, i) in filteredMenu" :key="`link${i}`" class="h-full flex s-center relative">
                        <nuxt-link :to="localePath(link?.slug) || '#'">
                            <div class="px-3 h-full">
                                <g-slide-overlay reverse :duration=".2"
                                    :options="{ childClass: `h-0.5 ${$s.dark ? $store.state.pageColor + ' lighten-6' : $store.state.pageColor + ' darken-6'}` }"
                                    :borderOptions="{ parentClass: `${$s.dark ? $store.state.pageColor + ' lighten-6' : $store.state.pageColor + ' darken-6'}` }">
                                    <g-text class="text-sm">
                                        {{ $l(link?.title) }}
                                    </g-text>
                                </g-slide-overlay>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="flex gap-2 items-center h-full">
                    <g-dark-mode btn size="20"
                        :textColor="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'" />

                    <!-- دکمه ورود یا منوی کاربر -->
                    <div v-if="!isLoggedIn">
                        <s-btn class="cursor-pointer" rounded="pill" large
                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                            <svg-icon name="account"
                                :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                class="w-6 h-6 -mr-2" />
                            <div class="flex items-center pr-2">
                                <nuxt-link to="/">
                                    <g-text data="ورود / ثبت نام" />
                                </nuxt-link>
                            </div>
                        </s-btn>
                    </div>
                    <div v-else>
                        <!-- استفاده از v-menu برای نمایش گزینه‌های کاربر -->
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" s-text-field
                                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded>
                                    <svg-icon name="account"
                                        :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                        class="w-6 h-6 ml-1 -mr-2" />
                                    {{ userName }}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item disabled @click="goToProfile">
                                    <v-list-item-title>پروفایل</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="goToWarrantyList">
                                    <v-list-item-title>لیست گارانتی های ثبت شده</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="logout">
                                    <v-list-item-title>خروج</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
        </g-container>
    </div>
</template>

<script>
export default {
    name: 'GNav',

    data() {
        return {
            menu: [
                {
                    title: 'ورود یا ثبت نام',
                    slug: '/',
                },
                {
                    title: 'گارانتی',
                    slug: '/warranty',
                },
                {
                    title: 'لیست گارانتی های ثبت شده',
                    slug: '/warranty-list',
                },
                {
                    title: 'ارتباط با ما',
                    slug: '/contact',
                }
            ],
            mobileList: [],
            mobileMenu: false,
            nav: false,
        }
    },

    computed: {
        // فیلتر کردن آیتم‌های منو بر اساس وضعیت ورود کاربر
        filteredMenu() {
            return this.menu.filter((item) => {
                if (item.slug === '/warranty' || item.slug === '/warranty-list') {
                    return this.$store.getters.isLoggedIn; // نمایش "گارانتی" تنها برای کاربران وارد شده
                }
                return true; // نمایش دیگر آیتم‌ها به صورت عمومی
            });
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        userName() {
            return this.$store.state.auth.userName || this.$store.state.auth.phone; // نمایش نام کاربر یا شماره موبایل
        }
    },

    methods: {
        goToProfile() {
            this.$router.push('/profile');
        },
        goToWarrantyList() {
            this.$router.push('/warranty-list');
        },
        logout() {
            this.$store.commit('clearAuthToken'); // حذف اطلاعات ورود
            this.$router.push('/'); // ریدایرکت به صفحه اصلی
        },
        onLoginSuccess() {
            // بعد از موفقیت در لاگین، ریدایرکت به صفحه گارانتی
            this.$router.push('/warranty');
        }
    }
}
</script>