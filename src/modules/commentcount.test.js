jest.mock('./spotifyAPI.js');
const CommentCounter = require('./__mocks__/commentcount.js');

const counter = new CommentCounter();
// const commentCounter = [];
describe('counter', () => {
  test('returns the length', () => {
    expect(counter.commentCount()).toStrictEqual(4);
  });

  test('increases count by 1', () => {
    expect(counter.increaseCount()).toStrictEqual(5);
  });
});
