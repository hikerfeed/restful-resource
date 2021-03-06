export declare namespace RestfulResource {
    interface API {
        create(id?: ModelId | ModelId[]): string;
        edit(id?: ModelId | ModelId[]): string;
        destroy(id?: ModelId | ModelId[]): string;
        index(id?: ModelId | ModelId[]): string;
        show(id?: ModelId | ModelId[]): string;
        store(id?: ModelId | ModelId[]): string;
        update(id?: ModelId | ModelId[]): string;
    }
    interface Options {
        only?: Routes[];
        except?: Routes[];
    }
    enum Routes {
        Create = "create",
        Edit = "edit",
        Destroy = "destroy",
        Index = "index",
        Show = "show",
        Store = "store",
        Update = "update"
    }
    type ModelId = number | string;
}
