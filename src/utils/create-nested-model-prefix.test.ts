import { createNestedModelPrefix } from './create-nested-model-prefix';

describe('createNestedModelPrefix', () => {
  it('should return an empty string when no dot is present', () => {
    expect(createNestedModelPrefix('photos')).toEqual({
      model: 'photos',
    });
  });

  it('should return a new path for the parent and child model', () => {
    expect(createNestedModelPrefix('photos.comments')).toEqual({
      model: 'comments',
      prefix: '/photos/{id}',
    });
  });

  it('should return a new path for multiple routes', () => {
    expect(createNestedModelPrefix('foo.bar.baz.bong')).toEqual({
      model: 'bong',
      prefix: '/foo/{id}/bar/{id}/baz/{id}',
    });
  });
});
