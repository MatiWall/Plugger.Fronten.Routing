import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRouteRef, RoutableComponent, Routes, AppRouter, useRouteRef, createRoutableComponent } from '../routing';

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
    const routeBinds = [
        createRoutableComponent({
            path: '/',
            component: <TestComponent />,
            mountPoint: createRouteRef()
        })
    ];
    
    render(<AppRouter><Routes routeBinds={routeBinds} /><NavigateTo path={'/'} /></AppRouter>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
});

test('renders correct component for registered route', () => {
    const routeBinds = [
        createRoutableComponent({
            path: '/test', 
            mountPoint: createRouteRef(),
            component: <TestComponent />
        })
    ];

    
    render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'/test'} />
        </AppRouter>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
});

test('renders nested routes correctly', () => {
    const parentRouteRef = createRouteRef();
    const subRouteRef1 = parentRouteRef.createSubRouteRef({basePath: 'sub1'});
    const subRouteRef2 = parentRouteRef.createSubRouteRef({basePath: 'sub2'});

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
            <NavigateTo path={'/parent/sub1'} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();

    // Test for the second nested route
    render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'/parent/sub2'} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
});
