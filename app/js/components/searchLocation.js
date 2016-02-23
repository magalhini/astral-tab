/* jshint devel:true */
'use strict';

import Geocoding from '../geocoding';

const SearchLocation = {
    onSubmit: (value, callback, updateCity) => {
        Geocoding.geocodeAddress(value, callback, updateCity);
    }
};

export default SearchLocation;
