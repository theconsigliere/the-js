import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    //push to array
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    // [2,4,8] splice(1,2) -> returns [4,8] mutates original array = [2]
    // splice first argument start point, second argument how many elements
    // [2,4 8] slice(1,2) -> returns 4, original array is [2, 4, 8]
    // slice first argument start point, second  argument end point
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}
