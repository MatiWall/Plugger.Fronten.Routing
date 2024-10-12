import {Route} from './types'


class RouteRef implements Route{
    id: string;

    constructor(id: string) {
        this.id = id
    }

}


function createRouteRef(id: string) {

    return new RouteRef(id)
}

export {
    createRouteRef, 
    RouteRef
};