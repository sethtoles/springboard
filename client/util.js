export const px = (size) => `${size}px`;

export const rgb = (arr) => {
    const [ r, ...gb ] = arr;
    const [ g = r, b = r ] = gb;

    return `rgb(${r},${g},${b})`;
};

export const border = (size, color) => `${px(size)} solid ${rgb(color)}`;
