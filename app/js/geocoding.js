'use strict';

const Geocoding = {
    initialize() {
        this.geoCoder = new google.maps.Geocoder();
    },

    setPosition(cb) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb, this.failurePosition);
        }
    },

    getUserDetails(position, callback) {
        let {coords} = position;
        let place = new google.maps.LatLng(coords.latitude, coords.longitude);

        this.geoCoder.geocode({
            'latLng': place
        }, (res, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                this._city = this.findCity(res);
                callback(this._city);
            }
        });
    },

    findCity(data) {
        return data.map(function(o) {
            return o;
        }).filter((a) => {
            return a.types.indexOf('administrative_area_level_1') > -1;
        }).map((c) => {
            return c.formatted_address;
        }).reduce((city) => {
            return city;
        });
    }
};

export default Geocoding;
