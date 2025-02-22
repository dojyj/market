import { observable, action, computed } from 'mobx';

export default class MarketStore{
  @observable selectedItems = [];

  constructor(root) {
    this.root = root;
  }

  @action
  put = (name, price) => {
    const { number } = this.root.counter;
    const exists = this.selectedItems.find(item => item.name === name);
    if(!exists) {
      this.selectedItems.push({
        name,
        price,
        count:number,
      });
      return;
    }
    exists.count += number;
  };

  @action
  take = name => {
    const itemToTake = this.selectedItems.find(item => item.name === name);
    itemToTake.count--;
    if (itemToTake.count === 0) {
      this.selectedItems.remove(itemToTake);
    }
  };

  @computed
  get total() {
    console.log('총합 계산...');
    return this.selectedItems.reduce((prev,curr) =>{
      return prev + curr.price * curr.count;
    },0);
  }
}
