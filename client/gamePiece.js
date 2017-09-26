((global) => {
    function xy(x, y) {
        this.style.left = px(x);
        this.style.top = px(y);
    }

    function dragAction() {
        const { offsetTop, offsetLeft } = this;

        this.style.backgroundColor = rgb(0, offsetTop % 256, offsetLeft % 256);
        this.style.zIndex = offsetTop;
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

    global.createElement = ({ style, draggable }) => {
        const element = document.createElement('div');

        // Method attachment
        Object.assign(element, {
            xy,
            draggable,
            onmousedown,
        });

        if (draggable) {
            element.dragAction = dragAction;
            style.cursor = 'move';
        }

        // Style assignment
        Object.assign(element.style, {
            width: px(100),
            height: px(100),
            backgroundColor: rgb(0),
            position: 'fixed',
            ...style,
        });

        document.body.appendChild(element);

        return element;
    };
})(window);
