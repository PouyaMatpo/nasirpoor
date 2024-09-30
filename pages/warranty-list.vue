<template>
    <div
        :style="$s.dark ? 'background-color: #040b25; min-height: 84vh;' : 'background-color: #FFFDE7; min-height: 84vh;'">
        <g-container>
            <div class="py-6">

                <!-- پیام در صورت نبود هیچ گارانتی -->
                <div
                    v-if="!loading && unapprovedWarranties.length === 0 && awaitingPaymentWarranties.length === 0 && paidWarranties.length === 0">
                    <p>محصولی برای گارانتی ثبت نکرده‌اید.</p>
                </div>

                <!-- لیست گارانتی‌های ثبت‌شده -->
                <div v-if="loading || unapprovedWarranties.length > 0">
                    <g-text class="py-6" data="لیست گارانتی‌های در انتظار ثبت جهت پرداخت" />
                    <div v-if="loading">
                        <p>در حال بارگذاری اطلاعات...</p>
                    </div>
                    <div v-else>
                        <div v-for="(warranty, index) in unapprovedWarranties" :key="index" class="p-4 my-4 rounded-3xl"
                            :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFF9C4;'">
                            <p><strong>نوع دستگاه:</strong> {{ typeOfs[warranty.types - 1] }}</p>
                            <p><strong>مدل:</strong> {{ warranty.model }}</p>
                            <p><strong>سریال:</strong> {{ warranty.serial }}</p>
                            <p><strong>تاریخ شروع گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.date }}
                                </span>
                            </p>
                            <p><strong>تاریخ پایان گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.end_date }}
                                </span>
                            </p>
                            <p><strong>مبلغ دستگاه گارانتی شده:</strong> {{ warranty.price }} تومان</p>
                        </div>
                    </div>
                </div>

                <!-- لیست گارانتی‌های در انتظار پرداخت -->
                <div v-if="loading || awaitingPaymentWarranties.length > 0">
                    <g-text class="py-6" data="لیست گارانتی‌های ثبت شده در انتظار پرداخت" />
                    <div v-if="loading">
                        <p>در حال بارگذاری اطلاعات...</p>
                    </div>
                    <div v-else>
                        <div v-for="(warranty, index) in awaitingPaymentWarranties" :key="index"
                            class="p-4 my-4 rounded-3xl"
                            :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFF9C4;'">
                            <p><strong>نوع دستگاه:</strong> {{ typeOfs[warranty.types - 1] }}</p>
                            <p><strong>مدل:</strong> {{ warranty.model }}</p>
                            <p><strong>سریال:</strong> {{ warranty.serial }}</p>
                            <p><strong>تاریخ شروع گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.date }}
                                </span>
                            </p>
                            <p><strong>تاریخ پایان گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.end_date }}
                                </span>
                            </p>
                            <p><strong>مبلغ دستگاه گارانتی شده:</strong> {{ warranty.price }} تومان</p>
                            <p><strong>مبلغ قابل پرداخت (۱۰٪):</strong> {{ calculateTenPercent(warranty.price) }} تومان
                            </p>
                            <s-text-field v-model="warranty.serial_payment" :color="$store.state.pageColor" rounded="xl"
                                label="شماره فیش واریزی" type="number" validations="required" />
                            <s-col>
                                <FileCollectionUploader ref="fileUploader" :types="'image/jpeg, image/png'"
                                    :instantUpload="true" @uploaded="handleFileUpload(index, $event)"
                                    @preparefile="upl">
                                </FileCollectionUploader>
                            </s-col>
                            <s-btn class="mt-4" @click="submitPayment(warranty)" rounded="pill" s-text-field
                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                ارسال اطلاعات پرداخت
                            </s-btn>
                        </div>
                    </div>
                </div>

                <!-- لیست گارانتی‌های پرداخت‌شده -->
                <div v-if="loading || paidWarranties.length > 0">
                    <g-text class="py-6" data="لیست گارانتی‌های پرداخت شده در انتظار تایید نهایی" />
                    <div v-if="loading">
                        <p>در حال بارگذاری اطلاعات...</p>
                    </div>
                    <div v-else>
                        <div v-for="(warranty, index) in paidWarranties" :key="index" class="p-4 my-4 rounded-3xl"
                            :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFF9C4;'">
                            <p><strong>نوع دستگاه:</strong> {{ typeOfs[warranty.level1.types - 1] }}</p>
                            <p><strong>مدل:</strong> {{ warranty.level1.model }}</p>
                            <p><strong>سریال:</strong> {{ warranty.level1.serial }}</p>
                            <p><strong>تاریخ شروع گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.level1.date }}
                                </span>
                            </p>
                            <p><strong>تاریخ پایان گارانتی:</strong>
                                <span dir="ltr">
                                    {{ warranty.level1.end_date }}
                                </span>
                            </p>
                            <p><strong>مبلغ پرداخت‌شده:</strong> {{ calculateTenPercent(warranty.level1.price) }} تومان
                            </p>
                            <p><strong>شماره فیش واریزی:</strong> {{ warranty.serial_payment }}</p>
                            <p><strong>رسید پرداخت:</strong>
                                <a :href="warranty.payment_receipt" target="_blank">مشاهده تصویر</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </g-container>
    </div>
