<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <div class="flex md:flex-row flex-col justify-between py-10 gap-8">
                <div class="md:w-1/2">
                    <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" aspect-ratio="1.2" class="rounded-3xl"
                        eager src="../swing.png" />
                </div>
                <div class="w-full md:w-1/2">
                    <!-- Check if user is logged in -->
                    <div v-if="isLoggedIn" class="flex flex-col items-center py-10">
                        <h2 class="text-2xl font-bold mb-4">کاربر گرامی، شما وارد سیستم شده‌اید.</h2>
                        <p class="text-lg mb-6">
                            شما با کاربر <strong
                                :class="$s.dark ? 'cyan--text text--darken-4' : 'amber--text text--darken-3'">{{
                                loggedInPhoneNumber }}</strong> در حال استفاده از پنل هستید. برای
                            ورود مجدد ابتدا باید از حساب خود خارج شوید.
                        </p>
                        <s-btn @click="logout" rounded="pill" large class="mt-6"
                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                            <g-text :data="$l({ en: 'Logout', fa: 'خروج از حساب کاربری' })" />
                        </s-btn>
                    </div>

                    <!-- Show login/register forms if user is not logged in -->
                    <div v-else class="flex flex-col items-center">
                        <!-- Initial Form for Phone Number Entry -->
                        <div v-if="!otpStep && !registerStep" class="w-full">
                            <h2 class="text-xl font-bold my-4">ورود یا ثبت نام</h2>
                            <s-form color="transparent" xs="block" @submit="handlePhoneNumber" ref="phoneForm"
                                noActions>
                                <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" type="number"
                                    rounded="xl" v-model="phoneNumber" label="شماره موبایل"
                                    :validations="formSubmitted ? 'required|mobile' : ''">
                                </s-text-field>
                                <template v-slot:actions>
                                    <s-btn aria-label="sub" @click="handlePhoneNumber" rounded="pill" large
                                        class="w-full mt-6" :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                        <g-text :data="$l({ en: 'Continue', fa: 'ادامه' })" />
                                    </s-btn>
                                </template>
                            </s-form>
                            <div v-if="phoneNotFound" class="text-red-500 mt-2 text-sm">
                                شماره موبایل یافت نشد. لطفاً اطلاعات خود را وارد کنید تا ثبت‌نام شوید.
                            </div>
                        </div>

                        <!-- OTP Step -->
                        <div v-if="otpStep" class="w-full">
                            <div v-if="!registerStep && otpStep" class="text-green-600 my-4">
                                پیامک حاوی کد تایید به شماره {{ phoneNumber }} ارسال شد.
                            </div>
                            <s-form color="transparent" xs="block" @submit="submitOtp" ref="otpForm" noActions>
                                <!-- Register Step -->
                                <div v-if="registerStep && otpStep" class="w-full">
                                    <h2 class="text-xl font-bold mb-4">ثبت نام کاربر جدید</h2>
                                    <s-form color="transparent" xs="block" @submit="submitRegister" ref="registerForm"
                                        noActions>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.name" label="نام و نام خانوادگی"
                                            :validations="formSubmitted ? 'required' : ''"></s-text-field>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.id" label="کد ملی" validations="required"
                                            type="number"></s-text-field>
                                        <s-textarea :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.address" label="آدرس"
                                            validations="required"></s-textarea>
                                        <div v-if="registerStep && otpStep">
                                            <h2 class="text-xl font-bold mb-4">کد پیامک شده را وارد کنید</h2>
                                            <s-otp-input v-model="otp"
                                                :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                                :length="length" dir="ltr"></s-otp-input>
                                            <div class="flex justify-center w-full mt-4">
                                                <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                            </div>
                                        </div>
                                        <template v-slot:actions>
                                            <div class="!p-2 w-full">
                                                <s-btn aria-label="register" @click="submitRegister" rounded="pill"
                                                    large class="w-full"
                                                    :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                    <g-text :data="$l({ en: 'Register', fa: 'ثبت نام' })" />
                                                </s-btn>
                                            </div>
                                        </template>
                                    </s-form>
                                </div>
                                <div v-if="!registerStep && otpStep">
                                    <h2 class="text-xl font-bold mb-4">کد پیامک شده را وارد کنید</h2>
                                    <s-otp-input v-model="otp"
                                        :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                                        :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" :length="length"
                                        dir="ltr"></s-otp-input>
                                    <div class="flex justify-center w-full mt-4">
                                        <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                    </div>
                                </div>
                                <template v-slot:actions>
                                    <s-btn v-if="!registerStep && otpStep" aria-label="verify" @click="submitOtp"
                                        rounded="pill" large class="w-full mt-6" :disabled="!isActive"
                                        :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                        <g-text :data="$l({ en: 'Submit OTP', fa: 'تایید' })" />
                                    </s-btn>
                                </template>
                            </s-form>
                        </div>
                    </div>
                </div>
            </div>
        </g-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: null,
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
                address: ''
            }
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
                    await this.sendOtpForRegistration();
                    this.phoneNotFound = true;
                    this.registerStep = true;
                    this.otpStep = true;
                    this.startTimer();
                    this.$store.commit('setSuccessSnackbar', { message: `کاربر یافت نشد. لطفاً ثبت‌نام کنید.` });
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    await this.sendOtpForRegistration();
                    this.phoneNotFound = true;
                    this.registerStep = true;
                    this.otpStep = true;
                    this.startTimer();
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
        async submitOtp() {
            try {
                if (this.registerStep) {
                    await this.submitRegister();
                } else {
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
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
            }
        },
        async submitRegister() {
            this.formSubmitted = true;
            if (!this.registerData.name || !this.registerData.id || !this.registerData.address) {
                this.$store.commit('setFailSnackbar', { message: 'تمامی فیلدهای ضروری وارد نشده‌اند.' });
                return;
            }

            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/register/', {
                    phone_number: this.phoneNumber,
                    full_name: this.registerData.name,
                    national_id: this.registerData.id,
                    otp: this.otp,
                    address: this.registerData.address
                });

                if (response.data && response.data.access) {
                    const { access, full_name } = response.data;
                    this.$store.commit('setAuthToken', { token: access, name: full_name });
                    this.$store.commit('setSuccessSnackbar', { message: 'ثبت‌ نام با موفقیت انجام شد. شما وارد سیستم شدید.' });
                    this.$router.push('/warranty');
                } else {
                    this.$store.commit('setFailSnackbar', { message: response.data.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.' });
            }
        },
        startTimer() {
            if (this.interval) clearInterval(this.interval);
            this.interval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.interval);
                    this.timer = 0;
                }
            }, 1000);
        },
        resetTimer() {
            clearInterval(this.interval);
            this.timer = 120;
        },
        logout() {
            this.$store.commit('clearAuthToken');
            this.$router.push('/');
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    created() {
        this.$store.dispatch('loadAuthData');
    }
};
</script>

<style lang="scss">
.v-otp-input .v-input {
    margin: 0;
    flex: 1 0 32px;
    max-width: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 24px !important;
}

.linkColor {
    color: #8a98e6 !important;
}
</style>