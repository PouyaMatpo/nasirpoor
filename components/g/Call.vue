<template>
    <div>
        <s-btn :color="$store.state.pageColor" @click="callMenu = true" rounded="pill" id="sky"
            :fab="withoutText ? true : false">
            <div class="flex items-center gap-3">
                <svg-icon name="phone2" class="w-3 h-3"
                    :class="[$s.rtl ? '' : 'rotate-90', $store.state.pageColor + '--text text--lighten-6']" />
                <g-text :data="$t('Call')" :class="$store.state.pageColor + '--text text--lighten-6'" />
            </div>
        </s-btn>
        <s-falcon
            :sw-options="{ parentClass: $s.dark ? $s.mdAndUp ? $store.state.pageColor + ' darken-5 h-fit w-96' : $store.state.pageColor + ' darken-5 h-fit rounded-t-2xl' : $s.mdAndUp ? $store.state.pageColor + ' lighten-5 h-fit w-96' : $store.state.pageColor + ' lighten-5 h-fit rounded-t-2xl' }"
            nudge-bottom="12" bottom :viva.sync="callMenu" activator="#sky" :close-on-content-click="false"
            sm="bottom-sheet" md="sky-menu" z-index="11">
            <div class="px-4 py-6 flex flex-col gap-4">
                <v-list v-if="
                    $configs?.global?.contacts?.contacts[0]?.forms?.filter(
                        (el) => el.show
                    ).length
                " color="transparent" class="!flex flex-col gap-4">
                    <template v-for="(form, index) in $configs?.global?.contacts
                        ?.contacts[0]?.forms">
                        <s-list-item v-if="form.show" @click="openForm(form.type)"
                            :class="$s.dark ? $store.state.pageColor + ' darken-4' : $store.state.pageColor"
                            class="cursor-pointer rounded-full !p-1" :key="`form${index}`">
                            <template v-slot:avatar>
                                <s-avatar icon="form" :color="$store.state.pageColor + ' lighten-1'"
                                    :iconClass="$store.state.pageColor + '--text text--lighten-6 !w-1/2 !h-1/2 !rounded-none'" />
                            </template>
                            <template v-slot:title>
                                <g-text class="w-full text-xl font-bold px-4" color="white--text">
                                    {{ $l(form.type == 'complaint' ? $l({ en: 'Complaint', fa: 'فرم شکایات' }) : $l({
                                        en: 'Contact', fa: 'تماس با ما'
                                    })) }}
                                </g-text>
                            </template>
                        </s-list-item>
                    </template>
                </v-list>
                <v-list v-if="
                    $configs?.global?.contacts?.contacts[0]?.phones?.filter(
                        (el) => el.show
                    ).length
                " color="transparent" class="!flex flex-col gap-2">
                    <template v-for="(phone, index) in $configs?.global?.contacts
                        ?.contacts[0]?.phones">
                        <s-list-item v-if="phone.show"
                            :class="$s.dark ? $store.state.pageColor + ' darken-4 rounded-full !p-1 my-2' : $store.state.pageColor + ' lighten-6 rounded-full !p-1 my-2'"
                            :key="`form${index}`">
                            <template v-slot:avatar>
                                <s-avatar icon="account" :color="$store.state.pageColor + ' lighten-1'"
                                    :iconClass="$store.state.pageColor + '--text text--lighten-6 !w-1/2 !h-1/2 !rounded-none'" />
                            </template>
                            <template v-slot:title>
                                <g-text class="w-full px-4">
                                    {{ $l(phone.labels) }}
                                </g-text>
                            </template>
                            <template v-slot:subtitle>
                                <g-tel class="w-full px-4 text-xs" :data="$l(phone.number)" />
                            </template>
                            <template v-slot:action>
                                <div class="px-1">
                                    <s-btn :href="'tel:' + phone.number" fab rounded="pill" small
                                        :color="$store.state.pageColor + 'lighten-5'">
                                        <svg-icon name="phone2" class="w-4 h-4" :class="$s.rtl ? 'rotate-90' : ''" />
                                    </s-btn>
                                    <s-btn :href="'https://wa.me/' + phone.number" v-if="phone?.whatsapp" fab
                                        rounded="pill" small color="!bg-[#00A5101a]">
                                        <svg-icon name="whatsapp" class="w-4 h-4 !text-[#038C00]" />
                                    </s-btn>
                                    <s-btn :href="'https://t.me/' + phone.number" v-if="phone?.telegram" fab
                                        rounded="pill" small color="!bg-[#2AABEE1A]">
                                        <svg-icon name="telegram" class="w-4 h-4" />
                                    </s-btn>
                                </div>
                            </template>
                        </s-list-item>
                    </template>
                </v-list>
                <div class="flex justify-end">
                    <g-social v-if="$configs?.global?.socials?.social_networks?.length" :data="$configs?.global?.socials?.social_networks"
                        :color="$store.state.pageColor + '--text text--darken-3'"
                        :class="$s.dark ? $store.state.pageColor + ' darken-4 rounded-full' : $store.state.pageColor + ' lighten-6 rounded-full'" />
                </div>
            </div>
        </s-falcon>
        <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }" :sw-options="{
            childClass: $s.dark
                ? $store.state.pageColor + ' darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none'
                : $store.state.pageColor + ' lighten-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none',
        }" :viva.sync="isDialogOpen" xs="bottom-sheet" sm="dialog">
            <template #title>
                <g-falcon-title
                    :class="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                    :title="$l({ en: 'Contact Form', fa: 'فرم ارتباط با ما' })" @close-falcon="handleCloseFalcon" />
            </template>
            <g-form-contact v-if="dialog == 'contact'"
                :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'"
                contact />
            <g-form-contact v-else
                :color="$s.dark ? $store.state.pageColor + ' darken-5' : $store.state.pageColor + ' lighten-5'" />
        </s-falcon>
    </div>
</template>
<script>
export default {
    name: "GCall",

    props: {
        withoutText: Boolean,
    },

    data() {
        return {
            callMenu: false,
            dialog: "",
            isDialogOpen: false,
        };
    },

    methods: {
        openForm(type) {
            this.dialog = type;
            this.isDialogOpen = true;
        },

        handleCloseFalcon() {
            this.isDialogOpen = false;
        },
    },
};
</script>