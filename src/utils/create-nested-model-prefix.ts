export interface NestedRoutes {
  prefix?: string;
  model: string;
}

/**
 * Create a nested model prefix for the given model.
 */
export function createNestedModelPrefix(model: string): NestedRoutes {
  const childRegex = /\./;

  if (childRegex.test(model)) {
    const models = model.split('.');
    const chunks: string[] = [];

    for (let i = 0; i < models.length - 1; i++) {
      chunks.push(`${models[i]}/{id}`);
    }

    return {
      model: models[models.length - 1],
      prefix: `/${chunks.join('/')}`,
    };
  }

  return {
    model,
  };
}
