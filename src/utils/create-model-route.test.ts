import { createModelRoute } from './create-model-route';
import { paths } from '../config';
import { createNestedModelPrefix } from './create-nested-model-prefix';

describe('createModelRoute', () => {
  it('return a model route', () => {
    const parsedRoute = createModelRoute({
      id: 1,
      model: 'photos',
      path: paths.show,
    });

    expect(parsedRoute).toEqual('/photos/1');
  });

  it('return a model route without an id', () => {
    const parsedRoute = createModelRoute({
      model: 'photos',
      path: paths.index,
    });

    expect(parsedRoute).toEqual('/photos');
  });

  it('return a model route with a prefix', () => {
    const parsedRoute = createModelRoute({
      id: [1, 2],
      model: 'comments',
      path: paths.show,
      prefix: createNestedModelPrefix('photos.comments').prefix,
    });

    expect(parsedRoute).toEqual('/photos/1/comments/2');
  });

  // check for each method
  it('return a model route with a prefix for create method', () => {
    const parsedRoute = createModelRoute({
      model: 'comments',
      path: paths.create,
    });

    expect(parsedRoute).toEqual('/comments/create');
  });

  it('return a model route with a prefix for destroy method', () => {
    const parsedRoute = createModelRoute({
      id: 1,
      model: 'comments',
      path: paths.destroy,
    });

    expect(parsedRoute).toEqual('/comments/1');
  });

  it('return a model route with a prefix for edit method', () => {
    const parsedRoute = createModelRoute({
      id: 3,
      model: 'comments',
      path: paths.edit,
    });

    expect(parsedRoute).toEqual('/comments/3/edit');
  });

  it('return a model route with a prefix for index method', () => {
    const parsedRoute = createModelRoute({
      id: 1,
      model: 'comments',
      path: paths.index,
      prefix: createNestedModelPrefix('photos.comments').prefix,
    });

    expect(parsedRoute).toEqual('/photos/1/comments');
  });
});
