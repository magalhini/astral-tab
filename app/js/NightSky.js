'use strict';

let _stars = [];

let NightSky = {
    draw: () => {
        let c = document.querySelector('.sky-background');
        let ctx = c.getContext('2d');
        let xMax = c.width = window.screen.availWidth;
        let yMax = c.height = window.screen.availHeight;

        let hmTimes = Math.round(xMax + yMax);

        for (let i = 0; i <= hmTimes * .5; i++) {
            let randomX = Math.floor((Math.random() * xMax) + 1);
            let randomY = Math.floor((Math.random() * yMax) + 1);
            let randomSize = Math.floor((Math.random() * 1) + 1);
            let randomOpacityOne = Math.floor((Math.random() * 4) + 1);
            let randomOpacityTwo = Math.floor((Math.random() * 2) + 1);
            let randomHue = Math.floor((Math.random() * 30) + 1);

            if (randomSize >= 1) {
                ctx.shadowBlur = Math.floor((Math.random() * 13) + 4);
                ctx.shadowColor = '#fff';
            }

            ctx.beginPath();
            ctx.arc(randomX, randomY, randomSize, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = 'hsla(' + randomHue + ', 30%, 60%, .' + randomOpacityOne + randomOpacityTwo + ')';
            ctx.fill();
            //ctx.fillRect(randomX, randomY, randomSize, randomSize);
        }
    }
};

export default NightSky;
