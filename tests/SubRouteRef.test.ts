import {
    createRouteRef, 
    DuplicateParameterError, 
    InvalidPathError, 
    OverLappingParametersError
    } from "../src/routing";
import { RouteRef, } from "../src/routing";

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

    test('Test subRouteRef with wrong url', () => {
        
        const path: string = '/test'



        expect(() => {
            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(
                path
            );
        }).toThrow(InvalidPathError)
    })

    test('Subroute with url params', () => {

        const path: string = 'test'
        const params: string[] = ['kind', 'name']

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef(path, params);

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.basePath).toBe(path);
        expect(testSubRouteRef.path).toBe('test/:kind/:name');
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