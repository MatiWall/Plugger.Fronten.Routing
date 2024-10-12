import { createRouteRef } from "../src";
import { RouteRef } from "../src/RouteRef";

test('Initialise RouteRef', () => {

    const id = 'test.routeref';
    const testRouteRef = createRouteRef(id); 

    expect(testRouteRef).toBeInstanceOf(RouteRef);
    expect(testRouteRef.id).toBe(id);
    expect(testRouteRef.params).toEqual([]);
})


test('Initialise RouteRef with params', () => {

    const id = 'test.routeref';
    const params = ['params1', 'params2', 'params3']

    const testRouteRef = createRouteRef(id, params); 

    expect(testRouteRef).toBeInstanceOf(RouteRef);
    expect(testRouteRef.id).toBe(id);
    expect(testRouteRef.params).toEqual(params);
})