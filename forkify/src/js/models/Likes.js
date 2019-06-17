export default class Likes {
  constructor() {
    this.Likes = [];
  }

  addLike(id, title, author, img) {
    const Like = { id, title, author, img };
    this.Likes.push(Like);
    return Like;
  }

  deleteLike(id) {
    const index = this.Likes.findIndex(el => el.id === id);
    this.Likes.splice(index, 1);
  }

  isLiked(id) {
    // retrun true or falsy
    return this.Likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.Likes.length;
  }
}
