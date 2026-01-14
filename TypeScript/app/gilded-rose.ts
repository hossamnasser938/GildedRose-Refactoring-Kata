const QUALITY_LOWER_LIMIT = 0;
const QUALITY_UPPER_LIMIT = 50;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decrementSellIn() {
    this.sellIn--;
  }

  incrementQuality() {
    if (this.quality < QUALITY_UPPER_LIMIT) {
      this.quality++;
    }
  }

  decrementQuality() {
    if (this.quality > QUALITY_LOWER_LIMIT) {
      this.quality--;
    }
  }

  decreaseQuality() {
    this.decrementQuality();

    if (this.sellIn < 0) {
      this.decrementQuality();
    }
  }

  updateSulfurasItemQuality() {}

  updateAgedBrieItemQuality() {
    this.decrementSellIn();
    this.incrementQuality();
    if (this.sellIn < 0) {
      this.incrementQuality();
    }
  }

  updateBackstageItemQuality() {
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

  updateNormalItemQuality() {
    this.decrementSellIn();
    this.decreaseQuality();
  }

  updateItemQuality() {
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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateItemQuality();
    }

    return this.items;
  }
}
