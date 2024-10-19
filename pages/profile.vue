<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <g-text class="!py-4 md:!py-8 font-semibold text-2xl" data="اطلاعات پروفایل" />
            <s-form :color="$s.dark ? '#1d283a' : '#FFFDE7'" xs="block" noActions @submit.prevent="updateProfile">
                <s-text-field rounded="xl" v-model="profileData.full_name" label="نام و نام خانوادگی"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" required />
                <s-text-field rounded="xl" v-model="profileData.national_id" label="کد ملی" type="number"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" required />
                <s-text-field rounded="xl" v-model="profileData.phone_number" label="شماره موبایل" type="number"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" required />
                <s-textarea v-model="profileData.address" label="آدرس"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" required />
                <s-text-field rounded="xl" v-model="profileData.postal_code" label="کد پستی" type="number"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" required />
                <s-text-field rounded="xl" v-model="profileData.code" label="کد کاربر"
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" readonly />
                <s-btn type="submit" class="my-4" rounded="pill" large
                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                    <g-text :data="$l({ en: 'Save', fa: 'ذخیره' })" />
                </s-btn>
            </s-form>
        </g-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profileData: {
                full_name: '',
                national_id: '',
                phone_number: '',
                address: '',
                postal_code: '',
                code: ''
            },
        };
    },
    async created() {
        try {
            const token = this.$store.state.auth.token;
            const response = await this.$axios.get('https://warranty.liara.run/api-auth/me/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            this.profileData = response.data;

        } catch (error) {
            this.$store.commit('setFailSnackbar', { message: 'خطایی در دریافت اطلاعات کاربر رخ داد.' });
        }
    },
    methods: {
        async updateProfile() {
            try {
                const token = this.$store.state.auth.token;
                const updatedProfile = { ...this.profileData };
                delete updatedProfile.code;
                await this.$axios.put('https://warranty.liara.run/api-auth/me/', updatedProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                this.$store.commit('setSuccessSnackbar', { message: 'پروفایل با موفقیت به‌روزرسانی شد.' });

            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'خطایی در به‌روزرسانی پروفایل رخ داد.' });
            }
        }
    }
};
</script>