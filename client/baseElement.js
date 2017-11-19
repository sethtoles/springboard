import { px, rgb } from './util.js';
import { BOARD_TILE_DIM } from './config.js';
import { makeDraggable } from './dragging.js';

const PX_PROPS = [ 'left', 'right', 'width', 'height' ];
const COLOR_PROPS = [ 'color', 'backgroundColor' ];

function xy(x, y) {
    if (!arguments.length) {
        return this.getBoundingClientRect();
    }

    const parentXY = this.parentElement.getBoundingClientRect();

    this.setStyle({
        top: y - parentXY.y,
        left: x - parentXY.x,
    });
}

function setStyle(options = {}) {
    Object.keys(options).map((key) => {
        const value = options[key];

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

function handleMovement() {
    this.style.zIndex = this.offsetTop;
}

export const createBaseElement = (options = {}) => {
    const {
        parent = document.body,
        style = {},
        draggable = false,
    } = options;

    const element = document.createElement('div');

    // Methods
    Object.assign(element, {
        xy,
        setStyle,
        getStyle,
        handleMovement,
    });

    // Style assignment
    element.setStyle({
        width: BOARD_TILE_DIM,
        height: BOARD_TILE_DIM,
        backgroundColor: [0],
        position: 'absolute',
        ...style,
    });

    if (draggable) {
        makeDraggable(element);
    }

    parent.appendChild(element);

    return element;
};
