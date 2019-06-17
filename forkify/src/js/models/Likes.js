export default class Likes {
  constructor() {
    this.likes = likes;
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.like.psuh(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    // retrun true or falsy
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
