import { RestfulResource } from '../config/types';
export declare function createModelRoute({ id, model, path, prefix, }: {
    id?: RestfulResource.ModelId | RestfulResource.ModelId[];
    model: string;
    path: string;
    prefix?: string;
}): string;
