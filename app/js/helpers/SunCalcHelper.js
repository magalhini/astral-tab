'use strict';

import moment from 'moment';

const clockFormat = 'hh:mm';

export default {
    formatSunrise: (time) => moment(time.sunrise).format(clockFormat),
    formatDawn: (time) => moment(time.dawn).format(clockFormat),
    formatSunset: (time) => moment(time.sunset).format(clockFormat),
    formatDusk: (time) => moment(time.dusk).format(clockFormat),
    getMoonPosition: (sunCalc, position) => sunCalc.getMoonPosition(new Date(), position.latitude, position.latitude),
    getMoonLumen: (sunCalc, date) => sunCalc.getMoonIllumination(date),

    addDays: (date, days) => new Date(date.setDate(date.getDate() + days)),
    removeDays: (date, days) => new Date(date.setDate(date.getDate() - days))
};
