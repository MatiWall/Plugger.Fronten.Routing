import {RouteRef} from './RouteRef'

class SubRouteRef {
    private parent: RouteRef | SubRouteRef
    private path: string
    private params: string[]

    constructor(
        parent: RouteRef | SubRouteRef,
        path: string,
        params: string[]
    ) {
        
        this.parent = parent;
        this.path = path;
        this.params = params;
    }
}

function createSubRouteRef(
    parent: RouteRef | SubRouteRef,
    path: string,
    params: string[]
){
    return new SubRouteRef(
        parent,
        path,
        params
    )
}

export {
    SubRouteRef,
    createSubRouteRef
}

