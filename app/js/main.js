/* jshint devel:true */

'use strict';

import Geocoding from './geocoding';
import SunCalc from 'suncalc';
import SunCalcHelper from './helpers/SunCalcHelper';
import TimeFormatter from './helpers/TimeFormatter';
import moment from 'moment';
import Elements from './config/Elements';
import MoonCalc from './helpers/MoonCalc.js';
import Polyfills from './helpers/polyfills';

let rightNow = new Date();   // Today!
let computedTimes = null;    // Calculated times based on position
let userPosition = null;     // User's coordinate
let currentCity = null;      // Geolocated user's city

function setHours() {
    Elements.sunrise.innerHTML = SunCalcHelper.formatSunrise(computedTimes);
    Elements.sunset.innerHTML = SunCalcHelper.formatSunset(computedTimes);
    Elements.dawn.innerHTML = SunCalcHelper.formatDawn(computedTimes);
    Elements.dusk.innerHTML = SunCalcHelper.formatDusk(computedTimes);

    Elements.dawnTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.dawn);
    Elements.sunriseTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.sunrise);
    Elements.sunsetTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.sunset);
    Elements.duskTimeago.innerHTML = TimeFormatter.timeAgo(computedTimes.dusk);

    document.body.classList.add('is-ready');
}

function setMoonPhase(date = new Date()) {
    let moonphaseValue = SunCalcHelper.getMoonLumen(SunCalc, date).phase;
    let moonphaseName = MoonCalc.getPhase(moonphaseValue);
    let moonIcons = document.querySelectorAll('.moon-icon');

    Array.prototype.forEach.call(moonIcons, (item) =>
        item.classList.remove('is-visible'));

    let klass = `.moon-icon--${moonphaseName.split(' ').join('-').toLowerCase()}`;
    let moonIcon = document.querySelectorAll(klass)[0];

    moonIcon.classList.add('is-visible');
    Elements.moonPhaseWrapper.classList.add('is-visible');
    Elements.moonPhaseName.innerHTML = moonphaseName;
}

function updateCurrentMoment(date = undefined) {
    Elements.currentDay.innerHTML = moment(date).format('dddd, MMMM Do');
}

function updateClock() {
    Elements.currentTime.innerHTML = moment().format('HH:mm:ss');
}

function toggleMenu() {
    Elements.aboutSection.classList.toggle('is-open');
}

function initialize() {
    Geocoding.initialize();
    Geocoding.setPosition(getTimes);

    updateClock();
    updateCurrentMoment();

    setInterval(updateCurrentMoment, 60000);
    setInterval(updateClock, 1000);

    Elements.increaseDay.addEventListener('click', nextDay);

    Array.prototype.forEach.call(Elements.menuTrigger, (item) =>
        item.addEventListener('click', toggleMenu)
    );
}

/**
 * Get times for the following day.
 * Prevents setting a time from earlier than today.
 */
function nextDay() {
    rightNow = SunCalcHelper.addDays(rightNow, 1);

    if (rightNow.getDate() !== new Date().getDate()) {
        Elements.decreaseDay.addEventListener('click', previousDay);
        Elements.decreaseDay.classList.remove('is-disabled');
    }

    getTimes(userPosition);
    updateCurrentMoment(rightNow);
}

/**
 * Get times for the previous day.
 * Prevents setting a time from earlier than today.
 */
function previousDay(event) {
    rightNow = SunCalcHelper.removeDays(rightNow, 1);

    if (rightNow.getDate() === new Date().getDate()) {
        Elements.decreaseDay.removeEventListener('click', previousDay);
        event.target.classList.add('is-disabled');
    }

    getTimes(userPosition);
    updateCurrentMoment(rightNow);
}

function getTimes(position) {
    if (!position) {
        return false;
    }

    const setUserDetails = (city) => {
        currentCity = city;
        Elements.cityName.textContent = city || 'Finding your location...';
    };

    let { latitude, longitude } = position.coords;

    // Get the computed times based on the location.
    computedTimes = SunCalc.getTimes(rightNow, latitude, longitude);

    // Only set the city one time per session.
    // User details are assigned as a callback once the position is found.
    currentCity = currentCity || Geocoding.getUserDetails(position, setUserDetails);
    userPosition = position;

    setHours();
    setMoonPhase(rightNow);
}

// Kick this thing up, yo!
initialize();
