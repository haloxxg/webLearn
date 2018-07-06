import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '../utils/Tool';

Vue.use(Vuex)

const moduleA = {
    state: {
        name: "A"
    },
    mutations: {
        add(state) {
            state.name = 1;
        }
    },
}

const moduleB = {
    state: {
        name: "B"
    }
}

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        setState(state, playload) {
            state[playload.id] = playload.state;
        }
    },
    modules: {
        a: moduleA,
        b: moduleB
    }
})
