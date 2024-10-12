import {Route} from './types'


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


function createRouteRef(
    id: string,
    params: string[] = []
) {

    
    return new RouteRef(id, params);
}

export {
    createRouteRef, 
    RouteRef
};