import {Route} from '../types'
import { v4 as uuidv4 } from 'uuid';
import { arrayAreEqual, getPathParameters } from '../utils';
import { InvalidPathError, OverLappingParametersError, DuplicateParameterError } from '../errors';

type RouteRefOptions = {
    id?: string,
    path?: string,
    params?: string[]
}

class RouteRef implements Route{
    readonly id: string;
    readonly params: string[]
    readonly path: string

    readonly subRouteRefs: RouteRef[]
    readonly parentID?: string

    constructor(
        id: string, 
        path: string, 
        params: string[],
        parentID?: string
    ) {
        this.id = id;
        this.params = params;
        this.path = path;
        this.subRouteRefs = [];
        this.parentID = parentID
      }

    validate(path: string): boolean{
        const pathParameters = getPathParameters(path);

        if (!arrayAreEqual(pathParameters, this.params)){
            throw new InvalidPathError('Specified path specified parameters ' + pathParameters + 'does not match RouteRef specification '+ this.params)
        }

        return true

    }

    createSubRouteRef(path: string): RouteRef {

        if (path === ''){
            throw new InvalidPathError('SubRouteRef can not have an empty path');
        }

        const params: string[] = getPathParameters(path);

        const overLappingParams: string[] = params.filter(p => this.params.includes(p))
        if (overLappingParams.length > 0) {
            throw new OverLappingParametersError('Overlapping parameters ' + overLappingParams + ' between parent and sub route.')
        };
       
        const duplicateParameters: string[] = params.filter((item, index) => params.indexOf(item) !== index);
        if (duplicateParameters.length > 0) {
            throw new DuplicateParameterError('Duplicated parameters now allowed ' + duplicateParameters);
        }


        const subRouteRef = new RouteRef(uuidv4(), path, params, this.id);
        this.subRouteRefs.push(subRouteRef);
        return subRouteRef;
      }

}


function createRouteRef({
    id = uuidv4(),
    params = [],
  }: RouteRefOptions = {}): RouteRef {
    return new RouteRef(id, '', params);
  }

export {
    createRouteRef, 
    RouteRef
};