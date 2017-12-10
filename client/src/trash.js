import { dragRoot } from './globalState.js';
import { createBaseElement } from './baseElement.js';

const deleteItems = () => {
    if (dragRoot.element) {
        dragRoot.element.remove();
    }
};

export const createTrash = () => {
    const trash = createBaseElement({
        style: {
            width: 200,
            height: 200,
            top: 1000,
            color: [255],
            backgroundColor: [200, 0, 0],
        },
    });

    trash.addEventListener('mouseup', deleteItems);

    trash.classList.add('fa', 'fa-trash', 'fa-2x')

    return trash;
};
