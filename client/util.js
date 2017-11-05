export const px = (size) => `${size}px`;

export const rgb = (r, g = r, b = r) => `rgb(${r},${g},${b})`;

export const border = (size, color) => `${px(size)} solid ${color}`;
