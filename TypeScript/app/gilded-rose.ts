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

  decrementSellIn(item: Item) {
    item.sellIn--;
  }

  incrementQuality(item: Item) {
    if (item.quality < QUALITY_UPPER_LIMIT) {
      item.quality++;
    }
  }

  decrementQuality(item: Item) {
    if (item.quality > QUALITY_LOWER_LIMIT) {
      item.quality--;
    }
  }

  decreaseQuality(item: Item) {
    this.decrementQuality(item);

    if (item.sellIn < QUALITY_LOWER_LIMIT) {
      this.decrementQuality(item);
    }
  }

  isNormalItem(item) {
    return (
      item.name !== "Sulfuras, Hand of Ragnaros" &&
      item.name !== "Aged Brie" &&
      item.name !== "Backstage passes to a TAFKAL80ETC concert"
    );
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this.isNormalItem(item)) {
        this.decrementSellIn(item);
        this.decreaseQuality(item);
        continue;
      }

      if (item.name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (item.quality < QUALITY_UPPER_LIMIT) {
        item.quality = item.quality + 1;
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 11) {
            if (item.quality < QUALITY_UPPER_LIMIT) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < QUALITY_UPPER_LIMIT) {
              item.quality = item.quality + 1;
            }
          }
        }
      }

      this.decrementSellIn(item);

      if (item.sellIn < 0) {
        if (item.name === "Aged Brie") {
          if (item.quality < QUALITY_UPPER_LIMIT) {
            item.quality = item.quality + 1;
          }
        } else {
          if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
            item.quality = QUALITY_LOWER_LIMIT;
          }
        }
      }
    }

    return this.items;
  }
}
