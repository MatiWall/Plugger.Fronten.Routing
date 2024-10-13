import {Route} from './types'
import { v4 as uuidv4 } from 'uuid';
import { arrayAreEqual, getPathParameters } from './utils';
import { InvalidPathError } from './errors';

type RouteRefOptions = {
    id?: string,
    params?: string[]
}

class RouteRef implements Route{
    readonly id: string;
    readonly params: string[]

    constructor(
        id: string,
        params: string[]
    ) {
        this.id = id
        this.params = params
    }

    validate(path: string): boolean{
        const pathParameters = getPathParameters(path);
        console.log(arrayAreEqual(pathParameters, this.params));
        if (!arrayAreEqual(pathParameters, this.params)){
            throw new InvalidPathError('Specified path specified parameters ' + pathParameters + 'does not match RouteRef specification '+ this.params)
        }
        
        return true

    }

}


function createRouteRef({
    id = uuidv4(),
    params = []
}: RouteRefOptions = { id: uuidv4(), params: [] }) {


    return new RouteRef(id, params);
}

export {
    createRouteRef, 
    RouteRef
};