import { DuplicateParameterError, OverLappingParametersError } from './errors'
import {RouteRef} from './RouteRef'
import {Route} from './types'

class SubRouteRef implements Route {
    parent: RouteRef | SubRouteRef
    id: string
    path: string
    params: string[]

    constructor(
        id: string,
        parent: RouteRef | SubRouteRef,
        path: string,
        params: string[]
    ) {
        this.id = id
        this.parent = parent;
        this.path = path;
        this.params = params;
    }
}

function createSubRouteRef(
    id: string,
    parent: RouteRef | SubRouteRef,
    path: string,
){

    const params: string[] = path.split('/').filter(p => p.startsWith(':')).map(p => p.substring(1));

    const overLappingParams: string[] = params.filter(p => parent.params.includes(p))
    if (overLappingParams.length > 0) {
        throw new OverLappingParametersError('Overlapping parameters ' + overLappingParams + ' between parent and sub route.')
    };
   
    const duplicateParameters: string[] = params.filter((item, index) => params.indexOf(item) !== index);
    if (duplicateParameters.length > 0) {
        throw new DuplicateParameterError('Duplicated parameters now allowed ' + duplicateParameters);
    }

    return new SubRouteRef(
        id,
        parent,
        path,
        params
    )
}

export {
    SubRouteRef,
    createSubRouteRef
}

