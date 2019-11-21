export namespace RestfulResource {
  export interface API {
    create(id?: ModelId | ModelId[]): string;
    edit(id?: ModelId | ModelId[]): string;
    destroy(id?: ModelId | ModelId[]): string;
    index(id?: ModelId | ModelId[]): string;
    show(id?: ModelId | ModelId[]): string;
    store(id?: ModelId | ModelId[]): string;
    update(id?: ModelId | ModelId[]): string;
  }

  export interface Options {
    baseUrl?: string;
    only?: Routes[];
    except?: Routes[];
  }

  export const enum Routes {
    Create = 'create',
    Edit = 'edit',
    Destroy = 'destroy',
    Index = 'index',
    Show = 'show',
    Store = 'store',
    Update = 'update',
  }

  export type ModelId = number | string;
}
