<template>
    <div>
        <s-falcon :overlay="{ parentClass: 'backdrop-blur-xl' }"
            :sw-options="{ childClass: $s.dark ? $store.state.pageColor + ' darken-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-3xl md:!rounded-none' : $store.state.pageColor + ' lighten-5 md:!overflow-y-hidden !overflow-y-auto !rounded-t-3xl md:!rounded-none' }"
            :viva.sync="applyForm" xs="bottom-sheet" sm="dialog" width="900">
            <template #title>
                <g-falcon-title :title="title" @close-falcon="handleCloseFalcon" />
            </template>
            <div class="w-full">
                <div class="w-full h-full !px-3 md:!px-10">
                    <v-form ref="commentForm" lazy-validation>
                        <v-row>
                            <s-text-field v-model="form.attributes.name" half :label="$t('name')"
                                validations="required"></s-text-field>
                            <s-text-field v-model="form.attributes.last_name" half :label="$t('family')"
                                validations="required"></s-text-field>
                            <s-text-field v-model="form.attributes.email" half :label="$t('email')"
                                validations="required|email"></s-text-field>
                            <s-text-field v-model="form.attributes.phone" half :label="$t('phone_number')"
                                validations="required|mobile"></s-text-field>
                            <s-textarea v-model="form.attributes.message" outlined rows="4" :label="$t('message')"
                                validations="required"></s-textarea>
                            <s-col v-if="!product">
                                <div>
                                    {{ $l({ en: 'CV', fa: 'رزومه' }) }}
                                    <span class="text-xs">(PDF, 5MB)</span>
                                </div>
                                <file-collection-uploader ref="uploader" types="application/pdf" :instant-upload="false"
                                    :upload-url="`${$config.CLIENT_API_URL}/producer/${model}/${formId}/files/attachment`"
                                    :size="5000000" @update="close" :labelIdle="$l(fileLabels)" />
                            </s-col>
                        </v-row>
                    </v-form>
                </div>
            </div>
            <div class="p-3">
                <s-btn aria-label="submit" :color="$store.state.pageColor + ' darken-4'" rounded="pill" large
                    class="px-8 !h-12 white--text" :loading="isLoading" @click="submit">{{ $t('submit')
                    }}</s-btn>
                <s-btn aria-label="exit"
                    :color="$s.dark ? $store.state.pageColor + ' lighten-4' : $store.state.pageColor + ' darken-4'"
                    rounded="pill" large @click="applyForm = !applyForm" text class="!h-12 px-8">
                    {{ $t('cancel') }}
                </s-btn>
            </div>
        </s-falcon>
        <s-btn aria-label="apply form" @click="applyForm = !applyForm" :disabled="!disable"
            :color="$s.dark ? $store.state.pageColor + ' lighten-1' : $store.state.pageColor + ' darken-4'"
            rounded="pill" large>
            <div class="white--text">
                {{ $t(`${btnTitle}`) }}
            </div>
        </s-btn>
    </div>
</template>

<script>
export default {
    name: 'GFormApply',

    props: {
        btnTitle: {
            type: String,
            default: 'apply_now'
        },

        title: String,

        disable: Boolean,

        product: Boolean,

        id: {
            type: Number
        },

        idName: {
            type: String,
            default: 'career_id'
        },

        model: {
            type: String,
            default: 'career-submissions'
        }
    },

    data() {
        return {
            applyForm: false,
            isLoading: false,
            form: {
                attributes: {
                    name: null,
                    email: null,
                    phone: null,
                    last_name: null,
                    message: null,
                    [this.idName]: null
                }
            },
            formId: null,
            fileLabels: {
                fa: "برای بارگذاری کلیک کنید یا فایل خود را در این قسمت رها کنید",
                en: "Click to upload or drop your file here",
            }
        }
    },
    methods: {
        submit() {
            this.isLoading = true
            this.$api.save({ model: this.model, payload: this.$_.merge({}, this.form, { attributes: { [this.idName]: this.id } }) })
                .then(res => {
                    this.form = { attributes: { name: null, email: null, phone: null, last_name: null, message: null } }
                    let files = this.$refs.uploader.instance.getFiles()
                    if (files?.length) {
                        this.formId = res.data.data.id
                        this.$refs.uploader.instance.processFiles(files)
                    } else {
                        this.close()
                    }
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

        close() {
            this.$store.commit('setSuccessSnackbar', { message: this.$t('success_snackbar') })
            this.$refs.commentForm.resetValidation()
            this.applyForm = false
            this.formId = null
            this.form = {
                attributes: {
                    name: null,
                    email: null,
                    phone: null,
                    last_name: null,
                    message: null
                }
            }
        },

        handleCloseFalcon() {
            this.applyForm = false;
        }
    }
}
</script>

<style lang="scss">
.v-application--is-ltr .v-input__prepend-outer {
    display: none !important;
}

.v-dialog {
    border-radius: 28px !important;
}
</style>