import getComment from './getcomment.js';

const commentCount = async (id) => {
  const count = await getComment(id);
  return count.length;
};

export const increaseCount = async (id) => {
  const count = await getComment(id);
  return count.length;
};
export default commentCount;
