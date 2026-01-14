const QUALITY_LOWER_LIMIT = 0;
const QUALITY_UPPER_LIMIT = 50;

class ItemBehavior {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  private decrementSellIn() {
    this.sellIn--;
  }

  private incrementQuality() {
    if (this.quality < QUALITY_UPPER_LIMIT) {
      this.quality++;
    }
  }

  private decrementQuality() {
    if (this.quality > QUALITY_LOWER_LIMIT) {
      this.quality--;
    }
  }

  private decreaseQuality() {
    this.decrementQuality();

    if (this.sellIn < 0) {
      this.decrementQuality();
    }
  }

  private updateSulfurasItemQuality() {}

  private updateAgedBrieItemQuality() {
    this.decrementSellIn();
    this.incrementQuality();
    if (this.sellIn < 0) {
      this.incrementQuality();
    }
  }

  private updateBackstageItemQuality() {
    this.incrementQuality();
    if (this.sellIn < 11) {
      this.incrementQuality();
    }
    if (this.sellIn < 6) {
      this.incrementQuality();
    }
    this.decrementSellIn();
    if (this.sellIn < 0) {
      this.quality = QUALITY_LOWER_LIMIT;
    }
  }

  private updateNormalItemQuality() {
    this.decrementSellIn();
    this.decreaseQuality();
  }

  updateQuality() {
    switch (this.name) {
      case "Sulfuras, Hand of Ragnaros":
        this.updateSulfurasItemQuality();
        break;
      case "Aged Brie":
        this.updateAgedBrieItemQuality();
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        this.updateBackstageItemQuality();
        break;
      default:
        this.updateNormalItemQuality();
    }
  }
}

class ItemBehaviorFactory {
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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateQuality();
    }

    return this.items;
  }
}
