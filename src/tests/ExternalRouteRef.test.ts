import { ExternalRouteRef, createExternalRouteRef, createRouteRef, bindExternalRouteRef } from '../routing';
import { describe, test, expect } from 'vitest';

describe('ExternalRouteRef', () => {
    test('should create an instance without parameters', () => {
        const externalRouteRef = createExternalRouteRef({id: 'test-id'});

        expect(externalRouteRef).toBeInstanceOf(ExternalRouteRef);
        expect(externalRouteRef.id).toBe('test-id');
    });


    test('binding', () => {
        const externalRouteRef = createExternalRouteRef({id: 'test-id'});

        const params = ['param1', 'param2'];
        const routeRef = createRouteRef({params: params});

        bindExternalRouteRef(externalRouteRef, routeRef);

        expect(externalRouteRef).toBeInstanceOf(ExternalRouteRef);
        expect(externalRouteRef.id).toBe('test-id');
        expect(externalRouteRef.params).toBe(params);
        expect(externalRouteRef.path).toBe('/:param1/:param2');
    });





});
