

function getPathParameters(path: string): string[] {
    return path.split('/').filter(p => p.startsWith(':')).map(p => p.substring(1));
}

function arrayAreEqual(array1: string[], array2: string[]): boolean{
    if (array1.length !== array2.length) return false;
    return array1.every((element, index) => element === array2[index]);
}

export {
    getPathParameters, 
    arrayAreEqual
};