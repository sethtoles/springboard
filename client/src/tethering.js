import { createBaseElement } from './baseElement.js';

function tether(target) {
    const { top, left } = this.tetherRoot.getStyle([ 'top', 'left' ]);
    const {
        top: targetTop,
        left: targetLeft,
    } = target.getBoundingClientRect();

    const offset = {
        top: targetTop - top,
        left: targetLeft - left,
    };

    // Untether from other elements
    if (target.tetheredTo) {
        target.tetheredTo.untether(target);
    }

    // Tether to this element
    target.tetheredTo = this;
    target.setStyle(offset);
    this.tethered.push(target);
    this.tetherRoot.appendChild(target);

    // If the item being tethered is also tethering,
    // remove its tetherRoot and set it to this new one
    if (target.tetherRoot) {
        const oldRoot = target.tetherRoot;

        target.tetherRoot = this.tetherRoot;
        oldRoot.remove();
    }
}

const extendMove = (element) => {
    const baseMove = element.move;

    element.move = (...args) => {
        // Move this element
        baseMove.apply(element, args);

        // Move its tethered root
        element.tetherRoot.move(...args);
    };
};

// extend remove

function untether(target) {
    const tetheredIndex = this.tethered
        .findIndex((tetheredItem) => (tetheredItem === target))
    ;

    document.body.appendChild(target);

    this.tethered.splice(tetheredIndex, 1);
}

export const makeTethering = (element) => {
    const { top, left } = element.getStyle([ 'top', 'left' ]);
    const tetherRoot = createBaseElement({
        style: {
            width: 0,
            height: 0,
            top,
            left,
        },
    });

    tetherRoot.classList.add('tether-root');

    Object.assign(element, {
        tether,
        untether,
        tethered: [],
        tetherRoot,
    });

    extendMove(element);
};