</template>

<script>
export default {
    head() {
        return this.$headBuilder({
            title: 'لیست دستگاه های گارانتی شده',
            description: 'با مسئولیت محدود و شماره ثبت 2441'
        })
    },

    middleware: 'auth',

    mounted() {
        if (this.$route.query.loginError) {
            this.$store.commit('setFailSnackbar', { message: `لطفا ابتدا وارد حساب کاربری خود شوید.` });
        }
        this.fetchWarranties(); // گرفتن لیست گارانتی‌ها هنگام بارگذاری صفحه
    },

    data() {
        return {
            typeOfs: ['چرخ خیاطی', 'اتو پرس', 'اتو مخزن دار'],
            warranties: [], // لیست گارانتی‌های کاربر
            paidWarranties: [], // لیست گارانتی‌های پرداخت‌شده
            unapprovedWarranties: [], // لیست گارانتی‌های ثبت‌شده
            awaitingPaymentWarranties: [], // لیست گارانتی‌های در انتظار پرداخت
            file: null,
            loading: true, // حالت بارگذاری
        };
    },

    methods: {
        async fetchWarranties() {
            try {
                const token = this.$store.state.auth.token;
                if (!token) {
                    this.$store.commit('setFailSnackbar', { message: `توکن احراز هویت یافت نشد. لطفاً وارد حساب کاربری خود شوید.` });
                    return;
                }

                // دریافت گارانتی‌های لول 1 (ثبت‌شده)
                const response = await this.$axios.get('https://warranty.liara.run/warranty/level1/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    this.warranties = response.data;

                    // تفکیک گارانتی‌ها به ثبت‌شده و در انتظار پرداخت
                    this.unapprovedWarranties = this.warranties.filter(warranty => !warranty.is_approved);
                    this.awaitingPaymentWarranties = this.warranties.filter(warranty => warranty.is_approved);
                }

                // دریافت گارانتی‌های پرداخت‌شده (لول 2)
                const responseLevel2 = await this.$axios.get('https://warranty.liara.run/warranty/level2/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (responseLevel2.status === 200) {
                    // ترکیب گارانتی‌های لول 2 با اطلاعات لول 1
                    this.paidWarranties = responseLevel2.data.map(level2Warranty => {
                        const level1Warranty = this.warranties.find(warranty => warranty.id === level2Warranty.level1);

                        // حذف گارانتی از لیست در انتظار پرداخت
                        this.awaitingPaymentWarranties = this.awaitingPaymentWarranties.filter(
                            warranty => warranty.id !== level2Warranty.level1
                        );

                        return {
                            ...level2Warranty,
                            level1: level1Warranty
                        };
                    });
                }

                // بارگذاری به اتمام رسیده است
                this.loading = false;
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'خطا در دریافت لیست گارانتی‌ها. لطفاً دوباره تلاش کنید.' });
                this.loading = false;
            }
        },
        calculateTenPercent(price) {
            return Math.round(price * 0.1); // محاسبه ده درصد مبلغ
        },
        handleFileUpload(index, file) {
            this.$set(this.awaitingPaymentWarranties[index], 'payment_receipt', file);
        },
        upl(e) {
            this.file = e.file;
        },
        async submitPayment(warranty) {
            const token = this.$store.state.auth.token;
            if (!token) {
                this.$store.commit('setFailSnackbar', { message: `توکن احراز هویت یافت نشد. لطفاً وارد حساب کاربری خود شوید.` });
                return;
            }

            console.log('Access Token:', token);

            const formData = new FormData();
            if (this.file) formData.append('payment_receipt', this.file);
            formData.append('serial_payment', warranty.serial_payment);
            formData.append('level1_id', warranty.id);

            await this.$axios.post('https://warranty.liara.run/warranty/level2/submit/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        this.$store.commit('setSuccessSnackbar', { message: `اطلاعات پرداخت با موفقیت ارسال شد.` });
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$store.commit('setFailSnackbar', { message: `خطا در ارسال اطلاعات پرداخت. لطفاً دوباره تلاش کنید.` });
                    } else {
                        this.$store.commit('setFailSnackbar', { message: `خطا در ارسال اطلاعات پرداخت. لطفاً دوباره تلاش کنید.` });
                    }
                });
        }
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