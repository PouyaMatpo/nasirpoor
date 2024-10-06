<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <!-- دیالوگ هشدار برای مطالعه شرایط گارانتی -->
            <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }"
                :sw-options="{ childClass: $s.dark ? 'cyan darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' : $store.state.pageColor + ' lighten-6 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' }"
                :viva="openDia" xs="dialog" width="500" :overlayZIndex="5" no-click-animation persistent>
                <template #title>
                    <g-falcon-title @close-falcon="openDia = false" />
                </template>
                <g-container>
                    <g-text :color="$store.state.pageColor + '--text text--darken-4'" class="font-bold text-xl"
                        data="لطفا قبل از ثبت، شرایط گارانتی را به دقت مطالعه کنید." />
                    <div class="flex justify-center py-4">
                        <s-btn @click="scrollToWarrantyTerms" rounded="pill" large
                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                            <g-text data="مطالعه شرایط" />
                        </s-btn>
                    </div>
                </g-container>
            </s-falcon>

            <div class="flex justify-between md:items-center md:gap-6 md:flex-row flex-col-reverse">
                <div class="md:w-1/2">
                    <g-text class="!py-4 md:!py-8 font-semibold text-lg" data="ثبت کارت گارانتی طلایی و بیمه نامه" />
                    <s-form class="pb-20" color="transparent" xs="block" @submit.prevent="submitRegister"
                        ref="registerForm" noActions>

                        <s-select v-model="formData.type" rounded="xl" :color="$store.state.pageColor" :items="typeOfs"
                            label="نوع دستگاه" validations="required" outlined></s-select>

                        <s-text-field v-model="formData.brand_name" :color="$store.state.pageColor" rounded="xl"
                            label="نام برند" validations="required"></s-text-field>

                        <s-text-field v-model="formData.model" :color="$store.state.pageColor" rounded="xl" label="مدل"
                            validations="required"></s-text-field>

                        <s-text-field v-model="formData.serial" :color="$store.state.pageColor" rounded="xl"
                            label="سریال" validations="required"></s-text-field>

                        <s-text-field v-model="formData.price" :color="$store.state.pageColor" rounded="xl"
                            label="مبلغ دستگاه گارانتی شده:" type="number" validations="required"></s-text-field>

                        <s-col md="6">
                            <FileCollectionUploader ref="fileUploader" :types="'image/jpeg, image/png'"
                                labelIdle="برای بارگذاری تصویر دستگاه خود کلیک کنید یا فایل خود را در این قسمت رها کنید"
                                :instantUpload="true" @preparefile="formData['pic_machine'] = $event.file">
                            </FileCollectionUploader>
                        </s-col>

                        <s-col md="6">
                            <FileCollectionUploader ref="fileUploader" :types="'image/jpeg, image/png'"
                                labelIdle="برای بارگذاری تصویر سریال دستگاه خود کلیک کنید یا فایل خود را در این قسمت رها کنید"
                                :instantUpload="true" @preparefile="formData['pic_serial'] = $event.file">
                            </FileCollectionUploader>
                        </s-col>

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
                    <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" eager aspect-ratio="0.9"
                        class="rounded-3xl" :src="$s.dark ? '../logoDark.png' : '../logo.png'" />
                </div>
            </div>
            <div id="warranty-terms">
                <g-text class="font-bold text-2xl mb-4" data="شرایط گارانتی و بیمه‌نامه ✨" />
                <ul class="list-decimal space-y-6 md:text-lg leading-relaxed">
                    <li>
                        🔧 <span class="font-bold text-cyan-700">تمامی قسمت‌های چرخ خیاطی شامل گارانتی است</span>،
                        به غیر از <span class="text-yellow-600">لوازم مصرفی شامل ماکو، ماسوره، سوزن، پدال و
                            میز</span>.
                    </li>
                    <li>
                        🧼 <span class="font-bold text-cyan-700">در اتوپرس، تمامی قسمت‌ها به جز ابر روکش میز شامل
                            گارانتی
                            است.</span>
                        <br>
                        💧 استفاده از <span class="text-red-600">آب مقطر یا آب تصفیه</span> الزامی است، در غیر این
                        صورت دستگاه شامل
                        گارانتی نمی‌شود.
                    </li>
                    <li>
                        🔋 در اتو مخزن‌دار، <span class="font-bold text-cyan-700">لوازم جانبی و مصرفی</span> شامل
                        درب ، واشر اتو ، درب و واشر درب اتو ، محافظ کف اتو ، قیف ، نشانگر آب
                        شامل گارانتی نمی‌باشد.
                        <br>
                        💧 استفاده از <span class="text-red-600">آب مقطر یا آب تصفیه</span> الزامی است، در غیر این
                        صورت دستگاه از
                        گارانتی خارج می‌شود.
                    </li>
                    <li>
                        🛡️ در صورت <span class="text-blue-700 font-bold">سرقت دستگاه</span>، با ارائه مدارک قانونی
                        از مراجع مربوطه
                        و پرداخت <span class="font-bold text-red-600">۳۰ درصد ارزش دستگاه</span>، دستگاه جدید
                        جایگزین می‌شود.
                    </li>
                    <li>
                        🏚️ در صورت <span class="text-blue-700 font-bold">زمین‌خوردن دستگاه</span>، با پرداخت <span
                            class="font-bold text-red-600">۴۰ درصد از ارزش دستگاه</span>، دستگاه جدید جایگزین
                        می‌شود.
                    </li>
                    <li>
                        🔧 در صورتی که دستگاه شما رفع عیب شود، با استفاده از <span class="font-bold text-cyan-700">لوازم
                            جدید</span>
                        رفع عیب شده و سالم تحویل شما می‌گردد.
                    </li>
                    <li>
                        🔥 در صورت <span class="text-blue-700 font-bold">آتش‌سوزی</span>، با پرداخت <span
                            class="font-bold text-red-600">۳۰ درصد ارزش دستگاه</span>، دستگاه جدید جایگزین می‌شود.
                    </li>
                    <li>
                        ⚡ برای چرخ‌های کارگاهی و خانگی کامپیوتری، استفاده از <span
                            class="font-bold text-purple-700">محافظ برق صنعت
                            دوخت و برش پردیس</span> الزامی است.
                    </li>
                    <li>
                        🔄 هرگونه قطعه و موتور که شامل گارانتی می‌باشد، با ارسال <span
                            class="text-blue-700 font-bold">قطعه
                            خراب</span> به شرکت، می‌توانید <span class="font-bold text-cyan-700">قطعه جدید یا وجه
                            آن</span> را
                        دریافت کنید.
                    </li>
                    <li>
                        🏢 گارانتی فقط در <span class="text-purple-700 font-bold">محل نمایندگی‌های مجاز</span> این
                        شرکت در سراسر
                        کشور معتبر است.
                        <br>
                        ⚠️ هرگونه <span class="text-red-600">دستکاری توسط خود مشتری یا افراد غیرمجاز</span> باعث
                        خارج شدن دستگاه از
                        گارانتی می‌شود.
                    </li>
                    <li>
                        📸 برای <span class="font-bold text-cyan-700">ثبت گارانتی</span>، ارائه <span
                            class="text-blue-700">عکس از
                            دستگاه و قسمت سریال آن</span> الزامی است.
                    </li>
                    <li>
                        🔍 برای دستگاه‌های استوک، <span class="font-bold text-cyan-700">تست سلامت دستگاه توسط
                            شرکت</span> یا
                        نمایندگان شرکت در شهر محل سکونت شما الزامی میباشد.
                    </li>
                </ul>
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
        });
    },

    middleware: 'auth',

    mounted() {
        if (this.$route.query.loginError) {
            this.$store.commit('setFailSnackbar', { message: `لطفا ابتدا وارد حساب کاربری خود شوید.` });
        }

        // نمایش دیالوگ شرایط گارانتی در هنگام ورود به صفحه
        this.openWarningDia = true;
    },

    data() {
        return {
            openDia: true,
            openWarningDia: false,  // متغیر برای باز و بسته کردن دیالوگ هشدار
            typeOfs: ['چرخ خیاطی', 'اتو پرس', 'اتو مخزن دار'],
            formData: {
                type: null,       // نوع دستگاه
                brand_name: '',   // نام برند
                model: '',        // مدل دستگاه
                serial: '',       // شماره سریال
                price: null,      // مبلغ
                pic_machine: null,
                pic_serial: null
            },
        };
    },

    methods: {
        async submitRegister() {
            try {
                const typeIndex = this.typeOfs.indexOf(this.formData.type) + 1;
                if (typeIndex === 0) {
                    this.$store.commit('setFailSnackbar', { message: `نوع دستگاه را انتخاب کنید` });
                    return;
                }

                const payload = {
                    types: typeIndex,
                    brand_name: this.formData.brand_name,
                    model: this.formData.model,
                    serial: this.formData.serial,
                    price: this.formData.price,
                    pic_machine: this.formData.pic_machine,
                    pic_serial: this.formData.pic_serial,
                };

                const formData = new FormData()
                Object.entries(payload).forEach(([key, value]) => formData.append(key, value))

                const token = this.$store.state.auth.token;
                if (!token) {
                    this.$store.commit('setFailSnackbar', { message: `توکن احراز هویت یافت نشد. لطفاً وارد حساب کاربری خود شوید.` });
                    return;
                }

                const response = await this.$axios.post('https://warranty.liara.run/warranty/level1/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    this.$store.commit('setSuccessSnackbar', { message: `گارانتی با موفقیت ثبت شد.` });
                    this.$router.push('/warranty-list');
                    this.$refs.registerForm.reset();
                }
            } catch (error) {
                this.$store.commit('setSuccessSnackbar', { message: `گارانتی با موفقیت ثبت شد.` });
            }
        },

        scrollToWarrantyTerms() {
            // بستن دیالوگ
            this.openDia = false;

            // اسکرول به بخش شرایط گارانتی
            const warrantyTermsElement = document.querySelector('#warranty-terms');
            if (warrantyTermsElement) {
                warrantyTermsElement.scrollIntoView({ behavior: 'smooth' });
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

ul {
    padding-bottom: 3rem;
    margin-bottom: 0rem;
    padding-left: 2rem !important;
    padding-right: 2rem !important;
    font-size: 1rem;
    line-height: 1.5rem;
}
</style>