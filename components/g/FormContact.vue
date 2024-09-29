<template>
    <div class="w-full h-full">
        <s-form :color="color" xs="block" :submit-label="$t('submit')" @submit="submit" ref="form" noActions>
            <s-text-field rounded="lg" v-model="form.attributes.name" :label="$t('name')" validations="required" />
            <s-text-field rounded="lg" v-model="form.attributes.email" :label="$t('email')" validations="required|email" />
            <s-text-field rounded="lg" v-model="form.attributes.phone" :label="$t('phone')" validations="required|mobile" />
            <s-textarea v-model="form.attributes.message" :label="$t('comment')" validations="required" rounded="xl" />
            <template v-slot:actions>
                <div class="p-2 w-full">
                    <s-btn aria-label="sub" @click="click" rounded="pill" large class="w-full" color="primary">
                        <g-text color="white--text" :data="$l({ en: 'submit', fa: 'ثبت' })" />
                    </s-btn>
                </div>
            </template>
        </s-form>
    </div>
</template>

<script>
export default {
    name: 'GFormContact',

    props: {
        id: {
            type: Number
        },

        color: {
            type: String,
            default: 'primary'
        }
    },

    data() {
        return {
            form: {
                attributes: {
                    name: null,
                    email: null,
                    phone: null,
                    message: null,
                }
            }
        }
    },

    methods: {
        click(e) {
            this.$refs.form.submitForm(e)
        },

        submit() {
            this.isLoading = true
            this.$api.save({ model: 'contact-us', payload: this.$_.merge({}, this.form) })
                .then(res => {
                    this.form = { attributes: { name: null, email: null, phone: null, message: null } }

                    this.$store.commit('setSuccessSnackbar', { message: this.$t('comment-form.success') })
                    this.$refs.form.$refs.form.resetValidation()
                    this.$emit('submit');
                })
                .catch(error => {
                    this.$store.commit('setFailSnackbar', { message: this.$t('comment-form.fail') })
                    if (navigator.vibrate)
                        navigator.vibrate([1000]);
                })
                .finally(e => {
                    this.isLoading = false
                })
        }
    }
}
</script>