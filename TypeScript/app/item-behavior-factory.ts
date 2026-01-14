import { AgedBrieItemBehavior } from "./aged-brie-item-behavior";
import { BackStageItemBehavior } from "./backstage-item-behavior";
import { NormalItemBehavior } from "./normal-item-behaior";
import { SulfurasItemBehavior } from "./sulfuras-item-behavior";

export class ItemBehaviorFactory {
  static create(name: string, sellIn: number, quality: number) {
    switch (name) {
      case "Sulfuras, Hand of Ragnaros":
        return new SulfurasItemBehavior(name, sellIn, quality);
      case "Aged Brie":
        return new AgedBrieItemBehavior(name, sellIn, quality);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackStageItemBehavior(name, sellIn, quality);
      default:
        return new NormalItemBehavior(name, sellIn, quality);
    }
  }
}
