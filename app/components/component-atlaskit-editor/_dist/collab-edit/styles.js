var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
// @ts-ignore: unused variable
// prettier-ignore
import { css } from 'styled-components';
import { colors } from './utils';
var telepointerColorStyle = function (color, index) { return "\n  &.color-" + index + " {\n    background-color: " + color.selection + ";\n    &::after {\n      background-color: " + color.solid + ";\n      color: #fff;\n      border-color: " + color.solid + ";\n    }\n  }\n"; };
export var telepointerStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .ProseMirror .telepointer {\n    position: relative;\n    transition: opacity 200ms;\n\n    &.telepointer-selection {\n      line-height: 1.2;\n      pointer-events: none;\n      user-select: none;\n    }\n\n    &.telepointer-selection-badge::after {\n      content: attr(data-initial);\n      position: absolute;\n      display: block;\n      top: -14px;\n      font-size: 9px;\n      padding: 2px;\n      color: white;\n      left: -1px;\n      border-radius: 2px 2px 2px 0;\n      line-height: initial;\n    }\n\n    &.telepointer-dim {\n      opacity: 0.2;\n    }\n\n    ", ";\n  }\n"], ["\n  .ProseMirror .telepointer {\n    position: relative;\n    transition: opacity 200ms;\n\n    &.telepointer-selection {\n      line-height: 1.2;\n      pointer-events: none;\n      user-select: none;\n    }\n\n    &.telepointer-selection-badge::after {\n      content: attr(data-initial);\n      position: absolute;\n      display: block;\n      top: -14px;\n      font-size: 9px;\n      padding: 2px;\n      color: white;\n      left: -1px;\n      border-radius: 2px 2px 2px 0;\n      line-height: initial;\n    }\n\n    &.telepointer-dim {\n      opacity: 0.2;\n    }\n\n    ", ";\n  }\n"])), colors.map(function (color, index) { return telepointerColorStyle(color, index); }));
var templateObject_1;
