var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { keyframes, css } from 'styled-components';
import { borderRadius as akBorderRadius } from '@atlaskit/theme';
export var ellipsis = function (maxWidth) {
    if (maxWidth === void 0) { maxWidth = '100%'; }
    var unit = typeof maxWidth === 'number' ? 'px' : '';
    return "\n    max-width: " + maxWidth + unit + ";\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  ";
};
export var size = function (value) {
    if (value === void 0) { value = '100%'; }
    var unit = typeof value === 'number' ? 'px' : '';
    return "\n    width: " + value + unit + ";\n    height: " + value + unit + ";\n  ";
};
export var center = "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n";
export var absolute = function (top, left) {
    if (top === void 0) { top = 0; }
    if (left === void 0) { left = 0; }
    return "\n  position: absolute;\n  top: " + top + "px;\n  left: " + left + "px;\n";
};
export var borderRadius = "\n  border-radius: " + akBorderRadius() + "px;\n";
export var borderRadiusBottom = "\n  border-bottom-left-radius: " + akBorderRadius() + "px;\n  border-bottom-right-radius: " + akBorderRadius() + "px;\n";
export var easeInOutCubic = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
export var fadeInKeyframe = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0%{\n    opacity: 0;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"], ["\n  0%{\n    opacity: 0;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"])));
export var fadeIn = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  animation: ", " 0.3s ", ";\n"], ["\n  animation: ", " 0.3s ", ";\n"])), fadeInKeyframe, easeInOutCubic);
var templateObject_1, templateObject_2;
