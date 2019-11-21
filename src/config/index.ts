import { RestModelResource } from './types';

/**
 * Default model url.
 */
const modelUrl: string = `/{model}/{id}`;

/**
 * A mapping of paths for the resource method.
 */
export const paths: Record<RestModelResource.Routes, string> = {
  create: `/{model}/create`,
  destroy: modelUrl,
  edit: `/{model}/{id}/edit`,
  index: `/{model}`,
  show: modelUrl,
  store: `/{model}`,
  update: modelUrl,
};
