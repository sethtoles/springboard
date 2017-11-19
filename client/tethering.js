function tether(target) {
    const { x, y } = this.xy();
    const targetXY = target.xy();

    // find screen x and y of target (not relative, as it may be tethered)
    // calculate offset  with this
    // set target xy to offset
    // append as child

    const offset = {
        x: targetXY.x - x,
        y: targetXY.y - y,
    };

    target.xy(offset.x, offset.y);

    this.tethered.push(target);
    this.appendChild(target);
}

function untether(target) {
    const tetheredIndex = this.tethered
        .findIndex((tetheredItem) => (tetheredItem.target === target))
    ;

    this.tethered.splice(tetheredIndex, 1);
    document.appendChild(target);
}

export const makeTethering = (element) => {
    Object.assign(element, {
        tether,
        untether,
        tethered: [],
    });
};
