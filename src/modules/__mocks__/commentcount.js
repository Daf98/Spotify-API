class CommentCounter {
  constructor(data) {
    this.data = data;
  }

  commentCount = () => {
    const count = [1, 2, 3, 4];
    return count.length;
  };

  increaseCount = () => {
    const count = [1, 2, 3, 4];
    count.length += 1;
    return count.length;
  };
}

module.exports = CommentCounter;
