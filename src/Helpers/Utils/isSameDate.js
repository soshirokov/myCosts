export const isSameDate = (someDateA, someDateB) => {
    return someDateA.getDate() === someDateB.getDate() &&
    someDateA.getMonth() === someDateB.getMonth() &&
    someDateA.getFullYear() === someDateB.getFullYear()
};