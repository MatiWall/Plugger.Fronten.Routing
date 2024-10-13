import { createRouteRef, createSubRouteRef, DuplicateParameterError, OverLappingParametersError, SubRouteRef } from "../src";
import { RouteRef, } from "../src";

describe('SubRouteRef', () => {
    let testRouteRef: RouteRef;

    beforeEach(() => {
        testRouteRef = createRouteRef();
    });

    test('Test subRouteRef', () => {
        
        const id: string = 'test.testsubroute';
        const path: string = 'test/'

        const testSubRouteRef: SubRouteRef = createSubRouteRef(
            id,
            testRouteRef,
            path
        );

        expect(testSubRouteRef).toBeInstanceOf(SubRouteRef);
        expect(testSubRouteRef.id).toBe(id);
        expect(testSubRouteRef.parent).toBe(testRouteRef);
        expect(testSubRouteRef.path).toBe(path);
        expect(testSubRouteRef.params).toEqual([]);
    })

    test('Subroute with url params', () => {

        const id: string = 'test.testsubroute';
        const path: string = 'test/:kind/:name'

        const testSubRouteRef: SubRouteRef = createSubRouteRef(
            id,
            testRouteRef,
            path
        );

        expect(testSubRouteRef).toBeInstanceOf(SubRouteRef);
        expect(testSubRouteRef.id).toBe(id);
        expect(testSubRouteRef.parent).toBe(testRouteRef);
        expect(testSubRouteRef.path).toBe(path);
        expect(testSubRouteRef.params).toEqual(['kind', 'name']);

    })

    test('Sub route with non unique parameters', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params:['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test/:kind/:name/:kind'


        expect(() => {

            const testSubRouteRef: SubRouteRef = createSubRouteRef(
                id,
                testRouteRef,
                path
            ); 

        }).toThrow(DuplicateParameterError);

    })

    test('Sub route overlapping parameters between parent and sub route', () => {
        
        testRouteRef = createRouteRef({id: 'test.routeref', params: ['param1', 'param2']});

        const id: string = 'test.testsubroute';
        const path: string = 'test/:param1/:name'


        expect(() => {

            const testSubRouteRef: SubRouteRef = createSubRouteRef(
                id,
                testRouteRef,
                path
            ); 

        }).toThrow(OverLappingParametersError);

    })

})