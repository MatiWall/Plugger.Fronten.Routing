import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRouteRef, RouteResolver, RouteResolverProvider, useRouteResolver } from '../routing';

test('Route resolver provider', () => {

    const TestComponent = () => {
        const resolver = useRouteResolver();
        return (<div> Route Resolver is Working!</div>)
    }

    render(
        <RouteResolverProvider>
            <TestComponent/>
        </RouteResolverProvider>
    )

    expect(screen.getByText('Route Resolver is Working!')).toBeInTheDocument()

})



test('Route resovler initialisation and resolve', () => {

    const routeResolver: RouteResolver = new RouteResolver();
    
    const routeRef1 = createRouteRef();
    const routeRef2 = createRouteRef();
    const routeRef3 = createRouteRef(); 

    routeResolver.addRoute('/path1', routeRef1);
    routeResolver.addRoute('/path2', routeRef2);
    routeResolver.addRoute('/path3', routeRef3);

    const TestComponent = () => {
        const resolver = useRouteResolver();

        const resolvedPath1: string = resolver.resolveRouteRef(routeRef1);
        const resolvedPath2: string = resolver.resolveRouteRef(routeRef2);
        const resolvedPath3: string = resolver.resolveRouteRef(routeRef3);

        return (<div> Resolved {resolvedPath1}, {resolvedPath2} and {resolvedPath3}, </div>)
    }

    render(
        <RouteResolverProvider resolver={routeResolver}>
            <TestComponent/>
        </RouteResolverProvider>
    )

    expect(screen.getByText((content, element) => {
        return content.includes('/path1') && content.includes('/path2') && content.includes('/path3');
    })).toBeInTheDocument();

})