

function getPathParameters(path: string): string[] {
    return path.split('/').filter(p => p.startsWith(':')).map(p => p.substring(1));
}

function arrayAreEqual(array1: any[], array2: any[]): boolean{
    if (array1.length !== array2.length) return false;
    return array1.every((element, index) => element === array2[index]);
}

function flattenList(inputList: any[]): any[] {
    return inputList.reduce((acc: any[], item: any) => {
      if (Array.isArray(item)) {
        // Recursively flatten the list
        acc.push(...flattenList(item));
      } else {
        // If the item is not a list, add it to the accumulator
        acc.push(item);
      }
      return acc;
    }, []);
  }

export {
    getPathParameters, 
    arrayAreEqual, 
    flattenList
};