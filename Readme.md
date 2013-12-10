Page visibility check by abusing window.requestAnimationFrame
=============================================================

But really you should be using http://www.w3.org/TR/2011/WD-page-visibility-20110602/, I'm just playing around here.

Watch the title of this tab for the current visibility state. This works a lot better than the old-school onblur/onfucus solution when it comes to smaller windows on top or multiple screens

Demo: http://marekventur.github.io/page-visibility/
