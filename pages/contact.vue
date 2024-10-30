<template>
    <div class="py-10" :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <g-page-layout check stickyRight :topOffset="40" :stickyWidth="$s.mdAndUp ? 'w-1/2' : 'w-full'"
                :contentWidth="$s.mdAndUp ? 'w-1/2' : 'w-full'">
                <template v-slot:stickySection>
                    <div class="md:px-6 md:!pb-0 !pb-8">
                        <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" v eager class="rounded-3xl"
                            src="../swing2.png" />
                    </div>
                </template>
                <template v-slot:ContentSection>
                    <div v-for="(item, i) in contacts" :key="i">
                        <g-map :class="[i === 1 ? 'mt-8' : 'mt-0']" rounded="rounded-3xl" icon="../sewing-machine.png"
                            :lat="item?.lat" :long="item?.lng" zoom="17" height="h-[20rem]" />
                        <div class="md:h-1/2 rounded-3xl flex flex-col justify-between">
                            <div>
                                <div class="pt-8 pb-4">
                                    <g-text class="font-bold"
                                        :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                        :data="item?.title1" />
                                    <g-text
                                        :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                                        :data="item?.description" />
                                </div>
                                <v-row dense>
                                    <s-col cols="12">
                                        <a target="_blank" aria-label="address"
                                            :href="`https://www.google.com/maps/search/${item?.lat},${item?.lng}`">
                                            <g-contact-box icon="directions" :title="item?.title"
                                                :color="$store.state.pageColor">
                                                <template v-slot:descSection>
                                                    <g-text class="font-bold text-sm" :data="item?.address" />
                                                </template>
                                            </g-contact-box>
                                        </a>
                                    </s-col>
                                </v-row>
                                <v-row dense>
                                    <s-col v-for="(phone, index) in item?.phones" :key="`phone${index}`" md="6"
                                        cols="12">
                                        <a aria-label="icon" :href="'tel:' + phone?.phone_number">
                                            <g-contact-box :title="phone?.label" icon="phone2"
                                                :color="$store.state.pageColor">
                                                <template v-slot:descSection>
                                                    <g-text class="font-bold text-sm" :data="phone?.phone_number" />
                                                </template>
                                            </g-contact-box>
                                        </a>
                                    </s-col>
                                </v-row>
                            </div>
                        </div>
                    </div>

                </template>
            </g-page-layout>
        </g-container>
    </div>
</template>

<script>
export default {
    head() {
        return this.$headBuilder({
            title: 'ارتباط با ما',
            description: 'با مسئولیت محدود و شماره ثبت 2441 - (نمایندگی چرخ خیاطی نصیرپور)'
        })
    },

    data() {
        return {
            contacts: [
                {
                    lat: '32.006158570430514',
                    lng: '51.86278773331627',
                    title1: 'شعبه اول',
                    title: 'نمایندگی چرخ خیاطی نصیرپور',
                    address: 'شهرضا خ حکیم فرزانه مقابل پاساژ متقی بین فرعی ۴ و ۶ ',
                    phones: [
                        {
                            label: 'تلفن',
                            phone_number: '03153541336'
                        },
                        {
                            label: 'موبایل',
                            phone_number: '09132201828'
                        }
                    ]
                },
                {
                    lat: '32.0072771',
                    lng: '51.8617813',
                    title1: 'شعبه دوم',
                    title: 'نمایشگاه چرخ خیاطی نصیرپور',
                    address: 'شهرضا خیابان حکیم فرزانه میدان پیروزی اول خیابان حکیم اسداله (سجادیه)',
                    phones: [
                        {
                            label: 'موبایل',
                            phone_number: '09132201828'
                        }
                    ]
                },
            ],
        }
    },
}
</script>
<style lang="scss">
.dark {
    background-color: #040b25;
}
</style>