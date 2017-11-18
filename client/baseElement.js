import { px, rgb } from './util.js';
import { BOARD_TILE_DIM } from './config.js';
import { makeDraggable } from './dragging.js';

const PX_PROPS = [ 'left', 'right', 'width', 'height' ];

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
        this.style[key] = PX_PROPS.includes(key) ? px(value) : value;
    });
}

function getStyle() {
    const style = {};

    Object.keys(this.style).map((key) => {
        const value = this.style[key];
        style[key] = PX_PROPS.includes(key) ? parseInt(value, 10) : value;
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
        backgroundColor: rgb(0),
        position: 'absolute',
        ...style,
    });

    if (draggable) {
        makeDraggable(element);
    }

    parent.appendChild(element);

    return element;
};
