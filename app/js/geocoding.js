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

    getUserDetails(position, callback, error) {
        let {coords} = position;
        let city;
        let place = new google.maps.LatLng(coords.latitude, coords.longitude);

        this.geoCoder.geocode({
            'latLng': place
        }, (res, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                city = this.findCity(res);
                callback(city);
            } else {
                callback(error);
            }
        });
    },

    findCity(data) {
        return data.map(function(o) {
            return o;
        }).filter((a) => {
            return a.types.indexOf('locality') > -1;
        }).map((c) => {
            return c.formatted_address;
        }).reduce((city) => {
            return city;
        });
    }
};

export default Geocoding;
