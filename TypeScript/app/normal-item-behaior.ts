import { ItemBehavior } from "./item-behavior";

export class NormalItemBehavior extends ItemBehavior {
  updateQuality() {
    this.decrementSellIn();
    this.decreaseQuality();
  }
}
