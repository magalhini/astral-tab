/* jshint devel:true */
'use strict';

let overlayEl = document.getElementById('location-overlay');

const Overlays = {
    open: () => {
        overlayEl.classList.remove('is-closed');
    },
    close: () => {
        overlayEl.classList.add('is-closed');
    }
};

export default Overlays;
