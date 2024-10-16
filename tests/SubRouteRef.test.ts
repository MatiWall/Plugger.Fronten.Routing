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
        expect(testSubRouteRef.basePath).toBe(path);
        expect(testSubRouteRef.params).toEqual([]);
    })

    test('Subroute with url params', () => {

        const path: string = 'test'
        const params: string[] = ['kind', 'name']

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(path, params);

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.basePath).toBe(path);
        expect(testSubRouteRef.params).toEqual(['kind', 'name']);

    })

    test('Sub route with non unique parameters', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params:['param1', 'param2']});


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
                'test',
                ['kind', 'name', 'kind']
            ); 

        }).toThrow(DuplicateParameterError);

    })

    test('Sub route overlapping parameters between parent and sub route', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params: ['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test'


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
                path,
                ['param1', 'name']
            ); 

        }).toThrow(OverLappingParametersError);

    })

})