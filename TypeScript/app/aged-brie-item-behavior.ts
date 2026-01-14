import { ItemBehavior } from "./item-behavior";

export class AgedBrieItemBehavior extends ItemBehavior {
  updateQuality() {
    this.decrementSellIn();
    this.incrementQuality();
    if (this.sellIn < 0) {
      this.incrementQuality();
    }
  }
}
