import { ItemBehavior } from "./item-behavior";

export class AgedBrieItemBehavior extends ItemBehavior {
  updateQuality() {
    this.decrementSellIn();
    this.increaseQuality();
  }
}
