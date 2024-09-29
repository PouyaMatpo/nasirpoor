<template>
    <div>
        <div class="w-full p-10">
            <!-- 
                use GText
             -->
            <div class="pb-5 text-lg font-black">
                Title
            </div>
            <div class="w-full h-full">
                <s-form xs="block" :submit-label="$t('submit')" @submit="submit" ref="form">
                    <v-row>
                        <s-text-field v-model="form.attributes.name" half :label="$t('name_family')"
                            validations="required"></s-text-field>
                        <s-autocomplete v-model="form.attributes.country_id" :label="$t('country')"
                            :items="countryItems" hide-no-data :search-input.sync="countrySearchInput" item-value="id"
                            :item-text="generateText" :loading="countryLoading"
                            @keyup="countrySearchInput != '' && countrySearch(countrySearchInput)"
                            @focus="!countryItems.length && countrySearch('')" validations="required" half />
                        <s-text-field v-model="form.attributes.city" half :label="$t('city')"
                            validations="required"></s-text-field>
                        <s-text-field v-model="form.attributes.address" half :label="$t('address')"
                            validations="required"></s-text-field>
                        <s-text-field v-model="form.attributes.mobile" half :label="$t('phone_number')"
                            validations="required|mobile"></s-text-field>
                        <s-text-field v-model="form.attributes.email" half :label="$t('email')"
                            validations="required|email"></s-text-field>
                        <s-text-field v-model="form.attributes.product_name" half :label="$t('pname')"
                            validations="required"></s-text-field>
                        <s-text-field v-model="form.attributes.serial_number" half :label="$t('serial')"
                            validations="required"></s-text-field>
                        <s-text-field v-model="form.attributes.manufacture_date" half :label="$t('date')"
                            validations="required"></s-text-field>
                        <s-select v-model="form.attributes.type" half :items="select" :label="$t('classification')"
                            validations="required" outlined></s-select>
                        <s-textarea v-model="form.attributes.description" outlined rows="4"
                            :label="$t('description_comp')" validations="required"></s-textarea>
                    </v-row>
                </s-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GComplaint',

    data() {
        return {
            select: [this.$t('damage'), this.$t('defective'), this.$t('delay'), this.$t('etc'), this.$t('expensive'), this.$t('product')],
            form: {
                attributes: {
                    name: null,
                    email: null,
                    mobile: null,
                    description: null,
                    city: null,
                    address: null,
                    serial_number: null,
                    manufacture_date: null,
                    product_name: null,
                    type: null,
                }
            },
            formId: null,
            countryItems: [],
            countrySearchInput: '',
            countryLoading: false
        }
    },
    methods: {
        submit() {
            this.isLoading = true
            this.$api.save({ model: 'complaints', payload: this.$_.merge({}, this.form) })
                .then(res => {
                    this.form = {
                        attributes: {
                            name: null,
                            email: null,
                            mobile: null,
                            description: null,
                            city: null,
                            address: null,
                            serial_number: null,
                            manufacture_date: null,
                            product_name: null,
                            type: null,
                        }
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

        countrySearch(searchValue) {
            this.countryLoading = true
            this.$axios.get(`${this.$config.CLIENT_API_URL}/query/countries?mode=search&search=${searchValue}`)
                .then(res => {
                    this.countryItems = res.data
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    this.countryLoading = false
                })
        },

        generateText(item) {
            return item.labels ? this.$l(item.labels) : (item.label || item.id)
        }
    }
}
</script>