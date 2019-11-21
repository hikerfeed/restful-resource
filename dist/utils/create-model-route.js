export function createModelRoute({ id, model, path, prefix, }) {
    let joinedPath = [prefix, path].filter(Boolean).join('/');
    joinedPath = joinedPath.replace(/model/g, model);
    if (Array.isArray(id)) {
        id.forEach(k => {
            joinedPath = joinedPath.replace(/id/, `${k}`);
        });
    }
    else if (typeof id !== 'undefined') {
        joinedPath = joinedPath.replace(/id/, id);
    }
    else {
        joinedPath = joinedPath.replace(/id/g, '');
    }
    return joinedPath
        .replace(/\{|\}/g, '')
        .replace(/\/\//g, '/')
        .replace(/\/\//g, '/');
}
