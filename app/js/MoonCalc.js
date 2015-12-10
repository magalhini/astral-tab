/* jshint devel:true */

'use strict';

const MoonCalc = {
    getPhase: (value) => {
        value -= value % 0.1;

        if (value === 0) return 'New Moon';
        else if (value < 0.25) return 'Waxing Crescent';
        else if (value === 0.25) return 'First Quarter';
        else if (value < 0.5) return 'Waxing Gibbous';
        else if (value === 0.5) return 'Full Moon';
        else if (value < 0.75) return 'Waning Gibbous';
        else if (value === 0.75) return 'Last Quarter';
        else return 'Waning Crescent';
    }
};

export default MoonCalc;
