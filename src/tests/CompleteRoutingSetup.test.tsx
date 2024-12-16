import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRouteRef, RoutableComponent, Routes, AppRouter, useRouteRef, createRoutableComponent, RouteRef } from '../routing';

const TestComponent: React.FC = () => <div><p>Test Component</p><Outlet/> </div>;
const SubComponent1: React.FC = () => <div>Sub Component 1</div>;
const SubComponent2: React.FC = () => <div>Sub Component 2</div>;

interface NavigateToProps {
    routeRef: RouteRef;
}

const NavigateTo: React.FC<NavigateToProps> = ({ routeRef }) => {
    const navigate = useNavigate();
    const routeBuilder = useRouteRef(routeRef);

    React.useEffect(() => {
        const path = routeBuilder(); // Resolve the path from the routeRef
        navigate(path); // Navigate to the generated path
    }, [navigate, routeBuilder]);

    return null; // Render nothing, as this component only performs navigation
};


test('renders nested routes correctly', () => {
    const parentRouteRef = createRouteRef();
    const subRouteRef1 = parentRouteRef.createSubRouteRef('sub1');
    const subRouteRef2 = parentRouteRef.createSubRouteRef('sub2');

    const routeBinds = [
        createRoutableComponent({
            path: '/parent',
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

    // Test for the first nested route
    render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo routeRef={subRouteRef1} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();

    // Test for the second nested route
    render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo routeRef={subRouteRef2} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
});
