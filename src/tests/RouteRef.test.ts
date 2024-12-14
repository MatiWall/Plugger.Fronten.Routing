import {validate as isUUID} from 'uuid';
import { createRouteRef, InvalidPathError } from "../routing";
import { RouteRef } from "../routing/RouteRef/RouteRef";

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
    expect(testRouteRef.path).toEqual('/:params1/:params2/:params3');
})

test('Initialise RouteRef with default. Make sure id is different', () => {

    const testRouteRef = createRouteRef(); 
    const testRouteRef2 = createRouteRef(); 

    expect(testRouteRef.id).not.toBe(testRouteRef2.id)
})


test('subRouteRef', () => {

    const testRouteRef = createRouteRef(); 
    const subRouteRef = testRouteRef.createSubRouteRef('test/')
    
    expect(testRouteRef.subRouteRefs[0]).toBe(subRouteRef);
    expect(testRouteRef.id).toBe(subRouteRef.parentID);

    const subSubRouteRef = subRouteRef.createSubRouteRef('sub');
    const subSub2RouteRef = subRouteRef.createSubRouteRef('sub2');
    const subSubSubRouteRef = subSub2RouteRef.createSubRouteRef('sub3');
    
    expect(testRouteRef.subRouteRefs[0].subRouteRefs[0]).toBe(subSubRouteRef);
    expect(testRouteRef.subRouteRefs[0].subRouteRefs[1]).toBe(subSub2RouteRef);
    expect(testRouteRef.subRouteRefs[0].subRouteRefs[1].subRouteRefs[0]).toBe(subSubSubRouteRef);
})

test('Test subRouteRef without path -> Throw error', () => {

    const testRouteRef = createRouteRef(); 
    
    
    expect(() => testRouteRef.createSubRouteRef('')).toThrow(InvalidPathError);
})