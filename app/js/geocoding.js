'use strict';

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
        console.log(err, 'Failed to get user location');
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

        return city;
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
    },

    geocodeAddress(address = 'porto') {
        console.log(address);

        this.geoCoder.geocode({'address': address}, function(res, status) {

        if (status === google.maps.GeocoderStatus.OK) {
            console.log(res[0].formatted_address);
          //resultsMap.setCenter(results[0].geometry.location);
            //var marker = new google.maps.Marker({
            //map: resultsMap,
            //position: results[0].geometry.location
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
};

export default Geocoding;
