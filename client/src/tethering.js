import { createBaseElement } from './baseElement.js';

function tether(target) {
    const { top, left } = target.getBoundingClientRect();

    // Untether from other elements
    if (target.tetheredTo) {
        target.tetheredTo.untether(target);
    }

    // Tether to this element
    target.tetheredTo = this;
    this.tethered.push(target);
    this.tetherRoot.appendChild(target);

    // Set the target's position within its new parent
    target.position({ top, left });

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
    const { top, left } = target.getBoundingClientRect();
    const tetheredIndex = this.tethered
        .findIndex((tetheredItem) => (tetheredItem === target))
    ;

    document.body.appendChild(target);
    target.position({ top, left });

    this.tethered.splice(tetheredIndex, 1);
}

export const makeTethering = (element) => {
    const { top, left } = element.getBoundingClientRect();
    const tetherRoot = createBaseElement({
        layer: 1,
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
