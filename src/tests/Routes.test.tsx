import React from 'react';
import {test, expect} from 'vitest'
import { useNavigate, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createRouteRef, RoutableComponent, Routes, AppRouter, useRouteRef, createRoutableComponent, useRouteResolver, createRouteResolver } from '../routing';


const TestComponent: React.FC = () => <div><p>Test Component</p><Outlet/> </div>;
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
            component: <TestComponent />,
            mountPoint: routeRef
        })
    ];


    const resolver = createRouteResolver();
    resolver.addRoute('', routeRef)
    
    render(<AppRouter resolver={resolver}> <Routes routeBinds={routeBinds} /><NavigateTo path={'/'} /></AppRouter>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    cleanup();
});

test('renders correct component for registered route', () => {

    const routeRef = createRouteRef();

    const routeBinds = [
        createRoutableComponent({
            mountPoint: routeRef,
            component: <TestComponent />
        })
    ];

    const resolver = createRouteResolver();
    resolver.addRoute('test', routeRef)
    render(
        <AppRouter resolver={resolver}>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'test'} />
        </AppRouter>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    cleanup();
});

test('renders nested routes correctly', () => {
    const parentRouteRef = createRouteRef();
    const subRouteRef1 = parentRouteRef.createSubRouteRef({basePath: 'sub1'});
    const subRouteRef2 = parentRouteRef.createSubRouteRef({basePath: 'sub2'});

    const routeBinds = [
        createRoutableComponent({
            mountPoint: parentRouteRef,
            component: <TestComponent />,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef1,
            component: <SubComponent1 />,
        }),
        createRoutableComponent({
            mountPoint: subRouteRef2,
            component: <SubComponent2 />,
        }),
    ];
    const resolver = createRouteResolver();
    resolver.addRoute('parent', parentRouteRef)
    // Test for the first nested route
    render(
        <AppRouter resolver={resolver}>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'parent/sub1'} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();
    cleanup();

    // Test for the second nested route
    render(
        <AppRouter resolver={resolver}>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'parent/sub2'} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
    cleanup();
});
