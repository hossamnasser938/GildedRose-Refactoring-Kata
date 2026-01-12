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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > QUALITY_LOWER_LIMIT) {
          item.quality = item.quality - 1;
        }
      } else {
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
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > QUALITY_LOWER_LIMIT) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = QUALITY_LOWER_LIMIT;
          }
        } else {
          if (item.quality < QUALITY_UPPER_LIMIT) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
