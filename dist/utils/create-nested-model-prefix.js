export function createNestedModelPrefix(model) {
    const childRegex = /\./;
    if (childRegex.test(model)) {
        const models = model.split('.');
        const chunks = [];
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
