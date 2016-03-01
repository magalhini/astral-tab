'use strict';

const LocalStorage = {
    setItem(id, value) {
        if (this.localStorage) {
            this.localStorage.setItem(id, JSON.stringify(value));
        }
    },

    deleteItem(id) {
        if (this.localStorage) {
            this.localStorage.setItem(id, null);
        }
    },

    getItem(id) {
        if (this.localStorage) {
            return JSON.parse(this.localStorage.getItem(id));
        }
    },

    isAvailable() {
        const has = 'localStorage' in window && window.localStorage !== null;
        this.localStorage = has ? window.localStorage : null;
    },

    init() {
        this.isAvailable();
    }
};

LocalStorage.init();

export default LocalStorage;
