import {Route} from '../types'
import { v4 as uuidv4 } from 'uuid';
import { arrayAreEqual, getPathParameters } from '../utils';
import { InvalidPathError, OverLappingParametersError, DuplicateParameterError } from '../errors';

type RouteRefOptions = {
    id?: string,
    path?: string,
    params?: string[]
}


class BaseRouteRef {
    paramsToPath(params: string[]): string {
        if (params.length === 0) {
            return ''; // Return an empty string if no parameters are provided
        }
    
        return `/:${params.map(value => value.replace('/', '')).join('/:')}`
    }

    buildPath(basePath: string, params: string[]){
        return basePath+this.paramsToPath(params);
    }
}

class RouteRef extends BaseRouteRef{
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
        super()
        this.id = id;
        this.params = params;
        this.subRouteRefs = [];
        this.parentID = parentID

        this.basePath = basePath;
        this.path = this.buildPath(basePath, params)

      }

    validate(path: string): boolean{
        
        return true

    }

    createSubRouteRef({basePath= '', params= []}: {basePath?: string, params?: string[]} = {}): RouteRef {
        if (basePath.startsWith('/')){
            throw new InvalidPathError('SubRouteRef can not start with /.')
        }
        if (basePath.endsWith('/')){
            throw new InvalidPathError('SubRouteRef can not end  with /.')
        }
        if (!basePath  && (params.length == 0)){
            throw new InvalidPathError('SubRouteRef can not have both empty path and params');
        }
        if (typeof basePath !== 'string') {
            throw new InvalidPathError('Path must be a valid string.');
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
    BaseRouteRef,
    RouteRef
};