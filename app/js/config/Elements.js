/* globals document */
export default {
    dawn: document.querySelector('.cards__card--dawn .card__hours'),
    sunrise: document.querySelector('.cards__card--sunrise .card__hours'),
    sunset: document.querySelector('.cards__card--sunset .card__hours'),
    dusk: document.querySelector('.cards__card--dusk .card__hours'),
    moon: document.querySelector('.moon'),
    decreaseDay: document.querySelectorAll('#controls__previous-day')[0],
    increaseDay: document.querySelectorAll('#controls__next-day')[0],
    cityName: document.querySelector('.details__current-city'),

    currentTime: document.querySelector('.details__current-time'),
    currentDay: document.querySelector('.details__current-day'),

    dawnTimeago: document.querySelector('.cards__card--dawn .card__timeago'),
    sunriseTimeago: document.querySelector('.cards__card--sunrise .card__timeago'),
    sunsetTimeago: document.querySelector('.cards__card--sunset .card__timeago'),
    duskTimeago: document.querySelector('.cards__card--dusk .card__timeago'),

    moonPhaseName: document.getElementById('moon-phase'),
    moonPhaseWrapper: document.querySelector('.moon-section')
};
