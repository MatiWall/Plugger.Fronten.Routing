import React, {ReactNode, isValidElement} from 'react';
import { RouteRef } from './RouteRef/RouteRef';
import { InvalidComponentError, InvalidRouteRefError } from './errors';
import { RouteMap } from './types';
import { flattenList, arrayAreEqual } from './utils';


class RoutableComponent {
    mountPoint: RouteRef
    component: ReactNode
    path?: string = undefined
    
    constructor(
        mountPoint: RouteRef,
        component: ReactNode,
        path?: string
    ){

        this.validateMountPoint(mountPoint, path);
        this.validateComponent(component);

        this.component = component
        this.mountPoint = mountPoint
        this.path = path
    }

    private validateMountPoint(mountPoint: RouteRef, path?: string) {
        if (mountPoint.parentID && path) {
            throw new InvalidRouteRefError(
                'RouteRef used for root mountPoint cannot have a parent.'
            );
        }
    }

    private validateComponent(component: ReactNode){
        if (!isValidElement(component)){
            throw new InvalidComponentError('Component ' + component + ' is not a valid react component');
        }
    }

    isSubComponent(): boolean {
        return !!this.mountPoint.parentID; 
    }
} 


function createRoutableComponent({
    mountPoint,
    component,
    path = undefined,
}: {
    mountPoint: RouteRef
    component: ReactNode
    path?: string
}){
    return new RoutableComponent(mountPoint, component, path)
}


export {
    RoutableComponent,
    createRoutableComponent
}