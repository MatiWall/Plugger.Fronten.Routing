import { ReactNode } from "react"
import { RouteRef } from "./RouteRef/RouteRef"

type Route =  {
    readonly id: string,
    params: string[]
}

type RouteMap = {
    routeRef: RouteRef,
    component:  ReactNode
}

export type {
    Route,
    RouteMap
};