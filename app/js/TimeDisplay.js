'use strict';

import ui from 'popmotion';

let TimeDisplay = {
    initialize() {
        let circle1Actor = new ui.Actor({ element: document.querySelector('.c1') });
        let circle2Actor = new ui.Actor({ element: document.querySelector('.c2') });
        let circle3Actor = new ui.Actor({ element: document.querySelector('.c3') });
        let circle4Actor = new ui.Actor({ element: document.querySelector('.c0') });
        let circle5Actor = new ui.Actor({ element: document.querySelector('.c4') });

        let duskLine = new ui.Actor({ element: document.getElementById('dusk-line') });
        let sunsetLine = new ui.Actor({ element: document.getElementById('sunset-line') });

        let makeAnimation = function(dur, del, rad) {
            return new ui.Tween({
                ease: 'backOut',
                duration: dur,
                delay: del,
                values: { r: rad}
            });
        };

        let growUp = new ui.Tween({
            values:  {
                y: {current: 60, to: 30},
                opacity: {current: 0, to: 1}},
            delay: 400,
            ease: 'backOut',
            duration: 2000
        });

        circle1Actor.start(makeAnimation(1600, 700, 60));
        circle2Actor.start(makeAnimation(1400, 500, 70));
        circle3Actor.start(makeAnimation(1200, 300, 80));
        circle4Actor.start(makeAnimation(1000, 100, 90));
        circle5Actor.start(makeAnimation(700, 100, 100));

        duskLine.start(growUp);
        sunsetLine.start(growUp);
    }
};

export default TimeDisplay;
