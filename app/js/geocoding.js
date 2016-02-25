'use strict';

import localStorage from './helpers/LocalStorage';

const Geocoding = {
    initialize() {
        this.geoCoder = new google.maps.Geocoder();
    },

    setPosition(cb) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cb, this.failed);
        }
    },

    failed(err) {
        const overlayError = document.querySelectorAll('.overlay')[0];
        const overlayBtn = document.querySelectorAll('.overlay-btn')[0];

        overlayBtn.addEventListener('click', Geocoding.retry);

        overlayError.style.display = 'flex';
        setTimeout(() => overlayError.classList.add('is-visible'), 5);
    },

    retry() {
        window.location.reload();
    },

    getUserDetails(position, callback, error) {
        let {coords} = position;
        let city;

        let previousLocation = localStorage.getItem('original-city');

        if (previousLocation) {
            city = this.findCity(previousLocation);
            callback(city);
            return city;
        }

        let place = new google.maps.LatLng(coords.latitude, coords.longitude);

        this.geoCoder.geocode({
            'latLng': place
        }, (res, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                console.info('Geocode: Got coordinates');
                city = this.findCity(res);
                callback(city);
                localStorage.setItem('original-city', res);
            } else {
                callback(error);
            }
        });

        return city;
    },

    findCity(data) {
        return data.map(function(o) {
            return o;
        }).filter((a) => {
            return a.types.indexOf('locality') > -1;
        }).map((c) => {;
            return c.formatted_address;
        }).reduce((city) => {
            return city;
        });
    },

    geocodeAddress(address, callback, updateCity) {
        this.geoCoder.geocode({'address': address}, function(res, status) {

        if (status === google.maps.GeocoderStatus.OK) {
            console.log('Geocode: from address');
            const location = res[0];
            const coordinates = {
                coords: {
                    latitude: location.geometry.location.lat(),
                    longitude: location.geometry.location.lng()
                }
            };

            const city = res[0].formatted_address;
            callback(coordinates);
            updateCity(city);

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
};

export default Geocoding;
