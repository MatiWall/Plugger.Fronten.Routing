import { useParams } from "react-router-dom";
import { RouteRef } from "./RouteRef";


function useRouteRefParams(routeRef: RouteRef){
    const pathParams = useParams();

    return pathParams
}

export {
    useRouteRefParams
};