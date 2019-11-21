import { RestfulResource } from './config/types';
import { createModelRoute } from './utils/create-model-route';
import { paths } from './config';
import { createNestedModelPrefix } from './utils/create-nested-model-prefix';

/**
 * Create a restful resource
 */
export function createRestfulResource(modelName: string, options: RestfulResource.Options = {}): RestfulResource.API {
  const methods = {};

  let methodKeys = <RestfulResource.Routes[]>Object.keys(paths);

  if (options.only) {
    methodKeys = options.only;
  } else if (options.except) {
    methodKeys = methodKeys.filter(k => !(<RestfulResource.Routes[]>options.except).includes(k));
  }

  const { model, prefix } = createNestedModelPrefix(modelName);

  methodKeys.forEach(method => {
    methods[method] = function createRoute(id?: RestfulResource.ModelId | RestfulResource.ModelId[]): string {
      return createModelRoute({
        id,
        model,
        path: paths[method],
        prefix,
      });
    };
  });

  return new Proxy(<RestfulResource.API>methods, {
    get(target, propertyKey: RestfulResource.Routes, receiver) {
      if (methodKeys.includes(propertyKey)) {
        return Reflect.get(target, propertyKey, receiver);
      }

      throw new Error(`No route was defined for ${propertyKey}(). Make sure to define it in options.`);
    },
  });
}
