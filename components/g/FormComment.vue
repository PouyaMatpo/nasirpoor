<template>
    <div class="w-full h-full">
        <s-form rounded="pill" no-actions xs="block" :submit-label="$t('submit')" @submit="submit" ref="form"
            :swOptions="{ parentClass: $s.dark ? $store.state.pageColor + ' darken-6 !rounded-3xl p-2' : $store.state.pageColor + ' lighten-5 !rounded-3xl p-2' }">
            <template v-slot:actions>
                <div class="p-2 flex justify-end w-full">
                    <div @click="click" class="w-full">
                        <s-btn :color="$store.state.pageColor" rounded="pill" class="w-full !h-12">
                            {{ $t('submit') }}
                        </s-btn>
                    </div>
                </div>
            </template>
            <div class="px-2 py-1">
                <g-lotties-popup @lottieSelected="handleLottieSelected" />
            </div>
            <s-text-field v-model="form.attributes.name" :label="$t('name')" validations="required" />
            <s-text-field v-model="form.attributes.email" :label="$t('email')" validations="required|email" />
            <s-text-field v-model="form.attributes.website" :label="$t('web')" />
            <s-textarea v-model="form.attributes.comment" :label="$t('comment')" validations="required" />
        </s-form>
    </div>
</template>

<script>
export default {
    name: 'GFormComment',

    props: {
        id: {
            type: Number
        },

        idName: {
            type: String,
            default: 'post_id'
        },

        model: {
            type: String,
            default: 'post-comments'
        }
    },

    data() {
        return {
            form: {
                attributes: {
                    name: null,
                    email: null,
                    comment: null,
                    website: null,
                    emoji: this.lottie,
                    [this.idName]: null
                }
            },
            lottie: null
        }
    },

    methods: {
        click(e) {
            this.$refs.form.submitForm(e)
        },
        submit() {
            this.isLoading = true
            this.$api.save({ model: this.model, payload: this.$_.merge({}, this.form, { attributes: { [this.idName]: this.id } }) })
                .then(res => {
                    this.form = { attributes: { name: null, email: null, emoji: this.lottie, website: null, comment: null, [this.idName]: null } }

                    this.$store.commit('setSuccessSnackbar', { message: this.$t('comment-form.success') })
                    this.$refs.form.$refs.form.resetValidation()
                })
                .catch(error => {
                    this.$store.commit('setFailSnackbar', { message: this.$t('comment-form.fail') })
                    if (navigator.vibrate)
                        navigator.vibrate([1000]);
                })
                .finally(e => {
                    this.isLoading = false
                })
        },

        handleLottieSelected(selectedLottie) {
            this.lottie = selectedLottie;
            this.form.attributes.emoji = selectedLottie;
        }
    }
}

</script>