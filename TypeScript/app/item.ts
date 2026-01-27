import { ItemBehavior } from "./item-behavior";
import { ItemBehaviorFactory } from "./item-behavior-factory";

export class Item {
  private behavior: ItemBehavior;

  constructor(name: string, sellIn: number, quality: number) {
    this.behavior = ItemBehaviorFactory.create(name, sellIn, quality);

    Object.defineProperty(this, "behavior", {
      value: this.behavior,
      enumerable: false,
    });

    Object.defineProperty(this, "name", {
      get: () => this.behavior.name,
      enumerable: true,
    });

    Object.defineProperty(this, "sellIn", {
      get: () => this.behavior.sellIn,
      enumerable: true,
    });

    Object.defineProperty(this, "quality", {
      get: () => this.behavior.quality,
      enumerable: true,
    });
  }

  updateQuality() {
    this.behavior.updateQuality();
  }

  get name() {
    return this.behavior.name;
  }

  get sellIn() {
    return this.behavior.sellIn;
  }

  get quality() {
    return this.behavior.quality;
  }
}
