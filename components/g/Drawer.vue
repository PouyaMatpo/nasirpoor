<template>
    <s-falcon app xs="drawer" :sw-options="{ parentClass: 'white w-full', childClass: 'w-full' }" width="300px" no-border
        class="border-none" id="drawerSection">
        <div class="px-3 pt-3 font-black text-lg">Classes:</div>
        <s-text-field v-drawer:input id="classInput" v-model="classes"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Styles:</div>
        <s-text-field v-drawer:input id="styleInput" v-model="styles"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Props:</div>
        <s-text-field v-drawer:input id="propInput" v-model="props"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Parent Class:</div>
        <s-text-field v-drawer:input id="ParentClassInput" v-model="ParentClass"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Child Class:</div>
        <s-text-field v-drawer:input id="ChildClassInput" v-model="ChildClass"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Parent Style:</div>
        <s-text-field v-drawer:input id="ParentStyleInput" v-model="ParentStyle"
            :disabled="$store.state.drawer.target == '' ? true : false" />
        <div class="px-3 pt-3 font-black text-lg">Child Style:</div>
        <s-text-field v-drawer:input id="ChildStyleInput" v-model="ChildStyle"
            :disabled="$store.state.drawer.target == '' ? true : false" />
    </s-falcon>
</template>
<script>
export default {
    data() {
        return {
            classes: '',
            styles: '',
            props: '',
            ParentClass: '',
            ChildClass: '',
            ParentStyle: '',
            ChildStyle: '',
        }
    },

    mounted() {
        if (this.$store.state.drawer.classes) {
            this.classes = this.$store.state.drawer.classes
        }
        if (this.$store.state.drawer.styles) {
            this.styles = this.$store.state.drawer.styles
        }
        if (this.$store.state.drawer.props) {
            this.props = this.$store.state.drawer.props
        }
        if (this.$store.state.drawer.styles) {
            this.ParentClass = this.$store.state.drawer.ParentClass
        }
        if (this.$store.state.drawer.props) {
            this.ChildClass = this.$store.state.drawer.ChildClass
        }
        if (this.$store.state.drawer.styles) {
            this.ParentStyle = this.$store.state.drawer.ParentStyle
        }
        if (this.$store.state.drawer.props) {
            this.ChildStyle = this.$store.state.drawer.ChildStyle
        }
    },

    watch: {
        '$store.state.drawer.classes'() {
            this.classes = this.$store.state.drawer.classes
        },
        '$store.state.drawer.styles'() {
            this.styles = this.$store.state.drawer.styles
        },
        '$store.state.drawer.props'() {
            this.props = this.$store.state.drawer.props
        },
        '$store.state.drawer.ParentClass'() {
            this.ParentClass = this.$store.state.drawer.ParentClass
        },
        '$store.state.drawer.ChildClass'() {
            this.ChildClass = this.$store.state.drawer.ChildClass
        },
        '$store.state.drawer.ParentStyle'() {
            this.ParentStyle = this.$store.state.drawer.ParentStyle
        },
        '$store.state.drawer.ChildStyle'() {
            this.ChildStyle = this.$store.state.drawer.ChildStyle
        },
    }
}
</script>
<style lang="">
    
</style>