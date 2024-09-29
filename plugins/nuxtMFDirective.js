import Vue from 'vue';

export default () => {
    Vue.directive('drawer', {
        bind: function (el, binding, vnode) {
            const store = vnode.context.$store
            if (binding.arg) {
                if (el.id == 'classInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerClasses', el.querySelector('#classInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).className = el.querySelector('#classInput').value
                    })
                } else if (el.id == 'styleInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerStyles', el.querySelector('#styleInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).style = el.querySelector('#styleInput').value
                    })
                } else if (el.id == 'propInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerProps', el.querySelector('#propInput').value)
                        el.querySelector('#propInput').value.split(',').forEach(element => {
                            if (element.split('=').length == 2) {
                                el.querySelector('#propInput').value.split('').forEach(letter => {
                                    if (letter == ',')
                                        document.querySelector(`#${store.state.drawer.target}`).setAttribute(element.split('=')[0], element.split('=')[1])
                                })
                            }
                        });
                    })
                } else if (el.id == 'ParentClassInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerParentClass', el.querySelector('#ParentClassInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).setAttribute('options', { parentClass: el.querySelector('#ParentClassInput').value })
                    })
                } else if (el.id == 'ChildClassInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerClasses', el.querySelector('#ChildClassInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).setAttribute(element.split('=')[0], element.split('=')[1])
                    })
                } else if (el.id == 'ParentStyleInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerClasses', el.querySelector('#ParentStyleInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).setAttribute(element.split('=')[0], element.split('=')[1])
                    })
                } else if (el.id == 'ChildStyleInput') {
                    el.addEventListener('input', () => {
                        store.commit('setDrawerClasses', el.querySelector('#ChildStyleInput').value)
                        document.querySelector(`#${store.state.drawer.target}`).setAttribute(element.split('=')[0], element.split('=')[1])
                    })
                }
            } else {
                let styles
                let props = []
                for (let prop of el.attributes) {
                    if (prop.name == 'style')
                        styles = prop.value

                }
                for (let prop of el.attributes) {
                    if (prop.name != 'id' && prop.name != 'class' && prop.name != 'style')
                        props.push(`${prop.name}=${prop.value}`)
                }
                el.addEventListener('click', () => {
                    store.commit('setDrawerClasses', el.classList.value)
                    store.commit('setDrawerStyles', styles)
                    store.commit('setDrawerProps', props.toString())
                    store.commit('setDrawerTarget', binding.value)
                })
            }
        },
    })
}