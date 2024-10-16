import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { 
    createRouteRef,
    RoutableComponent,
    Routes, 
    AppRouter 
} from '../src';

const TestComponent: React.FC = () => <div>Test Component</div>;
const SubComponent1: React.FC = () => <div>Sub Component 1</div>;
const SubComponent2: React.FC = () => <div>Sub Component 2</div>;


test('renders without crashing', () => {
    const routeBinds = [
        {
            path: '/test',
            routableComponent: new RoutableComponent(createRouteRef(), <TestComponent />)
        }
    ];

    render(<Routes routeBinds={routeBinds} />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
});

test('renders correct component for registered route', () => {
    const routeBinds = [
        {
            path: '/test',
            routableComponent: new RoutableComponent(createRouteRef(), <TestComponent />)
        }
    ];

    render(<AppRouter><Routes routeBinds={routeBinds} /></AppRouter>);
    
    // Simulating navigation to the registered route
    window.history.pushState({}, 'Test Page', '/test');
    
    expect(screen.getByText('Test Component')).toBeInTheDocument();
});

test('renders nested routes correctly', () => {
    const parentRouteRef = createRouteRef();
    const subRouteRef1 = parentRouteRef.createSubRouteRef('/sub1');
    const subRouteRef2 = parentRouteRef.createSubRouteRef('/sub2');

    const routeBinds = [
        {
            path: '/parent',
            routableComponent: new RoutableComponent(parentRouteRef, <TestComponent />, [
                { routeRef: subRouteRef1, component: <SubComponent1 /> },
                { routeRef: subRouteRef2, component: <SubComponent2 /> },
            ])
        }
    ];

    render(<AppRouter><Routes routeBinds={routeBinds} /></AppRouter>);
    
    // Simulating navigation to the parent route
    window.history.pushState({}, 'Parent Page', '/parent');

    expect(screen.getByText('Test Component')).toBeInTheDocument();

    // Simulating navigation to the first nested route
    window.history.pushState({}, 'Sub1 Page', '/parent/sub1');
    expect(screen.getByText('Sub Component 1')).toBeInTheDocument();

    // Simulating navigation to the second nested route
    window.history.pushState({}, 'Sub2 Page', '/parent/sub2');
    expect(screen.getByText('Sub Component 2')).toBeInTheDocument();
});

