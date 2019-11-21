import { RestModelResource } from '../config/types';
export declare function createModelRoute({ id, model, path, prefix, }: {
    id?: RestModelResource.ModelId | RestModelResource.ModelId[];
    model: string;
    path: string;
    prefix?: string;
}): string;
