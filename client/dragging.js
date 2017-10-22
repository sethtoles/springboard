((global) => {
    function beginDrag(event) {
        const { x, y } = this.getBoundingClientRect();
        document.body.appendChild(this);
        this.xy(x, y);

        if (dragGroup.indexOf(this) < 0) {
            const { clientX, clientY } = event;
            const { offsetLeft, offsetTop } = this;

            this.dragOffset = {
                x: clientX - offsetLeft,
                y: clientY - offsetTop,
            };

            this.style.pointerEvents = 'none';

            dragGroup.push(this);
        }
    }

    function handleMouseDown(event) {
        // Left button
        if (event.button === 0) {
            this.beginDrag(event);
        }
    }

    global.makeDraggable = (element) => {
        Object.assign(element, {
            beginDrag,
        });

        element.setStyle({
            cursor: 'move',
        });

        element.addEventListener('mousedown', handleMouseDown.bind(element));
    };
})(window);