import {describe, test, expect, beforeEach } from 'vitest'
import {
    createRouteRef, 
    DuplicateParameterError, 
    InvalidPathError, 
    OverLappingParametersError
    } from "../routing";
import { RouteRef, } from "../routing";


describe('SubRouteRef', () => {
    let testRouteRef: RouteRef;

    beforeEach(() => {
        testRouteRef = createRouteRef();
    });

    test('Test subRouteRef', () => {
        
        const path: string = 'test'

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({basePath: path});

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.path).toBe(path);
        expect(testSubRouteRef.params).toEqual([]);
    })

    test('Test nested subRouteRef', () => {
        
        const path: string = 'test'
        const path2: string = 'test2'

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({basePath: path});

        const nestedTestSubRouteRef = testSubRouteRef.createSubRouteRef({basePath: path2})

        expect(nestedTestSubRouteRef).toBeInstanceOf(RouteRef);
        expect(nestedTestSubRouteRef.parentID).toBe(testSubRouteRef.id);
        expect(nestedTestSubRouteRef.path).toBe(path2);
        expect(nestedTestSubRouteRef.params).toEqual([]);
    })

    test('Test subRouteRef with no base only params', () => {
        

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({params: ['params1', 'params2']});

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.params).toEqual(['params1', 'params2']);
        expect(testSubRouteRef.path).toEqual(':params1/:params2')
    })

    test('Test subRouteRef with wrong url', () => {
        
        const path: string = 'test/'



        expect(() => {
            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({basePath: path});
        }).toThrow(InvalidPathError)
    })

    test('Subroute with url params', () => {

        const path: string = 'test'
        const params: string[] = ['kind', 'name']

        const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({basePath: path, params});

        expect(testSubRouteRef).toBeInstanceOf(RouteRef);
        expect(testSubRouteRef.parentID).toBe(testRouteRef.id);
        expect(testSubRouteRef.basePath).toBe(path);
        expect(testSubRouteRef.path).toBe('test/:kind/:name');
        expect(testSubRouteRef.params).toEqual(['kind', 'name']);

    })

    test('Sub route with non unique parameters', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params:['param1', 'param2']});


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({
                basePath: 'test',
                params: ['kind', 'name', 'kind']
        }); 

        }).toThrow(DuplicateParameterError);

    })

    test('Sub route overlapping parameters between parent and sub route', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params: ['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test'


        expect(() => {

            const testSubRouteRef: RouteRef = testRouteRef.createSubRouteRef({
                basePath: path,
                params: ['param1', 'name']
        }); 

        }).toThrow(OverLappingParametersError);

    })

})