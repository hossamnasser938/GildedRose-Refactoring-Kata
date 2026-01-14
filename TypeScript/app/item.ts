import { ItemBehavior } from "./item-behavior";
import { ItemBehaviorFactory } from "./item-behavior-factory";

export class Item {
  private impl: ItemBehavior;

  constructor(name: string, sellIn: number, quality: number) {
    this.impl = ItemBehaviorFactory.create(name, sellIn, quality);

    Object.defineProperty(this, "impl", {
      value: this.impl,
      enumerable: false,
    });

    Object.defineProperty(this, "name", {
      get: () => this.impl.name,
      enumerable: true,
    });

    Object.defineProperty(this, "sellIn", {
      get: () => this.impl.sellIn,
      enumerable: true,
    });

    Object.defineProperty(this, "quality", {
      get: () => this.impl.quality,
      enumerable: true,
    });
  }

  updateQuality() {
    this.impl.updateQuality();
  }

  get name() {
    return this.impl.name;
  }

  get sellIn() {
    return this.impl.sellIn;
  }

  get quality() {
    return this.impl.quality;
  }
}
