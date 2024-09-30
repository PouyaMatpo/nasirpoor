<template>
    <div>
        <!-- Login/Register Button -->
        <s-btn @click="handleAuthButtonClick" class="cursor-pointer" rounded="pill" large
            :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
            <svg-icon name="account"
                :class="$s.dark ? $store.state.pageColor + '--text text--lighten-6' : $store.state.pageColor + '--text text--darken-6'"
                class="w-6 h-6 -mr-2" />
            <div class="flex items-center pr-2">
                <g-text :data="authButtonText" />
            </div>
        </s-btn>

        <!-- Login Dialog -->
        <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }"
            :sw-options="{ childClass: $s.dark ? 'cyan darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' : $store.state.pageColor + ' lighten-6 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' }"
            :viva="openDia" xs="dialog" width="500" :overlayZIndex="5" no-click-animation persistent>
            <template #title>
                <g-falcon-title @close-falcon="openDia = false" />
            </template>
            <div class="p-4 flex flex-col gap-10 relative">
                <g-logo :icon="$s.dark ? '../New_Project.png' : '../New_Project_4.png'" iconWidth="190px" />

                <!-- Step 1: Phone Number Input for Login -->
                <s-form v-if="authStep === 1" color="transparent" xs="block" @submit="submitLogin" ref="form" noActions>
                    <g-text data="برای ورود شماره تلفن خود را وارد کنید." />
                    <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl" type="number"
                        v-model="phoneNumber" :label="$t('phone')" validations="required|mobile"></s-text-field>

                    <!-- Display error message if phone number not found -->
                    <div v-if="phoneNotFound" class="text-red-500 mt-2 text-sm">
                        شماره موبایل یافت نشد. لطفاً از لینک زیر ثبت‌ نام کنید.
                    </div>

                    <!-- Link to Register if not registered -->
                    <div class="flex gap-1 items-center mt-4">
                        <g-text data="هنوز عضو نیستی؟" />
                        <div class="linkColor cursor-pointer" @click="openRegisterDialog">
                            همین حالا ثبت نام کن
                        </div>
                    </div>
                    <template v-slot:actions>
                        <div class="!p-2 w-full">
                            <s-btn aria-label="sub" @click="submitLogin" rounded="pill" large class="w-full"
                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                <g-text :data="$l({ en: 'submit', fa: 'ثبت' })" />
                            </s-btn>
                        </div>
                    </template>
                </s-form>

                <!-- Step 2: OTP Input for Login -->
                <s-form v-if="authStep === 2" color="transparent" xs="block" @submit="submitLoginOtp" ref="formOtp"
                    noActions>
                    <div class="text-green-600 mb-4">
                        پیامک حاوی کد تایید به شماره {{ phoneNumber }} ارسال شد.
                    </div>
                    <s-otp-input v-model="otp" :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                        :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" dir="ltr"
                        :length="length"></s-otp-input>
                    <div class="flex justify-center w-full mt-4">
                        <div v-if="timer === 0" class="font-bold text-xl cursor-pointer" @click="requestNewOtp">
                            <g-text data="ارسال مجدد" />
                        </div>
                        <g-text v-else class="font-bold text-xl">
                            {{ timerFormatted }}
                        </g-text>
                    </div>
                    <template v-slot:actions>
                        <v-row class="!p-2">
                            <s-col md="6" sm="6">
                                <s-btn :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" outlined
                                    @click="editPhone" rounded="pill" large class="w-full">
                                    <g-text :data="$t('edit-phone')" />
                                </s-btn>
                            </s-col>
                            <s-col md="6" sm="6">
                                <s-btn :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" aria-label="sub"
                                    @click="submitLoginOtp" rounded="pill" large class="w-full" :disabled="!isActive">
                                    <g-text :data="$l({ en: 'submit', fa: 'ثبت' })" />
                                </s-btn>
                            </s-col>
                        </v-row>
                    </template>
                </s-form>
            </div>
        </s-falcon>

        <!-- Register Dialog -->
        <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }"
            :sw-options="{ childClass: $s.dark ? 'cyan darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' : $store.state.pageColor + ' lighten-6 md:!overflow-y-hidden !overflow-y-auto !rounded-t-lg md:!rounded-none' }"
            :viva="openRegisterDia" xs="dialog" width="500" :overlayZIndex="5" no-click-animation persistent>
            <template #title>
                <g-falcon-title @close-falcon="openRegisterDia = false" />
            </template>
            <div class="px-4 pb-2 flex flex-col gap-10 relative">
                <!-- Step 1: Registration Form -->
                <s-form v-if="registerStep === 1" color="transparent" xs="block" @submit="submitRegister"
                    ref="registerForm" noActions>
                    <g-text data="ثبت نام کاربر جدید" />
                    <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl"
                        v-model="registerData.name" label="نام و نام خانوادگی" validations="required" />
                    <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl" type="number"
                        v-model="registerData.national_id" label="کد ملی" validations="required" />
                    <s-text-field :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl"
                        v-model="registerData.phone" :label="$t('phone')" type="number" validations="required|mobile" />
                    <s-textarea :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" rounded="xl"
                        v-model="registerData.address" label="آدرس" validations="required" />
                    <template v-slot:actions>
                        <div class="!p-2 w-full">
                            <s-btn aria-label="register" @click="submitRegister" rounded="pill" large class="w-full"
                                :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                <g-text :data="$l({ en: 'register', fa: 'ثبت نام' })" />
                            </s-btn>
                        </div>
                    </template>
                </s-form>

                <!-- Step 2: OTP Form for Register -->
                <s-form v-if="registerStep === 2" color="transparent" xs="block" @submit="submitRegisterOtp"
                    ref="formOtpRegister" noActions>
                    <div class="text-green-600 mb-4">
                        پیامک حاوی کد تایید به شماره {{ registerData.phone }} ارسال شد.
                    </div>
                    <s-otp-input v-model="otp" :background-color="$s.dark ? 'cyan darken-4' : 'yellow lighten-4'"
                        :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" dir="ltr"
                        :length="length"></s-otp-input>
                    <div class="flex justify-center w-full mt-4">
                        <div v-if="timer === 0" class="font-bold text-xl cursor-pointer" @click="requestNewOtpRegister">
                            <g-text data="ارسال مجدد" />
                        </div>
                        <g-text v-else class="font-bold text-xl">
                            {{ timerFormatted }}
                        </g-text>
                    </div>
                    <template v-slot:actions>
                        <s-btn :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor" aria-label="register"
                            @click="submitRegisterOtp" rounded="pill" large class="w-full">
                            <g-text :data="$l({ en: 'submit', fa: 'ثبت' })" />
                        </s-btn>
                    </template>
                </s-form>
            </div>
        </s-falcon>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openDia: false,
            openRegisterDia: false,
            phoneNumber: null,
            otp: '',
            length: 6,
            registerData: {
                name: '',
                phone: '',
                national_id: '',
                address: ''
            },
            registerStep: 1,
            timer: 120,
            interval: null,
            phoneNotFound: false
        };
    },

    computed: {
        authStep() {
            return this.$store.state?.auth?.step || 1;
        },
        isActive() {
            return this.otp.length === this.length;
        },
        authButtonText() {
            if (this.$store.getters.isLoggedIn && this.$store.state.auth.userName) {
                return this.$store.state.auth.userName;
            }
            return this.$l({ en: 'Login / Register', fa: 'ورود / ثبت نام' });
        },
        timerFormatted() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    },

    methods: {
        handleAuthButtonClick() {
            if (this.$store.getters.isLoggedIn) {
                this.$router.push('/profile');
            } else {
                this.openDia = true;
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
        async requestNewOtp() {
            this.timer = 120;
            this.startTimer();
            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/request-new-otp/?phone_number=${this.phoneNumber}`);
                if (response.status !== 200) {
                    this.$store.commit('setFailSnackbar', { message: 'Failed to request new OTP.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Error requesting new OTP. Please try again.' });
            }
        },
        async requestNewOtpRegister() {
            this.timer = 120;
            this.startTimer();
            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/request-new-otp-register/?phone_number=${this.registerData.phone}`);
                if (response.status !== 200) {
                    this.$store.commit('setFailSnackbar', { message: 'Failed to request new OTP for registration.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Error requesting new OTP for registration. Please try again.' });
            }
        },
        async submitLogin() {
            if (!this.phoneNumber) {
                this.$store.commit('setFailSnackbar', { message: 'Please enter a valid phone number.' });
                return;
            }
            try {
                const response = await this.$axios.get(`https://warranty.liara.run/api-auth/login/?phone_number=${this.phoneNumber}`);
                if (response.status === 200) {
                    this.$store.commit('setAuthPhone', this.phoneNumber);
                    this.$store.commit('setAuthStep', 2);
                    this.startTimer();
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
                    this.$store.commit('setFailSnackbar', { message: 'Failed to request OTP. Please try again.' });
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
                    this.$store.commit('setAuthToken', { token: access, name: access });
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
            if (!this.registerData.name || !this.registerData.phone || !this.registerData.national_id || !this.registerData.address) {
                this.$store.commit('setFailSnackbar', { message: 'Please fill in all required fields.' });
                return;
            }
            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/register/', {
                    full_name: this.registerData.name,
                    phone_number: this.registerData.phone,
                    national_id: this.registerData.national_id,
                    address: this.registerData.address
                });
                if (response.status === 200 || response.status === 201) {
                    this.registerStep = 2;
                    this.startTimer();
                    this.$store.commit('setSuccessSnackbar', { message: `پیامک حاوی کد تایید به شماره ${this.registerData.phone} ارسال شد.` });
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Unexpected server response.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Registration failed. Please try again.' });
            }
        },
        async submitRegisterOtp() {
            try {
                const response = await this.$axios.post('https://warranty.liara.run/api-auth/register-otp/', {
                    phone_number: this.registerData.phone,
                    otp: this.otp
                });
                if (response.status === 200) {
                    const { access } = response.data;
                    this.$store.commit('setAuthToken', { token: access, name: this.registerData.phone });
                    this.$router.push('/warranty');
                } else {
                    this.$store.commit('setFailSnackbar', { message: 'Invalid OTP. Please try again.' });
                }
            } catch (error) {
                this.$store.commit('setFailSnackbar', { message: 'Failed to verify OTP. Please try again.' });
            }
        },
        editPhone() {
            this.otp = '';
            this.$store.commit('setAuthStep', 1);
        },
        openRegisterDialog() {
            this.openDia = false;
            this.openRegisterDia = true;
        }
    },
    watch: {
        timer(newValue) {
            if (newValue === 0) {
                clearInterval(this.interval);
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>

<style lang="scss">
.v-otp-input .v-input {
    margin: 0;
    flex: 1 0 32px;
    max-width: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 24px;
}

.linkColor {
    color: #8a98e6 !important;
}
</style>