import { useParams } from "react-router-dom";
import { RouteRef } from "./RouteRef";


function useRouteRefParams(routeRef: RouteRef<any>) {
    const pathParams = useParams();

    if (!routeRef.params.length) {
        return {};
    }

    const matchedParams: Partial<{ [key: string]: string }> = {};

    for (const param of routeRef.params) {
        if (pathParams[param]) {
            matchedParams[param] = pathParams[param];
        }
    }
return matchedParams;
}

export {
    useRouteRefParams
};