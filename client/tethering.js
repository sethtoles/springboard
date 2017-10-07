((global) => {
    function tether(target) {
        const targetTop = target.style.top;
        const targetLeft = target.style.left;
        const { top, left } = this.style;

        this.tethered.push({
            target,
            offset: {
                x: parseInt(left) - parseInt(targetLeft),
                y: parseInt(top) - parseInt(targetTop),
            },
        });

        // Include tethered relationship mapping on the target,
        // so it can easily untether itself at any time
        target.tetheredTo.push(this);
    }

    function untether(target) {
        const tetheredIndex = this.tethered
            .findIndex((tetheredItem) => (tetheredItem.target === target))
        ;

        const tetheredToIndex = target.tetheredTo.indexOf(this);

        this.tethered.splice(tetheredIndex, 1);
        target.tetheredTo.splice(tetheredToIndex, 1);
    }

    // Returns a new beginDrag method which executes the default functionality
    // and calls each tethered element's beginDrag
    const extendedBeginDrag = (element) => {
        const defaultDrag = element.beginDrag.bind(element);

        return (event) => {
            defaultDrag(event);
            element.tethered.map(({ target }) => target.beginDrag(event));
        };
    };

    global.makeTethering = (element) => {
        Object.assign(element, {
            tether,
            untether,
            tethered: [],
            beginDrag: extendedBeginDrag(element),
        });
    };
})(window);
