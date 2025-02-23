import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react';
import { createRouteRef, RoutesBuilder, AppRouter, useRouteRef, createRoutableComponent, RouteRef, useRouteResolver, createRouteResolver } from '../routing';

const TestComponent: React.FC = () => <div><p>Test Component</p><Outlet /> </div>;
const SubComponent1: React.FC = () => <div>Sub Component 1</div>;
const SubComponent2: React.FC = () => <div>Sub Component 2</div>;

interface NavigateToProps {
    routeRef: RouteRef;
}

const NavigateTo: React.FC<NavigateToProps> = ({ routeRef }) => {
    const navigate = useNavigate();
    const routeBuilder = useRouteRef(routeRef);
    const path = routeBuilder();
    React.useEffect(() => {
        // Resolve the path from the routeRef
        navigate(path); // Navigate to the generated path
    }, [navigate, path]); // Dependencies should only change when necessary

    return null; // Render nothing, as this component only performs navigation
};


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
                <NavigateTo routeRef={subRouteRef1} />
            </AppRouter>
            );


    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();
    cleanup();
    // Test for the second nested route
    render(
                    <AppRouter resolver={resolver}>
                <RoutesBuilder routeBinds={routeBinds} />
                <NavigateTo routeRef={subRouteRef2} />
            </AppRouter>
            );

    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
    cleanup();
});
