import { ItemBehavior } from "./item-behavior";

export class ItemBehaviorFactory {
  static create(name: string, sellIn: number, quality: number) {
    switch (name) {
      case "Sulfuras, Hand of Ragnaros":
        return new ItemBehavior(name, sellIn, quality);
      case "Aged Brie":
        return new ItemBehavior(name, sellIn, quality);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new ItemBehavior(name, sellIn, quality);
      default:
        return new ItemBehavior(name, sellIn, quality);
    }
  }
}
