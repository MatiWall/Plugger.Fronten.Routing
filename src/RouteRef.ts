import {Route} from './types'
import { v4 as uuidv4 } from 'uuid';

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