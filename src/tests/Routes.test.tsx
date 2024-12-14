import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRouteRef, RoutableComponent, Routes, AppRouter } from '../routing';

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
        {
            path: '/',
            routableComponent: new RoutableComponent(createRouteRef(), <TestComponent />)
        }
    ];
    
    render(<AppRouter><Routes routeBinds={routeBinds} /><NavigateTo path={'/'} /></AppRouter>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
});

test('renders correct component for registered route', () => {
    const routeBinds = [
        {
            path: '/test',
            routableComponent: new RoutableComponent(createRouteRef(), <TestComponent />)
        }
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
    const subRouteRef1 = parentRouteRef.createSubRouteRef('sub1');
    const subRouteRef2 = parentRouteRef.createSubRouteRef('sub2');

    const routeBinds = [
        {
            path: '/parent',
            routableComponent: new RoutableComponent(parentRouteRef, <TestComponent />, [
                { routeRef: subRouteRef1, component: <SubComponent1 /> },
                { routeRef: subRouteRef2, component: <SubComponent2 /> },
            ])
        }
    ];

    render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'/parent/sub1'} />
        </AppRouter>
    );

    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();

    // Simulating navigation to the second nested route
    const r = render(
        <AppRouter>
            <Routes routeBinds={routeBinds} />
            <NavigateTo path={'/parent/sub2'} />
        </AppRouter>
    );
    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
});
