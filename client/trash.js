import { dragGroup } from './globalState.js';
import { createBaseElement } from './baseElement.js';

const deleteItems = () => {
    dragGroup.map((element) => {
        parent = element.parentElement;
        const { tethered } = parent;

        if (tethered) {
            const thisIndex = tethered.indexOf(element);

            if (thisIndex > -1) {
                tethered.splice(thisIndex, 1);
            }
        }

        parent.removeChild(element);
    });
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

    trash.classList.add('fa', 'fa-trash', 'fa-5x')

    return trash;
};
