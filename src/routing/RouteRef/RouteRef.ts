import {Route} from '../types'
import { v4 as uuidv4 } from 'uuid';
import { arrayAreEqual, getPathParameters } from '../utils';
import { InvalidPathError, OverLappingParametersError, DuplicateParameterError } from '../errors';

type RouteRefOptions<T extends readonly string[]> = {
    id?: string,
    path?: string,
    params?: T
}


class BaseRouteRef<TParams extends readonly string[]> {
    paramsToPath(params: TParams): string {
        if (params.length === 0) {
            return ''; // Return an empty string if no parameters are provided
        }
        return params.map(value => `:${value.replace('/', '')}`).join('/');
    }

    buildPath(basePath: string, params: TParams, isSubRoute: boolean = false): string {
        const paramsPath = this.paramsToPath(params);

        if (basePath) {
            return paramsPath ? `${basePath}/${paramsPath}` : basePath;
        }

        return paramsPath ? (isSubRoute ? paramsPath : `/${paramsPath}`) : '';
    }
}

class RouteRef<TParams extends readonly string[]> extends BaseRouteRef<TParams>{
    readonly id: string;
    readonly params: TParams
    readonly basePath: string
    readonly path: string
    readonly subRouteRefs: RouteRef<any>[]
    readonly parentID?: string

    constructor(
        id: string, 
        basePath: string, 
        params: TParams,
        parentID?: string
    ) {
        super()
        this.id = id;
        this.params = params;
        this.subRouteRefs = [];
        this.parentID = parentID

        this.basePath = basePath;
        this.path = this.buildPath(basePath, params, !!parentID)

      }

    validate(path: string): boolean{

        return true

    }

    createSubRouteRef<TSubParams extends readonly string[]>({basePath= '', params= [] as unknown as TSubParams }: {basePath?: string, params?: TSubParams} = {}): RouteRef<TSubParams> {
        
        if (typeof basePath !== 'string') {
            throw new InvalidPathError('Path must be a valid string.');
        }
        if (basePath.startsWith('/')){
            throw new InvalidPathError('SubRouteRef can not start with /.')
        }
        if (basePath.endsWith('/')){
            throw new InvalidPathError('SubRouteRef can not end with /.')
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


        const subRouteRef = new RouteRef<TSubParams>(uuidv4(), basePath, params, this.id);
        this.subRouteRefs.push(subRouteRef);
        return subRouteRef;
      }

}


function createRouteRef<TParams extends readonly string[]>({
    id = uuidv4(),
    params = []  as unknown as TParams ,
  }: RouteRefOptions<TParams> = {}): RouteRef<TParams> {
    return new RouteRef(id, '', params);
  }

export {
    createRouteRef, 
    BaseRouteRef,
    RouteRef
};