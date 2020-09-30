import API from '~/api.js';

export const state = () => ({
    tabletWidth: null,
    mobileWidth: null,
    isReady: false,
    loading: false,
    currentPopup: null,
    userToken: '',
    history: null,
    drawRange: null,
    drawResult: null
});

export const mutations = {
    updateDevice (state, payload) {
        state[payload.deviceType + 'Width'] = payload.value;
    },
    setReady (state) {
        state.isReady = true;
    },
    setCurrentPopup (state, payload) {
        state.currentPopup = payload;
    },
    setUserToken (state, payload) {
        state.userToken = payload;
    },
    setLoading (state, payload) {
        state.loading = payload;
    },
    setHistory (state, payload) {
        state.history = payload;
    },
    setDrawRange (state, payload) {
        state.drawRange = payload;
    },
    setDrawResult (state, payload) {
        state.drawResult = payload;
    }
};

export const actions = {
    async getHistory ({ commit }) {
        try {
            commit('setHistory', null);
            const { data } = await this.$axios({
                method: API.history.method,
                url: API.history.url
            });
            commit('setHistory', data);
        }
        catch (error) {
            console.error(error.toJSON());
            this._vm.$nuxt.error({ statusCode: 500, message: '網路連線錯誤，請稍後再試！' });
        }
    },
    async getDrawRange ({ commit }) {
        try {
            commit('setDrawRange', null);
            const { data } = await this.$axios({
                method: API.drawRange.method,
                url: API.drawRange.url
            });
            commit('setDrawRange', data);
        }
        catch (error) {
            console.error(error.toJSON());
            this._vm.$nuxt.error({ statusCode: 500, message: '網路連線錯誤，請稍後再試！' });
        }
    },
    async share () {
        try {
            const { data } = await this.$axios({
                method: API.share.method,
                url: API.share.url
            });
        }
        catch (error) {
            console.error(error.toJSON());
            this._vm.$nuxt.error({ statusCode: 500, message: '網路連線錯誤，請稍後再試！' });
        }
    },
    async draw ({ commit }) {
        try {
            const { data } = await this.$axios({
                method: API.draw.method,
                url: API.draw.url
            });
            commit('setDrawResult', data);
        }
        catch (error) {
            console.error(error.toJSON());
            this._vm.$nuxt.error({ statusCode: 500, message: '網路連線錯誤，請稍後再試！' });
        }
    },
    preloadImg (context, imgs) {
        return new Promise(resolve => {
            //  if empty array, do resolve
            if (!imgs.length) resolve();

            let loaded = 0;
            for (let i = 0; i < imgs.length; i++) {
                const element = imgs[i];

                // if not image, do break
                if (!element) {
                    loaded++;
                    break;
                }

                const img = document.createElement('IMG');
                img.src = element;
                img.onload = () => {
                    loaded++;
                    if (loaded === imgs.length) {
                        resolve();
                    }
                };
            }
        });
    }
};
