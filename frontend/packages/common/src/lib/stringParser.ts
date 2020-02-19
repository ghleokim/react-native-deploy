export const numberWithCommas = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberWithFirstDecimal = (n: number) => {
    return Math.round(n * 10) / 10
}