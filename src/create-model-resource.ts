import { RestModelResource } from './config/types';
import { createModelRoute } from './utils/create-model-route';
import { paths } from './config';
import { createNestedModelPrefix } from './utils/create-nested-model-prefix';

/**
 * Create a model resource
 */
export function createModelResource(modelName: string, options: RestModelResource.Options = {}): RestModelResource.API {
  const methods = {};

  let methodKeys = <RestModelResource.Routes[]>Object.keys(paths);

  if (options.only) {
    methodKeys = options.only;
  } else if (options.except) {
    methodKeys = methodKeys.filter(k => !(<RestModelResource.Routes[]>options.except).includes(k));
  }

  const { model, prefix } = createNestedModelPrefix(modelName);

  methodKeys.forEach(method => {
    methods[method] = function createRoute(id?: RestModelResource.ModelId | RestModelResource.ModelId[]): string {
      return createModelRoute({
        id,
        model,
        path: paths[method],
        prefix,
      });
    };
  });

  return new Proxy(<RestModelResource.API>methods, {
    get(target, propertyKey: RestModelResource.Routes, receiver) {
      if (methodKeys.includes(propertyKey)) {
        return Reflect.get(target, propertyKey, receiver);
      }

      throw new Error(`No route was defined for ${propertyKey}(). Make sure to define it in options.`);
    },
  });
}
