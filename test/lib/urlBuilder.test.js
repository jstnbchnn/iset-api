const { urlBuilder, buildParams, buildPath } = require('../../src/lib/urlBuilder');

test('return an empty string given no params', () => {
  let builtParams = buildParams({});

  expect(builtParams).toEqual(expect.stringMatching(''));
});

test('returns correctly formated params', () => {
  const paramsObject = {
    'tid': 2267,
    'did': 2233
  };

  let builtParams = buildParams(paramsObject);

  expect(builtParams).toEqual(expect.stringMatching(/\?tid=2267&did=2233/));
});

test('builds path correctly', () => {
  const path = buildPath(['http://example.com', 'foo', 'bar']);


  expect(path).toEqual(expect.stringMatching(/http:\/\/example.com\/foo\/bar/));
});

describe('urlBuilder', () => {
  test('returns the url built correctly', () => {
    const paths = ['http://example.com', 'foo', 'bar'];
    const params = {
      'tid': 2267,
      'did': 2233
    };

    const url = urlBuilder(paths, params);

    expect(url).toEqual(expect.stringMatching(
      /http:\/\/example.com\/foo\/bar\?tid=2267&did=2233/
    ));
  });
});