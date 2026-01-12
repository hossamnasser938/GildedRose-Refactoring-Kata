export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const QUALITY_LOWER_LIMIT = 0;
const QUALITY_UPPER_LIMIT = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private decrementSellIn(item: Item) {
    item.sellIn--;
  }

  private incrementQuality(item: Item) {
    if (item.quality < QUALITY_UPPER_LIMIT) {
      item.quality++;
    }
  }

  private decrementQuality(item: Item) {
    if (item.quality > QUALITY_LOWER_LIMIT) {
      item.quality--;
    }
  }

  private decreaseQuality(item: Item) {
    this.decrementQuality(item);

    if (item.sellIn < QUALITY_LOWER_LIMIT) {
      this.decrementQuality(item);
    }
  }

  private handleSulfurasItem(item: Item) {}

  private handleAgedBrieItem(item: Item) {
    this.decrementSellIn(item);
    this.incrementQuality(item);
    if (item.sellIn < 0) {
      this.incrementQuality(item);
    }
  }

  private handleBackstageItem(item: Item) {
    this.incrementQuality(item);
    if (item.sellIn < 11) {
      this.incrementQuality(item);
    }
    if (item.sellIn < 6) {
      this.incrementQuality(item);
    }
    this.decrementSellIn(item);
    if (item.sellIn < 0) {
      item.quality = QUALITY_LOWER_LIMIT;
    }
  }

  private handleNormalItem(item: Item) {
    this.decrementSellIn(item);
    this.decreaseQuality(item);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          this.handleSulfurasItem(item);
          break;
        case "Aged Brie":
          this.handleAgedBrieItem(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.handleBackstageItem(item);
          break;
        default:
          this.handleNormalItem(item);
      }
    }

    return this.items;
  }
}
