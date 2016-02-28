/* jshint devel:true */
'use strict';

const _each = (arr, cb) => {
    return Array.prototype.forEach.call(arr, (item) => {
        cb(item);
    });
};

const Overlays = {
    close: (event = null) => {
        let overlays = document.querySelectorAll('.overlay');

        if (event === null || event.keyCode === 27) {
            _each(overlays, (item) => {
                item.classList.remove('is-visible');
                // TODO: Remove timeout and use 'animationEnd' instead
                setTimeout(() => item.style.display = 'none', 400);
            });
        }
    }
};

export default Overlays;
