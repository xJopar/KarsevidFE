import { ComponentType, ReactNode } from "react";

export interface IRoute {
	path: string;
	component: ComponentType<ReactNode>;
	exact: boolean;
}
