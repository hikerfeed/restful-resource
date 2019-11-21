export interface NestedRoutes {
    prefix?: string;
    model: string;
}
export declare function createNestedModelPrefix(model: string): NestedRoutes;
