<template>
    <div :class="$s.dark ? $store.state.pageColor + ' darken-4' : $store.state.pageColor + ' lighten-5'" class="h-full">
        <div class="ltr:pl-3 rtl:pr-3 mb-4">
            <g-text class="font-extrabold text-2xl" :data="$t('lets-build')" />
            <g-text class="mt-1 mb-3 text-base" :data="$t('please-fill')" />
        </div>
        <s-form xs="block" no-actions
            :swOptions="{ parentClass: $s.dark ? $store.state.pageColor + ' darken-4' : $store.state.pageColor + ' lighten-5 !rounded-none' }"
            :submit-label="$t('submit')" @submit="submit" ref="form">
            <template v-slot:actions>
                <div class="p-2 flex justify-end">
                    <div>
                        <s-btn @click="click" rounded="pill" style="background-color: #171a21 !important;">{{ $t('submit')
                        }}</s-btn>
                    </div>
                </div>
            </template>
            <div class="flex flex-wrap w-full">
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3">
                        <g-text class="text-xl font-black" :data="$t('name') + ' *'" />
                    </div>
                    <s-text-field v-model="form.attributes.name" dense flat :placeholder="$t('name') + ' *'"
                        validations="required" :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'"
                        rounded="none" />
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="text-xl font-black" :data="$t('email') + ' *'" />
                    </div>
                    <s-text-field v-model="form.attributes.email" dense flat :placeholder="$t('email') + ' *'"
                        validations="required|email" :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'"
                        rounded="none" />
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="text-xl font-black" :data="$t('phone') + ' *'" />
                    </div>
                    <s-text-field dense flat v-model="form.attributes.phone" :placeholder="$t('phone') + ' *'"
                        validations="required|mobile" :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'"
                        rounded="none" />
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="text-xl font-black" :data="$t('company-name') + ' *'" />
                    </div>
                    <s-text-field dense flat v-model="form.attributes.compony" :placeholder="$t('company-name') + ' *'"
                        validations="required" :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'"
                        rounded="none" />
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="text-xl font-black" :data="$t('services')" />
                    </div>
                    <s-select persistent-hint v-model="form.attributes.services"
                        :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'" :items="services" item-text="labels"
                        item-value="state" :placeholder="$t('services')" validations="required" outlined></s-select>
                </div>
                <div class="md:w-1/2 w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="text-xl font-black" :data="$t('budget')" />
                    </div>
                    <s-select persistent-hint v-model="form.attributes.budget" item-text="labels" item-value="state"
                        :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'" :items="budget"
                        :placeholder="$t('budget')" validations="required" outlined></s-select>
                </div>
                <div class="w-full">
                    <div class="ltr:pl-3 rtl:pr-3 pt-1">
                        <g-text class="font-semibold text-lg" :data="$t('project')" />
                        <g-text class="mt-1 mb-3" :data="$t('briefly')" />
                    </div>
                    <s-textarea flat v-model="form.attributes.description" :placeholder="$t('project')"
                        validations="required" :background-color="$s.dark ? $store.state.pageColor + ' darken-3' : 'white'"
                        rounded="none" />
                </div>
            </div>
        </s-form>
    </div>
</template>
<script>
export default {
    name: 'GFormSubmission',

    data() {
        return {
            services: [
                { state: "design-development", labels: this.$t('web') },
                { state: "design-development-seo", labels: this.$t('development') },
                { state: "seo", labels: this.$t('seo') },
                { state: "other", labels: this.$t('other') },
            ],
            budget: [
                { state: "99m", labels: this.$t('99') },
                { state: "100-200", labels: this.$t('100') },
                { state: "200-500", labels: this.$t('200') },
                { state: "+500", labels: this.$t('500') },
                { state: "talk", labels: this.$t('talk') },
            ],
            form: {
                attributes: {
                    name: null,
                    email: null,
                    phone: null,
                    description: null,
                    compony: null,
                    budget: null,
                    services: null
                }
            }
        }
    },

    methods: {
        click(e) {
            this.$refs.form.submitForm(e)
        },

        submit() {
            this.$api.save({ model: 'submissions', payload: this.$_.merge({}, this.form) })
                .then(res => {
                    this.form = { attributes: { name: null, email: null, phone: null, description: null, compony: null, budget: null, services: null } }

                    this.$store.commit('setSuccessSnackbar', { message: this.$t('success_sub') })
                    this.$refs.form.$refs.form.resetValidation()
                })
                .catch(error => {
                    this.$store.commit('setFailSnackbar', { message: this.$t('fail_sub') })
                })
        }
    }
}
</script>