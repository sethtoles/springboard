import { px, rgb } from './util.js';
import { BOARD_TILE_DIM } from './config.js';

const PX_PROPS = [ 'top', 'left', 'width', 'height' ];
const COLOR_PROPS = [ 'color', 'backgroundColor' ];

function xy(x, y) {
    if (!arguments.length) {
        const { top: y, left: x } = this.getStyle();
        return { x, y };
    }

    this.setStyle({
        top: y,
        left: x,
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

function remove() {
    this.parentElement.removeChild(this);
}

export const createBaseElement = (options = {}) => {
    const {
        parent = document.body,
        style = {},
    } = options;

    const element = document.createElement('div');

    // Methods
    Object.assign(element, {
        xy,
        setStyle,
        getStyle,
        handleMovement,
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
    element.handleMovement();

    return element;
};
