import { createModelRoute } from './utils/create-model-route';
import { paths } from './config';
import { createNestedModelPrefix } from './utils/create-nested-model-prefix';
export function createRestfulResource(modelName, options = {}) {
    const methods = {};
    let methodKeys = Object.keys(paths);
    if (options.only) {
        methodKeys = options.only;
    }
    else if (options.except) {
        methodKeys = methodKeys.filter(k => !options.except.includes(k));
    }
    const { model, prefix } = createNestedModelPrefix(modelName);
    methodKeys.forEach(method => {
        methods[method] = function createRoute(id) {
            return createModelRoute({
                id,
                model,
                path: paths[method],
                prefix,
            });
        };
    });
    return new Proxy(methods, {
        get(target, propertyKey, receiver) {
            if (methodKeys.includes(propertyKey)) {
                return Reflect.get(target, propertyKey, receiver);
            }
            throw new Error(`No route was defined for ${propertyKey}(). Make sure to define it in options.`);
        },
    });
}
