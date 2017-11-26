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

    this.tethered.push({
        offset,
        target,
    });
}

const extendMove = (element) => {
    const baseMove = element.move;

    element.move = (...args) => {
        const { top, left } = element.getStyle([ 'top', 'left' ]);

        // Move this element
        baseMove.apply(element, args);

        // Move all its tethered children
        element.tethered.map(({ offset, target}) => {
            target.move({
                top: top + offset.top,
                left: left + offset.left,
            });
        });
    };
};

// extend remove

function untether(target) {
    const tetheredIndex = this.tethered
        .findIndex((tetheredItem) => (tetheredItem.target === target))
    ;

    this.tethered.splice(tetheredIndex, 1);
}

export const makeTethering = (element) => {
    Object.assign(element, {
        tether,
        untether,
        tethered: [],
    });

    extendMove(element);
};
