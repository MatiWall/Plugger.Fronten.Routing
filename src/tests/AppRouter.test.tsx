import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Link, Route, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { createRouteRef, createRoutableComponent, createRouteResolver, useRouteRef } from '../routing';
import { AppRouter, RoutesBuilder } from '../routing';

import { expect, test } from 'vitest';



const SubComponent1 = () => <div>Sub Component 1</div>;
const SubComponent2 = () => <div>Sub Component 2</div>;

test('renders nested routes and navigates with Link correctly', () => {
  const parentRouteRef = createRouteRef();
  const subRouteRef1 = parentRouteRef.createSubRouteRef({ basePath: 'sub1' });
  const subRouteRef2 = parentRouteRef.createSubRouteRef({ basePath: 'sub2' });

  const TestComponent = () => {



    return (
      <div>
        <h1>Parent Component</h1>
        <nav>
          <Link to={useRouteRef(subRouteRef1)()}>Go to Sub1</Link>
          <Link to={useRouteRef(subRouteRef2)()}>Go to Sub2</Link>
        </nav>
        <Outlet />
      </div>
    )
  };

  // Mock route bindings
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
  resolver.addRoute('/', parentRouteRef);

  // Render the AppRouter with Routes
  const { debug } = render(
          <AppRouter resolver={resolver}>
        <RoutesBuilder routeBinds={routeBinds} />
      </AppRouter>
      );

  // Verify the parent component is displayed
  expect(screen.getByText('Parent Component')).toBeInTheDocument();

  // Navigate to Sub1
  fireEvent.click(screen.getByText('Go to Sub1'));
  expect(screen.getByText('Sub Component 1')).toBeInTheDocument();


  // Navigate to Sub2
  fireEvent.click(screen.getByText('Go to Sub2'));
  expect(screen.getByText('Sub Component 2')).toBeInTheDocument();

});