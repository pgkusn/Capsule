import API from '~/api.js';

export const state = () => ({
    tabletWidth: null,
    mobileWidth: null,
    currentPopup: null,
    userID: '',
    username: '',
    history: null,
    drawRange: null,
    drawResult: null,
    introComplete: false
});

export const mutations = {
    updateDevice (state, payload) {
        state[payload.deviceType + 'Width'] = payload.value;
    },
    setCurrentPopup (state, payload) {
        state.currentPopup = payload;
    },
    setUserID (state, payload) {
        state.userID = payload;
    },
    setUsername (state, payload) {
        state.username = payload;
    },
    setHistory (state, payload) {
        state.history = payload;
    },
    setDrawRange (state, payload) {
        state.drawRange = payload;
    },
    setDrawResult (state, payload) {
        state.drawResult = payload;
    },
    setIntroComplete (state) {
        state.introComplete = true;
    }
};

export const actions = {
    async getHistory ({ state, commit }) {
        commit('setHistory', null);
        const form = new FormData();
        form.append('userID', state.userID);
        const { data } = await this.$axios({
            method: API.history.method,
            url: API.history.url,
            data: form
        });
        commit('setHistory', data);
    },
    async getDrawRange ({ state, commit }) {
        commit('setDrawRange', null);
        const form = new FormData();
        form.append('userID', state.userID);
        const { data } = await this.$axios({
            method: API.drawRange.method,
            url: API.drawRange.url,
            data: form
        });
        commit('setDrawRange', data);
    },
    async share ({ state }) {
        const form = new FormData();
        form.append('userID', state.userID);
        await this.$axios({
            method: API.share.method,
            url: API.share.url,
            data: form
        });
    },
    async draw ({ state, commit }) {
        commit('setDrawResult', null);
        const form = new FormData();
        form.append('userID', state.userID);
        const { data } = await this.$axios({
            method: API.draw.method,
            url: API.draw.url,
            data: form
        });
        commit('setDrawResult', data);
    }
};
