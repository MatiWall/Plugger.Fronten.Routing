import { InvalidPathError, RouteResolver, createRouteRef } from "../src";


test('Route to route ref', () => {

    const testRouteRef1 = createRouteRef();
    const testRouteRef2 = createRouteRef();
    const testRouteRef3 = createRouteRef();

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path1', testRouteRef1);
    routeResolver.addRoute('/path2', testRouteRef2);
    routeResolver.addRoute('/path3', testRouteRef3);


    expect(routeResolver.resolveRoute('/path1')).toBe(testRouteRef1);
    expect(routeResolver.resolveRoute('/path2')).toBe(testRouteRef2);
    expect(routeResolver.resolveRoute('/path3')).toBe(testRouteRef3)
})

test('RouteRef to route', () => {

    const testRouteRef1 = createRouteRef();
    const testRouteRef2 = createRouteRef();
    const testRouteRef3 = createRouteRef();

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path1', testRouteRef1);
    routeResolver.addRoute('/path2', testRouteRef2);
    routeResolver.addRoute('/path3', testRouteRef3);


    expect(routeResolver.resolveRouteRef(testRouteRef1)).toBe('/path1');

})



test('RouteRef to route with params', () => {

    const testRouteRef1 = createRouteRef({params: ['kind']});
    const testRouteRef2 = createRouteRef({params: ['kind', 'namespace', 'name']});
    const testRouteRef3 = createRouteRef({params: ['param1', 'param2', 'param3', 'param4']});

    const routeResolver = new RouteResolver();
    


    expect(() => {
        routeResolver.addRoute('/path1', testRouteRef1);
    }).toThrow(InvalidPathError); 

    expect(() => {
        routeResolver.addRoute('/path1/:kind/:namespace/:name', testRouteRef2);
    }).not.toThrow(); 

    expect(() => {
        routeResolver.addRoute('/path3/:param1/:param2/:param3/:param4', testRouteRef3);
    }).not.toThrow(); 

    expect(() => { // Spell mistake
        routeResolver.addRoute('/path3/:param1/:params2/:param3/:param4', testRouteRef3);
    }).toThrow(InvalidPathError);
    

    expect(() => { // Already exists
        routeResolver.addRoute('/path1/:kind/:namespace/:name', testRouteRef1);
    }).toThrow(InvalidPathError);
    
    

})