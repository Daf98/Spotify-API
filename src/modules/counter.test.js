jest.mock('./spotifyAPI.js');
const Counter = require('./__mocks__/counter.js');

const counter = new Counter();
const songCounter = [];

test('increases count by 1', () => {
  expect(counter.counter(songCounter)).toStrictEqual(['one', 'two', 'three', 'four', 'five', 'six']);
});