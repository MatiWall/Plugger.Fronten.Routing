import { InvalidRouteRefError } from "../errors";
import { Route } from "../types";
import { RouteRef, BaseRouteRef } from "./RouteRef"
import { v4 as uuidv4 } from 'uuid';

type ExternalRouteRefOptions = {
    id?: string,
}

class ExternalRouteRef extends BaseRouteRef {
    readonly id: string
    private routeRefTarget?: RouteRef
    
    constructor(
        id: string
    ){
        super()
        this.id = id
    }

    getRouteRefTarget(): RouteRef{
        if (!this.routeRefTarget){
            throw new InvalidRouteRefError('ExternalRouteRef has not been bound.')
        }
        return this.routeRefTarget
    }


    addRouteRef(routeRef: RouteRef){
        this.routeRefTarget = routeRef
    }

    get subRouteRefs(): RouteRef[]{
        return this.routeRefTarget?.subRouteRefs || []
    }


    get basePath(){
        return this.routeRefTarget?.basePath
    }

    get path(): string | undefined{
        return this.routeRefTarget?.path
    }

    get parentID() {
        return this.routeRefTarget?.parentID
    }

    get params(){
        return this.routeRefTarget?.params
    }
}

function createExternalRouteRef({
    id = uuidv4(),
  }: ExternalRouteRefOptions = {}): ExternalRouteRef {
    return new ExternalRouteRef(id);
  }

export {
    ExternalRouteRef,
    createExternalRouteRef
}