import { createModelResource } from './create-model-resource';
import { RestModelResource } from './config/types';

describe('resource', () => {
  it('should include all rest methods by default', () => {
    const model = createModelResource('user');

    expect(model.index).not.toBeUndefined();
    expect(model.create).not.toBeUndefined();
    expect(model.store).not.toBeUndefined();
    expect(model.show).not.toBeUndefined();
    expect(model.edit).not.toBeUndefined();
    expect(model.update).not.toBeUndefined();
    expect(model.destroy).not.toBeUndefined();
  });

  it('should include only the methods specified with only', () => {
    const model = createModelResource('user', {
      only: [RestModelResource.Routes.Index, RestModelResource.Routes.Edit],
    });

    expect(model.index).not.toBeUndefined();
    expect(model.edit).not.toBeUndefined();

    expect(() => model.create()).toThrow();
    expect(() => model.store()).toThrow();
    expect(() => model.show()).toThrow();
    expect(() => model.update()).toThrow();
    expect(() => model.destroy()).toThrow();
  });

  it('should exclude only the methods that are specified in except', () => {
    const model = createModelResource('user', {
      except: [RestModelResource.Routes.Show, RestModelResource.Routes.Update],
    });

    expect(model.index).not.toBeUndefined();
    expect(model.create).not.toBeUndefined();
    expect(model.store).not.toBeUndefined();
    expect(model.edit).not.toBeUndefined();
    expect(model.destroy).not.toBeUndefined();

    expect(() => model.update()).toThrow();
    expect(() => model.show()).toThrow();
  });

  it('should create proper REST routes', () => {
    const model = createModelResource('users');

    expect(model.index()).toBe('/users');
    expect(model.create()).toBe('/users/create');
    expect(model.store()).toBe('/users');
    expect(model.show(3)).toBe('/users/3');
    expect(model.edit(4)).toBe('/users/4/edit');
    expect(model.update(5)).toBe('/users/5');
    expect(model.destroy('5')).toBe('/users/5');
  });

  it('should create proper nested REST routes', () => {
    const model = createModelResource('users.photos');

    expect(model.index(15)).toBe('/users/15/photos');
    expect(model.create(2)).toBe('/users/2/photos/create');
    expect(model.store(3)).toBe('/users/3/photos');
    expect(model.show([3, 4])).toBe('/users/3/photos/4');
    expect(model.edit([4, 5])).toBe('/users/4/photos/5/edit');
    expect(model.update([5, 4])).toBe('/users/5/photos/4');
    expect(model.destroy(['5', 200])).toBe('/users/5/photos/200');
  });

  it('should create proper nested REST routes', () => {
    const model = createModelResource('towns.ratings', {
      only: [RestModelResource.Routes.Index, RestModelResource.Routes.Update],
    });

    expect(model.index(15)).toBe('/towns/15/ratings');
    expect(model.update([5, 4])).toBe('/towns/5/ratings/4');
    expect(model.index()).toBe('/towns/ratings');
  });
});
