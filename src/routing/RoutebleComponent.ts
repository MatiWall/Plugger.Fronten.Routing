import React, {ReactNode} from 'react';
import { RouteRef } from './RouteRef/RouteRef';
import { InvalidComponentError, InvalidRouteRefError } from './errors';
import { RouteMap } from './types';
import { flattenList, arrayAreEqual } from './utils';


class RoutableComponent {
    mountPoint: RouteRef<any>
    component: React.FC
    
    constructor(
        mountPoint: RouteRef<any>,
        component: React.FC,
    ){

        this.component = component
        this.mountPoint = mountPoint
    }


    isSubComponent(): boolean {
        return !!this.mountPoint.parentID; 
    }
} 


function createRoutableComponent({
    mountPoint,
    component
}: {
    mountPoint: RouteRef<any>
    component: React.FC
}){
    return new RoutableComponent(mountPoint, component)
}


export {
    RoutableComponent,
    createRoutableComponent
}