<template>
    <g-footer-layout :fixed="$s.mdAndUp" :style="$s.dark ? 'background-color: #0d1019;' : 'background-color: #FFF9C4;'"
        class="w-full">
        <template v-slot:TopSection>
            <g-container>
                <div class="flex !mb-10 md:!mb-14">
                    <nuxt-link :to="localePath('/')">
                        <g-logo :icon="$s.dark ? '../New_Project.png' : '../New_Project_4.png'" iconWidth="190px" />
                    </nuxt-link>
                </div>
            </g-container>
        </template>
        <template v-slot:MiddleSection>
            <g-container>
                <v-row class="w-full">
                    <s-col v-for="(items, i) in filteredFooter" :key="`items${i}`" cols="12" md="3">
                        <div class="w-fit">
                            <g-slide-overlay v-if="items.link" reverse :duration=".2" class="pb-4 w-fit"
                                :options="{ childClass: `h-0.5 ${$s.dark ? 'white' : 'black'}` }"
                                :borderOptions="{ parentClass: `${$s.dark ? 'white' : 'black'}` }">
                                <nuxt-link :to="localePath(items.link)">
                                    <g-text class="font-semibold" :data="$l(items.title)" />
                                </nuxt-link>
                            </g-slide-overlay>
                            <nuxt-link v-for="(item, d) in items._items" :key="`item${d}`" :to="localePath(item.link)"
                                class="font-medium">
                                <g-slide-overlay reverse :duration=".2" class="mb-2 w-fit"
                                    :options="{ childClass: `h-0.5 ${$s.dark ? 'white' : 'black'}` }"
                                    :borderOptions="{ parentClass: `${$s.dark ? 'white' : 'black'}` }">
                                    <g-text class="text-sm">{{ $l(item.title) }}</g-text>
                                </g-slide-overlay>
                            </nuxt-link>
                        </div>
                    </s-col>
                </v-row>
            </g-container>
        </template>
        <template v-slot:SocialSection>
            <g-container>
                <div class="flex w-full justify-end items-center ">
                    <div class="flex items-center justify-between md:justify-start gap-3">
                        <div class="flex">
                            <g-dark-mode btn size="20" />
                        </div>
                        <g-social :data="social_networks" :color="$store.state.pageColor + '--text text--darken-3'"
                            :style="$s.dark ? 'background-color: #044041;' : null"
                            :class="$s.dark ? 'rounded-full' : $store.state.pageColor + ' lighten-4 rounded-full'" />
                    </div>
                </div>
            </g-container>
        </template>
        <template v-slot:PowerdSection>
            <g-container>
                <div class="flex gap-2 items-center justify-between mt-10">
                    <div class="flex gap-2 items-center text-sm">
                        <g-text>کلیه حقوق این وب سایت متعلق به</g-text>
                        <g-text darkColor="cyan--text text--darken-3" color="amber--text text--darken-2" class="font-semibold">شرکت صنعت دوخت و برش
                            پردیس</g-text>
                        <g-text>با مسئولیت محدود و شماره ثبت 2441 میباشد!</g-text>
                    </div>
                    <div dir="ltr">
                        2024-Pardis©
                    </div>
                </div>
            </g-container>
        </template>
    </g-footer-layout>
</template>

<script>
export default {
    name: 'GFooter',

    data() {
        return {
            footer: [
                {
                    title: 'خانه',
                    link: '/',
                    _items: [
                        {
                            title: 'گارانتی',
                            link: '/warranty',
                        },
                        {
                            title: 'لیست گارانتی های ثبت شده',
                            link: '/warranty-list',
                        }
                    ]
                },
                {
                    title: 'پردیس',
                    link: '/',
                    _items: [
                        {
                            title: 'ارتباط با ما',
                            link: '/contact',
                        },
                        {
                            title: 'مسئولیت های اجتماعی',
                            link: '/social-responsibility',
                        },
                        {
                            title: 'سیاست حفظ حریم خصوصی',
                            link: '/privacy-policy',
                        },
                        {
                            title: 'شرایط خدمات',
                            link: '/terms-of-service',
                        },
                        {
                            title: 'سیاست کوکی',
                            link: '/cookie-policy',
                        },
                    ]
                }
            ],
            social_networks: [
                {
                    type: 'instagram',
                    link: 'https://www.instagram.com/masoud131155?igsh=amN6a3d1cGU0MzA2'
                },
                {
                    type: 'telegram',
                    link: ''
                },
                {
                    type: 'whatsapp',
                    link: ''
                },
            ]
        }
    },

    computed: {
        // فیلتر کردن آیتم‌های منو بر اساس وضعیت ورود کاربر
        filteredFooter() {
            return this.footer.map((section) => {
                if (section.title === 'خانه') {
                    return {
                        ...section,
                        _items: section._items.filter((item) => {
                            // نمایش "گارانتی" و "لیست گارانتی‌های ثبت شده" تنها برای کاربران وارد شده
                            if (item.link === '/warranty' || item.link === '/warranty-list') {
                                return this.isLoggedIn;
                            }
                            return true;
                        })
                    };
                }
                return section;
            });
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    }
}
</script>