<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <div class="flex justify-between md:items-center md:gap-6 md:flex-row flex-col-reverse">
                <div class="md:w-1/2">
                    <g-text class="py-2 font-semibold text-lg" data="ثبت کارت گارانتی طلایی و بیمه نامه" />
                    <s-form class="pb-20" color="transparent" xs="block" @submit.prevent="submitRegister"
                        ref="registerForm" noActions>

                        <s-select v-model="formData.type" rounded="xl" :color="$store.state.pageColor" :items="typeOfs"
                            label="نوع دستگاه" validations="required" outlined></s-select>

                        <s-text-field v-model="formData.model" :color="$store.state.pageColor" rounded="xl" label="مدل"
                            validations="required"></s-text-field>

                        <s-text-field v-model="formData.serial" :color="$store.state.pageColor" rounded="xl"
                            label="سریال" validations="required"></s-text-field>

                        <s-text-field v-model="formData.price" :color="$store.state.pageColor" rounded="xl"
                            label="مبلغ دستگاه گارانتی شده:" type="number" validations="required"></s-text-field>

                        <template v-slot:actions>
                            <div class="!p-2 w-full">
                                <s-btn aria-label="register" @click="submitRegister" rounded="pill" large class="w-full"
                                    s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                    <g-text data="ثبت گارانتی" />
                                </s-btn>
                            </div>
                        </template>
                    </s-form>
                </div>
                <div class="px-6 md:w-1/2">
                    <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" eager aspect-ratio="0.7"
                        class="rounded-3xl" :src="$s.dark ? '../logoDark.png' : '../logo.png'" />
                </div>
            </div>
        </g-container>
    </div>
</template>

<script>
export default {
    head() {
        return this.$headBuilder({
            title: 'ثبت گارانتی',
            description: 'با مسئولیت محدود و شماره ثبت 2441'
        })
    },

    middleware: 'auth',

    mounted() {
        if (this.$route.query.loginError) {
            this.$store.commit('setFailSnackbar', { message: `لطفا ابتدا وارد حساب کاربری خود شوید.` });
        }
    },

    data() {
        return {
            typeOfs: ['چرخ خیاطی', 'اتو پرس', 'اتو مخزن دار'],
            formData: {
                type: null,  // نوع دستگاه
                model: '',   // مدل دستگاه
                serial: '',  // شماره سریال
                price: null, // مبلغ
            },
        };
    },

    methods: {
        async submitRegister() {
            try {
                // اطمینان از انتخاب نوع دستگاه
                const typeIndex = this.typeOfs.indexOf(this.formData.type) + 1;
                if (typeIndex === 0) {
                    this.$store.commit('setFailSnackbar', { message: `نوع دستگاه را انتخاب کنید` });
                    return;
                }

                // ایجاد payload برای ارسال به سرور
                const payload = {
                    types: typeIndex,
                    model: this.formData.model,
                    serial: this.formData.serial,
                    price: this.formData.price,
                };

                // دریافت توکن از Store
                const token = this.$store.state.auth.token;
                if (!token) {
                    this.$store.commit('setFailSnackbar', { message: `توکن احراز هویت یافت نشد. لطفاً وارد حساب کاربری خود شوید.` });
                    return;
                }

                // ارسال درخواست POST با استفاده از Axios
                const response = await this.$axios.post('https://warranty.liara.run/warranty/level1/', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`, // استفاده از توکن از حالت (store)
                        'Content-Type': 'application/json',
                    },
                });

                // بررسی موفقیت درخواست
                if (response.status === 200 || response.status === 201) {
                    this.$store.commit('setSuccessSnackbar', { message: `گارانتی با موفقیت ثبت شد.` });
                    this.$router.push('/warranty-list');
                    this.$refs.registerForm.reset();
                }
            } catch (error) {
                this.$store.commit('setSuccessSnackbar', { message: `گارانتی با موفقیت ثبت شد.` });
            }
        },
    },
};
</script>

<style lang="scss">
.v-list-item__title,
.v-list-item__subtitle {
    flex: 1 1 100%;
    overflow: visible;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>