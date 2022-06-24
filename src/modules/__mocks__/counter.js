class Counter {
  constructor(data) {
    this.data = data;
  }

  counter = (songCounter) => {
    const array = ['one', 'two', 'three', 'four', 'five', 'six'];
    let count = 0;
    while (array.length > count) {
      songCounter[count] = array[count];
      count += 1;
    }
    return songCounter;
  };
}
module.exports = Counter;