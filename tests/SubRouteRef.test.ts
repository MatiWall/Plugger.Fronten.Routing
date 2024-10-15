import {
    createRouteRef, 
    DuplicateParameterError, 
    OverLappingParametersError
    } from "../src";
import { RouteRef, } from "../src";

describe('SubRouteRef', () => {
    let testRouteRef: RouteRef;

    beforeEach(() => {
        testRouteRef = createRouteRef();
    });

    test('Test subRouteRef', () => {
        
        const path: string = 'test/'

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
            path
        );

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.path).toBe(path);
        expect(testSubRouteRef.params).toEqual([]);
    })

    test('Subroute with url params', () => {

        const path: string = 'test'
        const params: string[] = ['kind', 'name']

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef('', params);

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.path).toBe(path);
        expect(testSubRouteRef.params).toEqual(['kind', 'name']);

    })

    test('Sub route with non unique parameters', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params:['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test/:kind/:name/:kind'


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
                path
            ); 

        }).toThrow(DuplicateParameterError);

    })

    test('Sub route overlapping parameters between parent and sub route', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params: ['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test/:param1/:name'


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
                path
            ); 

        }).toThrow(OverLappingParametersError);

    })

})