/* jshint devel:true */
'use strict';

import Geocoding from '../geocoding';
import {transitionEvt} from '../helpers/animationEnd';

let element;
const tEvent = transitionEvt();

const SearchLocation = {
    onSubmit: (value, callback, updateCity) => {
        if (value) {
            Geocoding.geocodeAddress(value, callback, updateCity);
        }
    },

    promptSearch: (e) => {
        let inputElement = document.getElementById('find-location-input');
        element = document.getElementById('overlay-search');
        element.style.display = 'flex';
        inputElement.focus();
        inputElement.value = '';

        setTimeout(() => {
            element.classList.add('is-visible');
        }, 10);
    }
};

export default SearchLocation;
