<template>
    <div :style="$s.dark ? 'background-color: #1d283a;' : 'background-color: #FFFDE7;'">
        <g-container>
            <div class="flex md:flex-row flex-col justify-between py-10 gap-8">
                <!-- Check if user is logged in -->
                <div v-if="isLoggedIn" class="flex md:flex-row flex-col justify-between gap-8">
                    <div class="md:w-1/2">
                        <s-image :skeletonColor="$s.dark ? '#1d283a' : '#fffde8'" aspect-ratio="1.2" class="rounded-3xl"
                            eager src="../swing.png" />
                    </div>
                    <div class="w-full text-center py-20 md:w-1/2">
                        <h2 class="text-2xl font-bold mb-4">کاربر گرامی، شما وارد سیستم شده‌اید.</h2>
                        <p class="text-lg">
                            شما با شماره <strong>{{ loggedInPhoneNumber }}</strong> در حال استفاده از پنل هستید. برای
                            ورود
                            مجدد ابتدا باید از حساب خود خارج شوید.
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
                                <s-btn @click="switchToLogin" rounded="pill" large
                                    :color="showLogin ? $s.dark ? 'cyan darken-3' : $store.state.pageColor : $s.dark ? '#0d1019' : 'white'">
                                    <g-text :data="$l({ en: 'Login', fa: 'ورود' })" />
                                </s-btn>
                                <s-btn @click="switchToRegister" rounded="pill" large
                                    :color="showRegister ? $s.dark ? 'cyan darken-3' : $store.state.pageColor : $s.dark ? '#0d1019' : 'white'">
                                    <g-text :data="$l({ en: 'Register', fa: 'ثبت نام' })" />
                                </s-btn>
                            </div>

                            <!-- Login Form -->
                            <div v-if="showLogin && !otpStep" class="flex flex-col items-center">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">ورود به پنل کاربری</h2>
                                    <s-form color="transparent" xs="block" @submit="submitLogin" ref="form"
                                        :validate-on-blur="formSubmitted" noActions>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            type="number" rounded="xl" v-model="phoneNumber" @input="setPhone"
                                            label="شماره موبایل"
                                            :validations="formSubmitted ? 'required|mobile' : ''"></s-text-field>

                                        <!-- Display error message if phone number not found -->
                                        <div v-if="phoneNotFound" class="text-red-500 mt-2 text-sm">
                                            شماره موبایل یافت نشد. لطفاً از لینک زیر ثبت‌ نام کنید.
                                        </div>

                                        <template v-slot:actions>
                                            <s-btn aria-label="sub" @click="submitLogin" rounded="pill" large
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
                            <div v-if="showLogin && otpStep" class="flex flex-col items-center">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">کد تایید</h2>

                                    <!-- Display SMS sent message -->
                                    <div class="text-green-600 my-4">
                                        پیامک حاوی کد تایید به شماره {{ phoneNumber }} ارسال شد.
                                    </div>

                                    <s-form color="transparent" xs="block" @submit="submitLoginOtp" ref="otpForm"
                                        noActions>
                                        <s-otp-input v-model="otp"
                                            :background-color="$s.dark ? 'cyan darken-5' : 'yellow lighten-4'"
                                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" :length="length"
                                            dir="ltr"></s-otp-input>
                                        <!-- ssssssss -->
                                        <div class="flex justify-center w-full mt-4">
                                            <!-- <div v-if="timer === 0" class="font-bold text-xl cursor-pointer"
                                                @click="requestNewOtp">
                                                <g-text data="ارسال مجدد" />
                                            </div> -->
                                            <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                        </div>
                                        <template v-slot:actions>
                                            <s-btn aria-label="verify" @click="submitLoginOtp" rounded="pill" large
                                                class="w-1/2 mt-6" :disabled="!isActive"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Submit OTP', fa: 'تایید' })" />
                                            </s-btn>
                                            <!-- Change Phone Number -->
                                            <s-btn aria-label="change-phone" @click="switchToLogin" rounded="pill" large
                                                class="w-1/2 mt-6"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Change Number', fa: 'تغییر شماره' })" />
                                            </s-btn>
                                        </template>
                                    </s-form>
                                </div>
                            </div>

                            <!-- Register Form -->
                            <div v-if="showRegister && !registerOtpStep" class="flex flex-col items-center">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">ثبت نام کاربر جدید</h2>
                                    <s-form color="transparent" xs="block" @submit="submitRegister" ref="registerForm"
                                        noActions>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.name" label="نام و نام خانوادگی"
                                            :validations="formSubmitted ? 'required' : ''"></s-text-field>
                                        <s-text-field s-text-field
                                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl"
                                            v-model="registerData.id" label="کد ملی" validations="required"
                                            type="number"></s-text-field>
                                        <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.phone" label="شماره موبایل" type="number"
                                            validations="required|mobile"></s-text-field>
                                        <s-textarea :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor"
                                            rounded="xl" v-model="registerData.address" label="آدرس"
                                            validations="required"></s-textarea>
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
                                    <div class="flex gap-1 items-center justify-center mt-4">
                                        <g-text data="قبلا ثبت‌نام کردی؟" />
                                        <div class="linkColor cursor-pointer" @click="switchToLogin">
                                            ورود به حساب کاربری
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- OTP Verification for Register with Back Button -->
                            <div v-if="showRegister && registerOtpStep" class="flex flex-col items-center">
                                <div class="w-full">
                                    <h2 class="text-xl font-bold my-4">کد تایید</h2>

                                    <!-- Display SMS sent message -->
                                    <div class="text-green-600 my-4">
                                        پیامک حاوی کد تایید به شماره {{ registerData.phone }} ارسال شد.
                                    </div>

                                    <s-form color="transparent" xs="block" @submit="submitRegisterOtp"
                                        ref="registerOtpForm" noActions>
                                        <s-otp-input v-model="otp"
                                            :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                                            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" :length="length"
                                            dir="ltr"></s-otp-input>
                                        <div class="flex justify-center w-full mt-4">
                                            <!-- <div v-if="timer === 0" class="font-bold text-xl cursor-pointer"
                                                @click="requestNewOtpRegister">
                                                <g-text data="ارسال مجدد" />
                                            </div> -->
                                            <g-text class="font-bold text-xl">{{ timerFormatted }}</g-text>
                                        </div>
                                        <template v-slot:actions>
                                            <s-btn aria-label="verify" @click="submitRegisterOtp" rounded="pill" large
                                                class="w-1/2 mt-6" :disabled="!isActive"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Submit OTP', fa: 'تایید' })" />
                                            </s-btn>
                                            <!-- Change Phone Number -->
                                            <s-btn aria-label="change-phone" @click="switchToRegister" rounded="pill"
                                                large class="w-1/2 mt-6"
                                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                                <g-text :data="$l({ en: 'Change Number', fa: 'تغییر شماره' })" />
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
            title: 'شرکت صنعت دوخت و برش پردیس',
            description: 'با مسئولیت محدود و شماره ثبت 2441'
        })
    },

    data() {
        return {
            showLogin: true, // Show login form by default
            showRegister: false, // Hide register form initially
            formSubmitted: false, // Flag to track form submission
            phoneNumber: null, // For login
            otp: '', // OTP input (initialize as an empty string)
            otpStep: false, // Flag to show OTP step for login
            registerOtpStep: false, // Flag to show OTP step for register
            length: 6, // OTP length
            timer: 120, // Timer for OTP expiration
            interval: null, // Timer interval
            phoneNotFound: false,  // Track if the phone number is not found
            registerData: {
                name: '',
                phone: '',
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
            return this.$store.state.auth.userName || this.$store.state.auth.phone; // نمایش نام کاربر یا شماره موبایل
        },
    },

    methods: {
        switchToLogin() {
            this.showLogin = true;
            this.showRegister = false;
            this.otpStep = false;
            this.formSubmitted = false;
            this.phoneNotFound = false;

            if (this.otpStep) {
                this.resetTimer();
            }
        },

        switchToRegister() {
            this.showLogin = false;
            this.showRegister = true;
            this.registerOtpStep = false;
            this.formSubmitted = false;
            this.phoneNotFound = false;

            if (this.registerOtpStep) {
                this.resetTimer();
            }
        },

        async submitLogin() {
            this.formSubmitted = true;
            this.phoneNotFound = false;

            if (!this.phoneNumber) {
                this.$store.commit('setFailSnackbar', { message: 'Please enter a valid phone number.' });
                return;
            }
            // ssss

            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/login/?phone_number=${this.phoneNumber}`);

                if (response.status === 200) {
                    this.otpStep = true;
                    this.startTimer();

                    // پیامک ارسال شد
                    this.$store.commit('setSuccessSnackbar', { message: `پیامک حاوی کد تایید به شماره ${this.phoneNumber} ارسال شد.` });
                } else if (response.status === 404) {
                    this.phoneNotFound = true;
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Unexpected server response.' });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.phoneNotFound = true;
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Login failed. Please try again.' });
                }
            }
        },

        async submitLoginOtp() {
            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/login/', {
                    phone_number: this.phoneNumber,
                    otp: this.otp
                });

                if (response.status === 200) {
                    const { access } = response.data;
                    this.$store.commit('setAuthToken', { token: access, name: this.phoneNumber });
                    this.$router.push('/warranty');
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Invalid OTP. Please try again.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Failed to verify OTP. Please try again.' });
            }
        },

        async submitRegister() {
            this.formSubmitted = true;

            if (!this.registerData.name || !this.registerData.phone || !this.registerData.id || !this.registerData.address) {
                this.$store.commit('setFailSnackbar', { message: 'Please fill in all required fields.' });
                return;
            }

            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/register/', {
                    full_name: this.registerData.name,
                    phone_number: this.registerData.phone,
                    national_id: this.registerData.id,
                    address: this.registerData.address
                });

                if (response.status === 200 || response.status === 201) {
                    this.registerOtpStep = true;
                    this.startTimer();

                    // پیامک ارسال شد
                    this.$store.commit('setSuccessSnackbar', { message: `پیامک حاوی کد تایید به شماره ${this.registerData.phone} ارسال شد.` });
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Unexpected server response.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Registration failed. Please try again.' });
            }
        },

        submitRegisterOtp() {
            this.$axios.post('https://warranty.liara.run/api-auth/register-otp/', {
                phone_number: this.registerData.phone,
                otp: this.otp
            })
                .then(res => {
                    if (res.data.access) {
                        this.$store.commit('setAuthToken', { token: res.data.access, name: this.registerData.phone });
                        this.$router.push('/warranty');
                    }
                })
                .catch(err => {
                    this.$store.commit('setFailSnackbar', { message: 'Invalid OTP. Please try again.' });
                })
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
        },

        setPhone(e) {
            this.$store.commit('setAuthPhone', e);
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