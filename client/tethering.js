function tether(target) {
    const { top, left } = this.getStyle();
    const {
        top: targetTop,
        left: targetLeft,
    } = target.getStyle();

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
};
