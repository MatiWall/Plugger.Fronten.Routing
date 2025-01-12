import React, {ReactNode, isValidElement} from 'react';
import { RouteRef } from './RouteRef/RouteRef';
import { InvalidComponentError, InvalidRouteRefError } from './errors';
import { RouteMap } from './types';
import { flattenList, arrayAreEqual } from './utils';


class RoutableComponent {
    mountPoint: RouteRef
    component: ReactNode
    
    constructor(
        mountPoint: RouteRef,
        component: ReactNode,
    ){

        this.validateComponent(component);

        this.component = component
        this.mountPoint = mountPoint
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
    component
}: {
    mountPoint: RouteRef
    component: ReactNode
}){
    return new RoutableComponent(mountPoint, component)
}


export {
    RoutableComponent,
    createRoutableComponent
}