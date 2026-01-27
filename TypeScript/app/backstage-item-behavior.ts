import { ItemBehavior } from "./item-behavior";

export class BackStageItemBehavior extends ItemBehavior {
  updateQuality() {
    this.incrementQuality();
    if (this.sellIn < 11) {
      this.incrementQuality();
    }
    if (this.sellIn < 6) {
      this.incrementQuality();
    }
    this.decrementSellIn();
    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }
}
