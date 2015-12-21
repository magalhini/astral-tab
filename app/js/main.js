/* jshint devel:true */

'use strict';

import Geocoding from './geocoding';
import SunCalc from 'suncalc';
import SunCalcHelper from './SunCalcHelper';
import TimeFormatter from './TimeFormatter';
import moment from 'moment';
import Elements from './config/Elements';
import Overlays from './components/overlays';

import MoonCalc from './MoonCalc.js';

let rightNow = new Date();   // Today!
let computedTimes = null;    // Calculated times based on position
let userPosition = null;     // User's coordinate
let currentCity;             // Geolocated user's city

function setUserDetails(city) {
    console.log(city);
    Elements.cityName.innerHTML = city || 'Finding your location...';
}

function setHours() {
    Elements.sunrise.innerHTML = SunCalcHelper.formatSunrise(computedTimes);
    Elements.sunset.innerHTML = SunCalcHelper.formatSunset(computedTimes);
    Elements.dawn.innerHTML = SunCalcHelper.formatDawn(computedTimes);
    Elements.dusk.innerHTML = SunCalcHelper.formatDusk(computedTimes);

    Elements.dawnTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.dawn);
    Elements.sunriseTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.sunrise);
    Elements.sunsetTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.sunset);
    Elements.duskTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.dusk);
}

function setMoonPhase(date = new Date()) {
    let moonphaseValue = SunCalcHelper.getMoonLumen(SunCalc, date).phase;

    Elements.moonPhaseName.innerHTML = MoonCalc.getPhase(moonphaseValue);
    Elements.moonPhaseWrapper.classList.add('is-visible');
}

function updateCurrentMoment(date = undefined) {
    Elements.currentDay.innerHTML = moment(date).format('dddd, MMMM Do');
    Elements.currentTime.innerHTML = moment().format('h:mm');
}

function initialize() {
    document.getElementById('location-overlay').addEventListener('click', (e) => {
        e.currentTarget.classList.add('is-closed');
    });
    Geocoding.initialize();
    Geocoding.setPosition(getTimes);

    updateCurrentMoment();

    Elements.addDay.addEventListener('click', () => {
        rightNow = SunCalcHelper.addDays(rightNow, 1);
        getTimes(userPosition);
        updateCurrentMoment(rightNow);
    });
}


function getTimes(position) {
    if (!position) {
        return false;
    }

    let { latitude, longitude } = position.coords;

    computedTimes = SunCalc.getTimes(rightNow,
        latitude, longitude
    );

    currentCity = Geocoding.getUserDetails(position, setUserDetails);
    userPosition = position;

    setHours();
    setMoonPhase(rightNow);
}

initialize();
