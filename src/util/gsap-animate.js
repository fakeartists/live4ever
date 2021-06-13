/*
 * GSAP promisified
 * By default we are using TweenLite, TweenMax has a size cost in your final bundle
 * Example:
 * import animate from '../../util/gsap-animate';
 * animate.to(this.container, 0.3, { autoAlpha: 1, delay: 0.2 }).then(()=>{});
 */
import {
  TweenLite,
  CSSPlugin,
  Ease,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Back,
  Elastic,
  Bounce,
  RoughEase,
  SlowMo,
  SteppedEase,
  Circ,
  Expo,
  Sine,
  ExpoScaleEase,
  BezierPlugin
} from 'gsap';
const animate = require('gsap-promisify')(Promise, TweenLite);

animate.staggerTo = function(els, duration, props, delay) {
  return Promise.all(
    els.map((el, i) =>
      animate.to(el, duration, {
        ...props,
        delay: (props.delay || 0) + delay * i
      })
    )
  );
};

animate.staggerFrom = function(els, duration, props, stagger) {
  return Promise.all(
    els.map((el, i) =>
      animate.from(el, duration, {
        ...props,
        delay: props.delay + stagger * i
      })
    )
  );
};

export {
  TweenLite,
  // plugins
  CSSPlugin,
  BezierPlugin,
  // easing
  Ease,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Back,
  Elastic,
  Bounce,
  RoughEase,
  SlowMo,
  SteppedEase,
  Circ,
  Expo,
  Sine,
  ExpoScaleEase
};

export default animate;
