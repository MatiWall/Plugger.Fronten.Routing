import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createExternalRouteRef, createRouteRef, RouteResolver, RouteResolverProvider, useRouteResolver } from '../routing';
import { useRouteRef } from '../routing/RouteRef/UseRouteRef';
import {test, expect } from 'vitest'

test('Use Route Ref', () => {

    const routeResolver: RouteResolver = new RouteResolver();
    
    const routeRef1 = createRouteRef({params: ['kind', 'namespace', 'name']});

    routeResolver.addRoute('/path1', routeRef1);

    const TestComponent = () => {
        const routeBuilder = useRouteRef(routeRef1);

        const path = routeBuilder({kind: 'system', namespace: 'default', name: 'name'});
        return (<div> {path} </div>)
    }

    render(
        <RouteResolverProvider resolver={routeResolver}>
            <TestComponent/>
        </RouteResolverProvider>
    )

    expect(screen.getByText('/path1/system/default/name')).toBeInTheDocument();
    cleanup();

})


test('Use Sub Route Ref', () => {

    const routeResolver: RouteResolver = new RouteResolver();
    
    const routeRef1 = createRouteRef({params: ['kind', 'namespace', 'name']});

    routeResolver.addRoute('/path1', routeRef1);

    const TestComponent = () => {
        const routeBuilder = useRouteRef(routeRef1);

        const path = routeBuilder({kind: 'system', namespace: 'default', name: 'name'});
        return (<div> {path} </div>)
    }

    render(
        <RouteResolverProvider resolver={routeResolver}>
            <TestComponent/>
        </RouteResolverProvider>
    )

    expect(screen.getByText('/path1/system/default/name')).toBeInTheDocument();
    cleanup();

})

test('Route Ref missing params', () => {
    const routeResolver: RouteResolver = new RouteResolver();
    
    const routeRef = createRouteRef({params: ['kind', 'namespace', 'name']});

    routeResolver.addRoute('/path1/:kind/:namespace/:name', routeRef);

    const TestComponent = () => {
        const routeBuilder = useRouteRef(routeRef);

        // Missing 'name' param
        expect(() => {
            routeBuilder({kind: 'system', namespace: 'default'});
        }).toThrow();
        
        return (<div> Test Component </div>)
    }

    render(
        <RouteResolverProvider resolver={routeResolver}>
            <TestComponent/>
        </RouteResolverProvider>
    );
    cleanup();
});


test('Use ExternalRouteRef', () => {

    const routeResolver: RouteResolver = new RouteResolver();
    
    const routeRef1 = createRouteRef({params: ['kind', 'namespace', 'name']});

    routeResolver.addRoute('/path1', routeRef1);

    const externalRouteRef = createExternalRouteRef();
    externalRouteRef.addRouteRef(routeRef1);

    const TestComponent = () => {
        const routeBuilder = useRouteRef(externalRouteRef);

        const path = routeBuilder({kind: 'system', namespace: 'default', name: 'name'});
        return (<div> {path} </div>)
    }

    render(
        <RouteResolverProvider resolver={routeResolver}>
            <TestComponent/>
        </RouteResolverProvider>
    )

    expect(screen.getByText('/path1/system/default/name')).toBeInTheDocument();
    cleanup();

})