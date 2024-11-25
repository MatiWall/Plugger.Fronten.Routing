import React, {ReactNode, isValidElement} from 'react';
import { RouteRef } from './RouteRef/RouteRef';
import { InvalidComponentError, InvalidRouteRefError } from './errors';
import { RouteMap } from './types';
import { flattenList, arrayAreEqual } from './utils';


class RoutableComponent {
    mountPoint: RouteRef
    component: ReactNode
    subRoutes: RouteMap[]
    
    constructor(
        mountPoint: RouteRef,
        component: ReactNode,
        subRoutes: RouteMap[] = []
    ){

        this.validateMountPoint(mountPoint);
        this.validateSubRoutes(subRoutes, mountPoint);
        this.validateComponent(component);

        this.component = component
        this.mountPoint = mountPoint
        this.subRoutes = subRoutes
    }

    private validateMountPoint(mountPoint: RouteRef){
        if (mountPoint.parentID){
            throw new InvalidRouteRefError('RouteRef used for mountPoint can not have a parent.'); 
        }
    }

    private validateSubRoutes(subRoutes: RouteMap[], mountPoint: RouteRef){
        if (!arrayAreEqual(subRoutes.map(route => route.routeRef), flattenList(mountPoint.subRouteRefs))){
            throw new InvalidRouteRefError('Sub routes in mapping and in mountPoint does not match')
        }

        subRoutes.forEach((subRoute) => {
            this.validateComponent(subRoute.component);
        })
    }

    private validateComponent(component: ReactNode){
        if (!isValidElement(component)){
            throw new InvalidComponentError('Component ' + component + ' is not a valid react component');
        }
    }

} 


export {
    RoutableComponent
}