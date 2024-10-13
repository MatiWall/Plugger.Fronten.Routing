import {validate as isUUID} from 'uuid';
import { createRouteRef } from "../src";
import { RouteRef } from "../src/RouteRef";

test('Initialise RouteRef', () => {
    const testRouteRef = createRouteRef(); 

    expect(testRouteRef).toBeInstanceOf(RouteRef);
    expect(isUUID(testRouteRef.id)).toBe(true);
    expect(testRouteRef.params).toEqual([]);
})

test('Initialise RouteRef with id', () => {

    const id = 'test.routeref';
    const testRouteRef = createRouteRef({id: id}); 

    expect(testRouteRef).toBeInstanceOf(RouteRef);
    expect(testRouteRef.id).toBe(id);
    expect(testRouteRef.params).toEqual([]);
})


test('Initialise RouteRef with params', () => {

    const id = 'test.routeref';
    const params = ['params1', 'params2', 'params3']

    const testRouteRef = createRouteRef({id, params}); 

    expect(testRouteRef).toBeInstanceOf(RouteRef);
    expect(testRouteRef.id).toBe(id);
    expect(testRouteRef.params).toEqual(params);
})

test('Initialise RouteRef with default. Make sure id is different', () => {

    const testRouteRef = createRouteRef(); 
    const testRouteRef2 = createRouteRef(); 

    expect(testRouteRef.id).not.toBe(testRouteRef2.id)
})