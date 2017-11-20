import { border } from './util.js';
import { BOARD_TILE_DIM, BOARD_ROWS, BOARD_COLUMNS } from './config.js';
import { dragGroup } from './globalState.js';
import { createBaseElement } from './baseElement.js';
import { makeDraggable } from './dragging.js';
import { makeTethering } from './tethering.js';

function createTile(row, column) {
    const { root, tileStyle } = this;
    const { x, y } = root.xy();
    const { width, height } = tileStyle;

    const tile = createBaseElement({
        style: {
            ...this.tileStyle,
            width: width,
            height: height,
            top: y + (row * height),
            left: x + (column * width),
        },
    });

    tile.addEventListener('mouseenter', () => {
        if (dragGroup.length && dragGroup.indexOf(tile) < 0) {
            dragGroup.snapTo = tile;
        }
    });

    tile.addEventListener('mouseleave', () => {
        if (dragGroup.snapTo === tile) {
            delete dragGroup.snapTo;
        }
    });

    makeTethering(tile);
    root.tether(tile);

    return tile;
}

function addRow() {
    this.tiles = this.tiles
        .concat(Array(this.columns)
            .fill()
            .map((column, columnIndex) => this.createTile(this.rows, columnIndex))
        )
    ;

    this.rows++;
}

function addColumn() {
    // Iterate backwards so that the indexing math doesn't change as we add elements
    for (let rowIndex = this.rows - 1; rowIndex >= 0; --rowIndex) {
        this.tiles.splice(
            rowIndex * this.columns, // Start index
            0, // Elements to delete
            this.createTile(rowIndex, this.columns) // Element to add
        );
    }

    const { width } = this.tileStyle;
    const rootLeft = parseInt(this.root.style.left);
    const handleLeft = parseInt(this.handle.style.left);

    this.root.setStyle({ left: rootLeft - width });
    this.handle.setStyle({ left: handleLeft + width });

    this.columns++;
}

const createHandle = ({ root, columns, tileStyle }) => {
    const { top, left } = root.getStyle();
    const { width, height } = tileStyle;

    const handle = createBaseElement({
        style: {
            top,
            left: left + (width * columns),
            width: width,
            height: height,
            color: [255],
        },
    });

    makeDraggable(handle);
    makeTethering(handle);
    handle.tether(root);

    handle.classList.add('fa', 'fa-arrows', 'fa-5x');

    return handle;
}

const createBoardControls = (board) => {
    const { root, handle, columns, tileStyle } = board;
    const { x, y } = root.xy();
    const { width, height } = tileStyle;

    const baseButtonStyle = {
        left: x + (width * columns),
        width,
        height,
        backgroundColor: [128],
    }

    const addRowButton = createBaseElement({
        style: {
            ...baseButtonStyle,
            top: y + height,
        }
    });
    addRowButton.addEventListener('mousedown', () => board.addRow());
    addRowButton.classList.add('fa', 'fa-angle-double-down');
    handle.tether(addRowButton);

    const addColumnButton = createBaseElement({
        style: {
            ...baseButtonStyle,
            top: y + (height * 2),
        },
    });
    addColumnButton.addEventListener('mousedown', () => board.addColumn());
    addColumnButton.classList.add('fa', 'fa-angle-double-right');
    handle.tether(addColumnButton);
}

export const createBoard = (options = {}) => {
    const {
        rows = BOARD_ROWS,
        columns = BOARD_COLUMNS,
        top = 0,
        left = 0,
        tileWidth = BOARD_TILE_DIM,
        tileHeight = BOARD_TILE_DIM,
        tileColor = [255],
        tileBorder = border(1, [0]),
    } = options;

    const tileStyle = {
        width: tileWidth,
        height: tileHeight,
        backgroundColor: tileColor,
        border: tileBorder,
    };

    // The board root is used only as a reference point,
    // relative to which all tiles and UI will be placed
    const root = createBaseElement({
        style: {
            top,
            left,
        },
    });

    makeTethering(root);

    const handle = createHandle({
        root,
        columns,
        tileStyle,
    });

    const board = {
        root,
        handle,
        rows,
        columns,
        tileStyle,
        tiles: [],
        // Methods
        createTile,
        addRow,
        addColumn,
    };

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
            const tile = board.createTile(rowIndex, columnIndex);

            board.tiles.push(tile);
        }
    }

    createBoardControls(board);

    return board;
}
