import { px, rgb } from './util.js';
import { BOARD_TILE_DIM } from './config.js';

const PX_PROPS = [ 'top', 'left', 'width', 'height' ];
const COLOR_PROPS = [ 'color', 'backgroundColor' ];

function setStyle(options = {}) {
    const {
        top: thisTop,
        left: thisLeft
    } = this.getStyle();

    const {
        top = thisTop,
        left = thisLeft,
        ...otherOptions
    } = options;

    this.move({ top, left });

    Object.keys(otherOptions).map((key) => {
        const value = otherOptions[key];

        if (PX_PROPS.includes(key)) {
            this.style[key] = px(value);
        }
        else if (COLOR_PROPS.includes(key)) {
            this.style[key] = rgb(value);
        }
        else {
            this.style[key] = value;
        }
    });

    return this;
}

function getStyle() {
    const style = {};

    Object.keys(this.style).map((key) => {
        const value = this.style[key];

        if (PX_PROPS.includes(key)) {
            style[key] = parseInt(value, 10);
        }
        else if (COLOR_PROPS.includes(key)) {
            style[key] = value
                .slice(4) // Trim 'rgb('
                .slice(0, -1) // Trim ')'
                .split(',') // Get array of channel string values
                .map((channel) => parseInt(channel, 10)) // Get array of channel values
            ;
        }
        else {
            style[key] = value;
        }
    });

    return style;
}

function move({ top, left }) {
    Object.assign(this.style, {
        top: px(top),
        left: px(left),
        zIndex: this.offsetTop,
    });

    return this;
}

function remove() {
    this.parentElement.removeChild(this);

    return this;
}

export const createBaseElement = (options = {}) => {
    const {
        parent = document.body,
        style = {},
    } = options;

    const element = document.createElement('div');

    // Methods
    Object.assign(element, {
        setStyle,
        getStyle,
        move,
        remove,
    });

    // Style assignment
    element.setStyle({
        width: BOARD_TILE_DIM,
        height: BOARD_TILE_DIM,
        backgroundColor: [0],
        position: 'absolute',
        ...style,
    });

    parent.appendChild(element);

    return element;
};
