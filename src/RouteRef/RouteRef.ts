import {Route} from '../types'
import { v4 as uuidv4 } from 'uuid';
import { arrayAreEqual, getPathParameters } from '../utils';
import { InvalidPathError, OverLappingParametersError, DuplicateParameterError } from '../errors';

type RouteRefOptions = {
    id?: string,
    path?: string,
    params?: string[]
}

function paramsToPath(params: string[]): string {
    return `/:${params.map(value => value.replace('/', '')).join('/:')}`
}

class RouteRef implements Route{
    readonly id: string;
    readonly params: string[]
    readonly basePath: string
    readonly path: string
    readonly subRouteRefs: RouteRef[]
    readonly parentID?: string

    constructor(
        id: string, 
        basePath: string, 
        params: string[],
        parentID?: string
    ) {
        this.id = id;
        this.params = params;
        this.subRouteRefs = [];
        this.parentID = parentID

        this.basePath = basePath;
        this.path = basePath+paramsToPath(params);

      }

    validate(path: string): boolean{

        return true

    }

    createSubRouteRef(basePath: string, params: string[] = []): RouteRef {
        if (!basePath || typeof basePath !== 'string') {
            throw new InvalidPathError('Path must be a valid string.');
        }

        if (!basePath  && (params.length == 0)){
            throw new InvalidPathError('SubRouteRef can not have both empty path and params');
        }

        const overLappingParams: string[] = params.filter(p => this.params.includes(p))
        if (overLappingParams.length > 0) {
            throw new OverLappingParametersError('Overlapping parameters ' + overLappingParams + ' between parent and sub route.')
        };
       
        const duplicateParameters: string[] = params.filter((item, index) => params.indexOf(item) !== index);
        if (duplicateParameters.length > 0) {
            throw new DuplicateParameterError('Duplicated parameters now allowed ' + duplicateParameters);
        }


        const subRouteRef = new RouteRef(uuidv4(), basePath, params, this.id);
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