<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <div class="flex md:flex-row flex-col justify-between py-10 gap-8">
                <div v-if="isLoggedIn" class="flex md:flex-row flex-col justify-between gap-8">
                    <div class="md:w-1/2">
                        <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" aspect-ratio="1.2" class="rounded-3xl"
                            eager src="../swing.png" />
                    </div>
                    <div class="w-full text-center py-20 md:w-1/2">
                        <h2 class="text-2xl font-bold mb-4">کاربر گرامی، شما وارد سیستم شده‌اید.</h2>
                        <p class="text-lg">
                            شما با حساب <strong>{{ loggedInPhoneNumber }}</strong> در حال استفاده از پنل هستید. برای
                            ورود مجدد ابتدا باید از حساب خود خارج شوید.
                        </p>
                        <s-btn @click="logout" rounded="pill" large class="mt-6"
                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                            <g-text :data="$l({ en: 'Logout', fa: 'خروج از حساب کاربری' })" />
                        </s-btn>
                    </div>
                </div>

                <!-- Show login/register forms if user is not logged in -->
                <div v-else>
                    <div class="flex md:flex-row flex-col justify-between gap-8">
                        <div class="md:w-1/2">
                            <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" aspect-ratio="1.2"
                                class="rounded-3xl" eager src="../swing.png" />
                        </div>
                        <div class="md:w-1/2">
                            <div class="flex gap-4 items-center">
                                <!-- Login Button -->
                                <s-btn @click="switchToLogin" rounded="pill" large
                                    :color="showLogin ? ($s.dark ? 'cyan darken-3' : $store.state.pageColor) : ($s.dark ? '#0d1019' : 'white')">
                                    <g-text :data="$l({ en: 'Login', fa: 'ورود' })" />
                                </s-btn>
                                <!-- Register Button -->
                                <s-btn @click="switchToRegister" rounded="pill" large
                                    :color="showRegister ? ($s.dark ? 'cyan darken-3' : $store.state.pageColor) : ($s.dark ? '#0d1019' : 'white')">
                                    <g-text :data="$l({ en: 'Register', fa: 'ثبت نام' })" />
                                </s-btn>
                            </div>

                            <!-- Login Form -->
                            <div v-if="showLogin && !otpStep" class="flex flex-col items-center mt-8">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">ورود به پنل کاربری</h2>
                                    <s-form color="transparent" xs="block" @submit.prevent="handlePhoneNumber"
                                        ref="loginForm" :validate-on-blur="formSubmitted" noActions>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            type="number" rounded="xl" v-model="phoneNumber" label="شماره موبایل"
                                            :validations="formSubmitted ? 'required|mobile' : ''"></s-text-field>
                                        <!-- Display error message if phone number not found -->
                                        <div v-if="phoneNotFound" class="text-red-500 mt-2 text-sm">
                                            شماره موبایل یافت نشد. لطفاً از لینک زیر ثبت‌نام کنید.
                                        </div>
                                        <template v-slot:actions>
                                            <s-btn aria-label="sub" @click="handlePhoneNumber" rounded="pill" large
                                                class="w-full mt-6"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Login', fa: 'ادامه' })" />
                                            </s-btn>
                                        </template>
                                    </s-form>
                                    <div class="flex gap-1 items-center justify-center mt-4">
                                        <g-text data="هنوز عضو نیستی؟" />
                                        <div class="linkColor cursor-pointer" @click="switchToRegister">
                                            همین حالا ثبت نام کن
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- OTP Verification for Login -->
                            <div v-if="showLogin && otpStep" class="flex flex-col items-center mt-8">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">کد تایید</h2>
                                    <!-- Display SMS sent message -->
                                    <div class="text-green-600 my-4">
                                        پیامک حاوی کد تایید به شماره {{ phoneNumber }} ارسال شد.
                                    </div>
                                    <s-form color="transparent" xs="block" @submit.prevent="submitOtp" ref="otpForm"
                                        noActions>
                                        <s-otp-input v-model="otp"
                                            :background-color="$s.dark ? 'cyan darken-5' : 'yellow lighten-4'"
                                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" :length="length"
                                            dir="ltr"></s-otp-input>
                                        <div class="flex justify-center w-full mt-4">
                                            <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                        </div>
                                        <template v-slot:actions>
                                            <s-btn aria-label="verify" @click="submitOtp" rounded="pill" large
                                                class="w-full mt-6" :disabled="!isActive"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Submit OTP', fa: 'تایید' })" />
                                            </s-btn>
                                        </template>
                                    </s-form>
                                </div>
                            </div>

                            <!-- Register Form -->
                            <div v-if="showRegister && !registerOtpStep" class="flex flex-col items-center mt-8">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">ثبت نام کاربر جدید</h2>
                                    <s-form color="transparent" xs="block" @submit.prevent="handleRegister"
                                        ref="registerForm" noActions>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.name" label="نام و نام خانوادگی"
                                            :validations="formSubmitted ? 'required' : ''"></s-text-field>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.id" label="کد ملی" validations="required"
                                            type="number"></s-text-field>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.phone" label="شماره موبایل" type="number"
                                            validations="required|mobile"></s-text-field>
                                        <s-textarea :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.address" label="آدرس"
                                            validations="required"></s-textarea>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.postal_code" label="کد پستی"
                                            type="number" validations="required"></s-text-field>
                                        <template v-slot:actions>
                                            <div class="!p-2 w-full">
                                                <s-btn aria-label="register" @click="handleRegister" rounded="pill"
                                                    large class="w-full"
                                                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                    <g-text :data="$l({ en: 'Register', fa: 'ثبت نام' })" />
                                                </s-btn>
                                            </div>
                                        </template>
                                    </s-form>
                                </div>
                            </div>

                            <!-- OTP Verification for Register -->
                            <div v-if="showRegister && registerOtpStep" class="flex flex-col items-center mt-8">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">کد تایید</h2>
                                    <!-- Display SMS sent message -->
                                    <div class="text-green-600 my-4">
                                        پیامک حاوی کد تایید به شماره {{ registerData.phone }} ارسال شد.
                                    </div>
                                    <s-form color="transparent" xs="block" @submit.prevent="submitRegisterOtp"
                                        ref="registerOtpForm" noActions>
                                        <s-otp-input v-model="otp"
                                            :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" :length="length"
                                            dir="ltr"></s-otp-input>
                                        <div class="flex justify-center w-full mt-4">
                                            <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                        </div>
                                        <template v-slot:actions>
                                            <s-btn aria-label="verify" @click="submitRegisterOtp" rounded="pill" large
                                                class="w-full mt-6" :disabled="!isActive"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Submit OTP', fa: 'تایید' })" />
                                            </s-btn>
                                        </template>
                                    </s-form>
                                </div>
                            </div>

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
            title: 'ورود',
            description: 'با مسئولیت محدود و شماره ثبت 2441'
        })
    },

    data() {
        return {
            phoneNumber: '',
            otp: '',
            otpStep: false,
            registerStep: false,
            formSubmitted: false,
            phoneNotFound: false,
            length: 6,
            timer: 120,
            interval: null,
            registerData: {
                name: '',
                id: '',
                phone: '',
                address: '',
                postal_code: ''
            },
            showLogin: true,
            showRegister: false,
            registerOtpStep: false
        };
    },
    computed: {
        isActive() {
            return this.otp && this.otp.length === this.length;
        },
        timerFormatted() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        loggedInPhoneNumber() {
            return this.$store.state.auth.userName || this.$store.state.auth.phone;
        }
    },
    methods: {
        switchToLogin() {
            this.showLogin = true;
            this.showRegister = false;
            this.otpStep = false;
            this.registerOtpStep = false;
        },
        switchToRegister() {
            this.showLogin = false;
            this.showRegister = true;
            this.otpStep = false;
            this.registerOtpStep = false;
        },
        async handlePhoneNumber() {
            this.formSubmitted = true;
            if (!this.phoneNumber) {
                this.$store.commit('setFailSnackbar', { message: 'وارد کردن شماره تماس الزامی است' });
                return;
            }

            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/login/?phone_number=${this.phoneNumber}`);
                if (response.status === 200) {
                    this.otpStep = true;
                    this.startTimer();
                    this.$store.commit('setSuccessSnackbar', { message: `پیامک حاوی کد تایید به شماره ${this.phoneNumber} ارسال شد.` });
                } else if (response.status === 404) {
                    this.switchToRegister();
                    this.registerData.phone = this.phoneNumber;
                    this.phoneNotFound = true;
                    this.$store.commit('setSuccessSnackbar', { message: `کاربر یافت نشد. لطفاً ثبت‌نام کنید.` });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.switchToRegister();
                    this.registerData.phone = this.phoneNumber;
                    this.phoneNotFound = true;
                    this.$store.commit('setSuccessSnackbar', { message: `کاربر یافت نشد. لطفاً ثبت‌نام کنید.` });
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
                }
            }
        },

        async sendOtpForRegistration() {
            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/register/?phone_number=${this.phoneNumber}`);
                if (response.status !== 200) {
                    throw new Error('Failed to send OTP for registration');
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'ارسال OTP برای ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.' });
            }
        },
        async handleRegister() {
            if (!this.registerData.name || !this.registerData.id || !this.registerData.phone || !this.registerData.address || !this.registerData.postal_code) {
                this.$store.commit('setFailSnackbar', { message: 'تمامی فیلدهای ضروری وارد نشده‌اند.' });
                return;
            }
            this.registerOtpStep = true;
            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/register/?phone_number=${this.registerData.phone}`);
                if (response.status === 200) {
                    this.startTimer();
                    this.$store.commit('setSuccessSnackbar', { message: `پیامک حاوی کد تایید به شماره ${this.registerData.phone} ارسال شد.` });
                } else {
                    throw new Error('Failed to send OTP for registration');
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'ارسال OTP برای ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.' });
            }
        },

        async submitRegisterOtp() {
            this.formSubmitted = true;
            if (!this.registerData.name || !this.registerData.id || !this.registerData.address || !this.registerData.postal_code || !this.otp) {
                this.$store.commit('setFailSnackbar', { message: 'تمامی فیلدهای ضروری وارد نشده‌اند.' });
                return;
            }
            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/register/', {
                    phone_number: this.registerData.phone,
                    full_name: this.registerData.name,
                    national_id: this.registerData.id,
                    otp: this.otp,
                    address: this.registerData.address,
                    postal_code: this.registerData.postal_code
                });

                if (response.data && response.data.access) {
                    const { access, full_name } = response.data;
                    this.$store.commit('setAuthToken', { token: access, name: full_name });
                    this.$router.push('/warranty');
                } else {
                    this.$store.commit('setFailSnackbar', { message: response.data.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.' });
            }
        },

        async submitOtp() {
            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/login/', {
                    phone_number: this.phoneNumber,
                    otp: this.otp
                });
                if (response.data && response.data.access) {
                    const { access, full_name } = response.data;
                    this.$store.commit('setAuthToken', { token: access, name: full_name });
                    this.$router.push('/warranty');
                } else {
                    this.$store.commit('setFailSnackbar', { message: response.data.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
            }
        },
        startTimer() {
            if (this.interval) clearInterval(this.interval);
            this.timer = 120;
            this.interval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.interval);
                    this.timer = 0;
                }
            }, 1000);
        },
        logout() {
            this.$store.commit('clearAuthToken');
            this.$router.push('/');
        }
    }
};
</script>

<style>
.v-otp-input .v-input {
    margin: 0;
    flex: 1 0 32px;
    max-width: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 24px;
}

.v-dialog {
    border-radius: 26px;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
    margin: 24px;
    outline: none;
    overflow-y: auto;
    pointer-events: auto;
    transition: .3s cubic-bezier(.25, .8, .25, 1);
    width: 100%;
    z-index: inherit;
}

.linkColor {
    color: #8a98e6 !important;
    cursor: pointer;
}
</style>