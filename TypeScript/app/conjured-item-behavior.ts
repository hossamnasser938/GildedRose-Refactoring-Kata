import { ItemBehavior } from "./item-behavior";

export class ConjuredItemBehavior extends ItemBehavior {
  updateQuality() {
    this.decrementSellIn();
    this.decrementQuality();
    this.decrementQuality();
  }
}
