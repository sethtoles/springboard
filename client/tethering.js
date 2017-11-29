import { createBaseElement } from './baseElement.js';

function tether(target) {
    const { top, left } = this.getStyle([ 'top', 'left' ]);
    const {
        top: targetTop,
        left: targetLeft,
    } = target.getStyle([ 'top', 'left' ]);

    const offset = {
        top: targetTop - top,
        left: targetLeft - left,
    };

    if (target.tetheredTo) {
        target.tetheredTo.untether(target);
    }

    target.tetheredTo = this;
    target.setStyle(offset);

    this.tethered.push(target);
    this.appendChild(target);
}

const extendMove = (element) => {
    const baseMove = element.move;

    element.move = (...args) => {
        // Move this element
        baseMove.apply(element, args);

        // Move its tethered root
        element.tetherRoot.move(args);
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

    Object.assign(element, {
        tether,
        untether,
        tethered: [],
        tetherRoot,
    });

    extendMove(element);
};
