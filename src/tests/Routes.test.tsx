import React, { useState } from 'react';
import { test, expect, afterEach } from 'vitest'
import { useNavigate, Outlet, Link } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { createRouteRef, RoutableComponent, RoutesBuilder, AppRouter, useRouteRef, createRoutableComponent, useRouteResolver, createRouteResolver, useRouteRefParams } from '../routing';


afterEach(() => {
    cleanup();
});

const TestComponent: React.FC = () => <div><p>Test Component</p><Outlet /> </div>;
const SubComponent1: React.FC = () => <div>Sub Component 1</div>;
const SubComponent2: React.FC = () => <div>Sub Component 2</div>;

// Helper component to simulate navigation using useNavigate
const NavigateTo: React.FC<{ path: string }> = ({ path }) => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate(path);
    }, [navigate, path]);
    return null;
};

test('renders without crashing', () => {
    const routeRef = createRouteRef();
    const routeBinds = [
        createRoutableComponent({
            component: TestComponent,
            mountPoint: routeRef
        })
    ];


    const resolver = createRouteResolver();
    resolver.addRoute('/', routeRef)

    render(<AppRouter resolver={resolver}> <RoutesBuilder routeBinds={routeBinds} /><NavigateTo path={'/'} /></AppRouter>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    cleanup();
});

test('renders correct component for registered route', () => {

    const routeRef = createRouteRef();

    const routeBinds = [
        createRoutableComponent({
            mountPoint: routeRef,
            component: TestComponent
        })
    ];

    const resolver = createRouteResolver();
    resolver.addRoute('/test', routeRef)
    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/test'} />
            </AppRouter>
            );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    cleanup();
});

test('renders nested routes correctly', () => {
    const parentRouteRef = createRouteRef();
    const subRouteRef1 = parentRouteRef.createSubRouteRef({ basePath: 'sub1' });
    const subRouteRef2 = parentRouteRef.createSubRouteRef({ basePath: 'sub2' });

    const routeBinds = [
        createRoutableComponent({
            mountPoint: parentRouteRef,
            component: TestComponent,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef1,
            component: SubComponent1,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef2,
            component: SubComponent2,
        }),
    ];
    const resolver = createRouteResolver();
    resolver.addRoute('/parent', parentRouteRef)
    // Test for the first nested route
    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/parent/sub1'} />
            </AppRouter>
            );

    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();
    cleanup();

    // Test for the second nested route
    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/parent/sub2'} />
            </AppRouter>
            );

    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
    cleanup();
});


test('Multiple routes with params', () => {



    const parentRouteRef = createRouteRef({ params: ['kind', 'namespace'] });
    const subRouteRef1 = parentRouteRef.createSubRouteRef({ basePath: 'sub1', params: ['name'] });
    const subRouteRef2 = parentRouteRef.createSubRouteRef({ basePath: 'sub2', params: ['name'] });

    const TestComponent: React.FC = () => {
        const { kind, namespace } = useRouteRefParams(parentRouteRef);

        return <div><p>Test Component </p><p>{kind}</p><p>{namespace}</p><Outlet /> </div>
    };
    const SubComponent1: React.FC = () => {
        const { name } = useRouteRefParams(subRouteRef1);
        return (<><p>Sub Component 1</p><p>{name}</p></>)
    };
    const SubComponent2: React.FC = () => {
        const { name } = useRouteRefParams(subRouteRef2);
        return (<><p>Sub Component 2</p><p>{name}</p></>)
    };

    const routeBinds = [
        createRoutableComponent({
            mountPoint: parentRouteRef,
            component: TestComponent,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef1,
            component: SubComponent1,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef2,
            component: SubComponent2,
        }),
    ];
    const resolver = createRouteResolver();
    resolver.addRoute('/parent', parentRouteRef)
    // Test for the first nested route
    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/parent/myKind/myNamespace'} />
            </AppRouter>
            );

    expect(screen.getByText('myKind')).toBeInTheDocument();
    cleanup();


    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/parent/myKind2/myNamespace/sub1/myName'} />
            </AppRouter>
            );
    expect(screen.getByText('myKind2')).toBeInTheDocument();
    expect(screen.getByText('myName')).toBeInTheDocument();
    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();
    cleanup();

    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo path={'/parent/myKind3/myNamespace/sub2/myName2'} />
            </AppRouter>
            );
    expect(screen.getByText('myKind3')).toBeInTheDocument();
    expect(screen.getByText('myName2')).toBeInTheDocument();
    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
    cleanup();

})

