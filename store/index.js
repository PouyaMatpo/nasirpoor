export const state = () => ({
    configs: {},
    apiCache: {},
    snackbar: {},
    drawer: {
        target: '',
        classes: '',
        styles: '',
        props: null,
        ParentClass: '',
        ChildClass: '',
        ParentStyle: '',
        ChildStyle: '',
    },
    ActiveBtnIndex: 0,
    options: {
        color: 'red',
        gap: 'gap-6',
        round: 'rounded-2xl',
        width: 3,
        sticky: true
    },
    auth: {
        dialog: false,
        phone: '',
        otp: '',
        step: 1,
        timer: 120,
        id: null,
        isLoggedIn: false,
        token: null,
        userName: null // اطلاعات کاربر
    },
    pageColor: 'amber'
});

export const mutations = {
    setter(state, params) {
        Object.keys(params).map(k => state[k] = params[k])
    },
    colorManager(state, color) {
        state.pageColor = color
    },
    setSnackbar(state, snackbar) {
        state.snackbar = { 'isActive': true, ...snackbar }
    },
    setSuccessSnackbar(state, snackbar) {
        state.snackbar = { 'isActive': true, 'color': 'green darken-3', ...snackbar }
    },
    setFailSnackbar(state, snackbar) {
        state.snackbar = { 'isActive': true, 'color': 'red darken-3', ...snackbar }
    },
    setActiveBtnIndex(state, index) {
        state.ActiveBtnIndex = index;
    },
    setSnackbarToggle(state, snackbarToggle) {
        state.snackbar.isActive = snackbarToggle
    },

    setOptionsManager(state, payload) {
        console.log(payload.item, payload.type);
        state.options[payload.type] = payload.item
    },

    setDrawerClasses(state, classes) {
        state.drawer.classes = classes
    },

    setDrawerStyles(state, styles) {
        state.drawer.styles = styles
    },

    setDrawerProps(state, props) {
        state.drawer.props = props
    },

    setDrawerTarget(state, target) {
        state.drawer.target = target
    },

    setDrawerParentClass(state, ParentClass) {
        state.drawer.ParentClass = ParentClass
    },

    setDrawerChildClass(state, ChildClass) {
        state.drawer.ChildClass = ChildClass
    },

    setDrawerParentStyle(state, ParentStyle) {
        state.drawer.ParentStyle = ParentStyle
    },

    setDrawerChildStyle(state, ChildStyle) {
        state.drawer.ChildStyle = ChildStyle
    },

    setAuthPhone(state, phone) {
        state.auth.phone = phone
    },

    setAuthDialog(state, status) {
        state.auth.dialog = status
    },

    setAuthStep(state, step) {
        state.auth.step = step;
    },


    setAuthOtp(state, otp) {
        state.auth.otp = otp
    },

    setAuthTimer(state, timer) {
        state.auth.timer = timer
    },

    setAuthId(state, id) {
        state.auth.id = id
    },

    setAuthUser(state, user) {
        state.auth.user = user
    },

    setAuthToken(state, { token, user }) {
        if (token && user) {
            state.auth = {
                token: token,
                isLoggedIn: true,
                user
            }

            this.$cookies.set('token', token, { maxAge: 31556952, path: '/' })
        }
    },

    clearAuthToken(state) {
        state.auth.token = null;
        state.auth.isLoggedIn = false;
        state.auth.user = {};

        this.$cookies.remove('token')
    }
};

export const actions = {
    async nuxtServerInit({ commit, state }, { req, redirect }) {
        console.log('state', state);

        const token = this.$cookies.get('token')
        if (token) {
            await this.$axios.get('https://warranty.liara.run/api-auth/me/', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => commit('setAuthToken', { token, user: res.data }))
                .catch(err => commit('clearAuthToken'));

            if (!state.auth.isLoggedIn && req.originalUrl != '/') redirect('/');
        }
    }
}


export const getters = {
    isLoggedIn: (state) => {
        return state.auth.isLoggedIn;
    }
};