/* jshint devel:true */
'use strict';

let overlayEl = document.getElementById('location-overlay');

const Overlays = {
    open: () => {},
    close: () => {
        overlayEl.classList.add('is-closed');
    }
};

export default Overlays;
