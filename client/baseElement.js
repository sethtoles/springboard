((global) => {
    function xy(x, y) {
        this.style.left = px(x);
        this.style.top = px(y);
    }

    function defaultDragAction() {
        this.style.zIndex = this.offsetTop;
    }

    function onmousedown(event) {
        event.preventDefault();

        // Left button
        if (event.button === 0 && this.draggable) {
            const { clientX, clientY } = event;
            const { offsetLeft, offsetTop } = this;

            this.dragOffset = {
                x: clientX - offsetLeft,
                y: clientY - offsetTop,
            };

            dragGroup.push(this);
        }
        // Right button
        else if (event.button === 2) {
            document.body.removeChild(this);
        }
    };

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

        // Include tethered relationship mapping on the targer,
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

    global.createBaseElement = (options = {}) => {
        const {
            parent = document.body,
            style = {},
            draggable = false,
            dragAction = defaultDragAction,
        } = options;

        const element = document.createElement('div');

        Object.assign(element, {
            draggable,
            tethered: [],
            tetheredTo: [],
            // Methods
            xy,
            onmousedown,
            tether,
            untether,
        });

        if (draggable) {
            style.cursor = 'move';
            element.dragAction = dragAction;
        }

        // Style assignment
        Object.assign(element.style, {
            width: px(BOARD_TILE_DIM),
            height: px(BOARD_TILE_DIM),
            backgroundColor: rgb(0),
            position: 'absolute',
            ...style,
        });

        parent.appendChild(element);

        return element;
    };
})(window);
