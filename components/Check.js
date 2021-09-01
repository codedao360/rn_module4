import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  tween,
  physics,
  easing,
  transform,
  easeIn,
  interpolate,
} from "popmotion";

const htmlContent = `
<svg class="progress-icon" width="160" height="160" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
<g class="tick-icon" stroke-width="2" stroke="#5dbd6c" fill="none" transform="translate(1, 1.2)">
    <path id="tick-outline-path" d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z" opacity="0" />
    <path id="tick-path" d="M6.173 16.252l5.722 4.228 9.22-12.69" opacity="0"/>
</g>
</svg>
`;

function showTick() {
  var circleStyler = styler(document.getElementById("tick-outline-path"));
  var tickStyler = styler(document.getElementById("tick-path"));

  var spinCircle = physics({
    velocity: -400,
    onUpdate: function onUpdate(v) {
      return circleStyler.set("rotate", v);
    },
  });

  var mapCircleOpacityToLength = interpolate([0, 1], [0, 65]);
  var openOutline = tween({
    ease: easeIn,
    onUpdate: function onUpdate(v) {
      return circleStyler.set({
        opacity: v,
        pathLength: mapCircleOpacityToLength(v),
      });
    },
    onComplete: function onComplete() {
      return spinCircle.start();
    },
  }).start();

  setTimeout(function () {
    // Complete the circle
    tween({
      from: circleStyler.get("pathLength"),
      to: 100,
      onUpdate: function onUpdate(v) {
        return circleStyler.set("pathLength", v);
      },
    }).start();

    // Slow the spinning
    spinCircle.setProps({
      friction: 0.6,
    });

    // Draw tick
    tween({
      onUpdate: function onUpdate(v) {
        return tickStyler.set({
          opacity: v,
          pathLength: v * 100,
        });
      },
    }).start();
  }, 500);
}

// if (document.readyState != "loading") {
//   showTick();
// } else {
//   document.addEventListener("DOMContentLoaded", showTick);
// }

const Check = (props) => {
  return <View>{showTick()}</View>;
};

const styles = StyleSheet.create({});
export default Check;
