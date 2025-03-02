import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useRouteRefParams } from '../routing'; // Adjust the path as necessary
import { createRouteRef } from '../routing'; // Adjust if needed
import { it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";


// Create a RouteRef with specific params
const routeRef = createRouteRef({ params: ["kind", "namespace", "name"] });

// Test component to extract and display the route params
const TestComponent = () => {
const params = useRouteRefParams(routeRef);

  return (
    <div>
      <span data-testid="kind">{params.kind}</span>
      <span data-testid="namespace">{params.namespace}</span>
      <span data-testid="name">{params.name}</span>
    </div>
  );
};

it("should return matched parameters from the URL", () => {
  render(
    <MemoryRouter initialEntries={["/path1/system/default/my-name"]}>
      <Routes>
        <Route path="/path1/:kind/:namespace/:name" element={<TestComponent />} />
      </Routes>
    </MemoryRouter>
  );

  // Assert that the extracted params match the expected values
  expect(screen.getByTestId("kind").textContent).toBe("system");
  expect(screen.getByTestId("namespace").textContent).toBe("default");
  expect(screen.getByTestId("name").textContent).toBe("my-name");
});