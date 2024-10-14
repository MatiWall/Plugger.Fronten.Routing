import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useRouteRefParams } from '../src'; // Adjust the path as necessary
import { createRouteRef } from '../src'; // Adjust if needed

it('should return matched parameters from the URL', () => {
// Create a RouteRef with specific params
const routeRef = createRouteRef({ params: ['kind', 'namespace', 'name'] });

// Render the hook inside a mocked router
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/path1/system/default/my-name']}>
    <Routes>
        <Route path="/path1/:kind/:namespace/:name" element={children} />
    </Routes>
    </MemoryRouter>
);

const { result } = renderHook(() => useRouteRefParams(routeRef), { wrapper });

// Expect the matched params to be returned
expect(result.current).toEqual({
    kind: 'system',
    namespace: 'default',
    name: 'my-name',
});
});