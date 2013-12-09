/**
 *           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 * Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 *
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 * TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 */
(function(checkTimeResolution, shiftingWindowSize, threshold) {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.performance.now = window.performance[vendors[x]+'Now'];
    }

    if (!window.requestAnimationFrame || !window.performance.now) {
        alert("sorry, you're browser doesn't support window.requestAnimationFrame and window.performance.now");
    } else {
        var lastTimes = [];
        var currentVisibility = null;

        function frame(time) {
            if (lastTimes.length > shiftingWindowSize) {
                lastTimes.shift();
            }
            lastTimes.push(time);
            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);

        setInterval(function() {
            var newVisibility = false;
            var count = lastTimes.length;
            if (count) {
                var delta =  window.performance.now() - lastTimes[0];
                var avg = delta / count;
                newVisibility = avg < threshold;
            }
            if (newVisibility != currentVisibility) {
                currentVisibility = newVisibility;
                if (onVisibilityChange instanceof Function) {
                    onVisibilityChange(currentVisibility);
                }
            }
        }, checkTimeResolution);
    }
})(100, 5, 32);

