import API from '~/api.js';

export const state = () => ({
    tabletWidth: null,
    mobileWidth: null,
    currentPopup: null,
    userToken: '',
    history: null,
    drawRange: null,
    drawResult: null,
    introComplete: false,
    memberID: ''
});

export const mutations = {
    updateDevice (state, payload) {
        state[payload.deviceType + 'Width'] = payload.value;
    },
    setCurrentPopup (state, payload) {
        state.currentPopup = payload;
    },
    setUserToken (state, payload) {
        state.userToken = payload;
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
    },
    setMemberID (state, payload) {
        state.memberID = payload;
    }
};

export const actions = {
    async getHistory ({ commit }) {
        commit('setHistory', null);
        const form = new FormData();
        form.append('_user_token', this._vm.$Cookies.get('_user_token'));
        const { data } = await this.$axios({
            method: API.history.method,
            url: API.history.url,
            data: form
        });
        commit('setHistory', data);
    },
    async getDrawRange ({ commit }) {
        commit('setDrawRange', null);
        const form = new FormData();
        form.append('_user_token', this._vm.$Cookies.get('_user_token'));
        const { data } = await this.$axios({
            method: API.drawRange.method,
            url: API.drawRange.url,
            data: form
        });
        commit('setDrawRange', data);
    },
    async share (context, payload) {
        const form = new FormData();
        form.append('fb', payload);
        form.append('_user_token', this._vm.$Cookies.get('_user_token'));
        await this.$axios({
            method: API.share.method,
            url: API.share.url,
            data: form
        });
    },
    async draw ({ commit }) {
        commit('setDrawResult', null);
        const form = new FormData();
        form.append('_user_token', this._vm.$Cookies.get('_user_token'));
        const { data } = await this.$axios({
            method: API.draw.method,
            url: API.draw.url,
            data: form
        });
        commit('setDrawResult', data);
    },
    async getMemberID ({ commit }) {
        const form = new FormData();
        form.append('_user_token', this._vm.$Cookies.get('_user_token'));
        const { data } = await this.$axios({
            method: API.memberID.method,
            url: API.memberID.url,
            data: form
        });
        commit('setMemberID', data);
    }
};
