import { px, rgb } from './util.js';
import { BOARD_TILE_DIM } from './config.js';
import { makeDraggable } from './dragging.js';

function xy(x, y) {
    if (!arguments.length) {
        return {
            x: parseInt(this.style.left),
            y: parseInt(this.style.top),
        };
    }

    this.style.left = px(x);
    this.style.top = px(y);
}

function setStyle(options = {}) {
    Object.assign(this.style, options);
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

    Object.assign(element, {
        // Methods
        xy,
        setStyle,
        handleMovement,
    });

    // Style assignment
    element.setStyle({
        width: px(BOARD_TILE_DIM),
        height: px(BOARD_TILE_DIM),
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
