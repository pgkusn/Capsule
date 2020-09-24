import API from '~/api.js';

export const state = () => ({
    tabletWidth: null,
    mobileWidth: null,
    isReady: false,
    jsonData: null
});

export const mutations = {
    updateDevice (state, payload) {
        state[payload.deviceType + 'Width'] = payload.value;
    },
    setReady (state) {
        state.isReady = true;
    },
    setJsonData (state, payload) {
        state.jsonData = payload;
    }
};

export const actions = {
    async getJsonData ({ commit }) {
        try {
            const { data } = await this.$axios({
                method: API.getJsonData.method,
                url: API.getJsonData.url
            });
            commit('setJsonData', data);
        }
        catch (error) {
            console.error(error.toJSON());
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
