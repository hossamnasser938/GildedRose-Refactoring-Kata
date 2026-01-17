import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("Normal products decresing quality", () => {
    it("one time update quality", () => {
      const gildedRose = new GildedRose([new Item("normal-product", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(9);
    });

    it("more than one time update quality", () => {
      const gildedRose = new GildedRose([new Item("normal-product", 10, 10)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(7);
    });

    it("quality lower limit is respected", () => {
      const gildedRose = new GildedRose([new Item("normal-product", 10, 1)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(0);
    });
  });

  describe("(Conjured) items degrade in Quality twice as fast as normal items", () => {
    it("one time update quality", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(8);
    });

    it("more than one time update quality", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 10, 10)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(4);
    });

    it("quality lower limit is respected", () => {
      const gildedRose = new GildedRose([new Item("normal-product", 10, 1)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(0);
    });
  });

  describe("(Sulfuras, Hand of Ragnaros) remaining constant", () => {
    it("quality and sellIn never changes", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("(Aged Brie) product increasing quality", () => {
    it("one time update quality", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(11);
    });

    it("more than one time update quality", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 10)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(13);
    });

    it("quality upper limit is respected", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 49)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(50);
    });
  });

  describe("(Backstage passes to a TAFKAL80ETC concert) increasing quality with exceptional rules", () => {
    it("normal behavior quality increases by 1", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20),
      ]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(18);
      expect(items[0].quality).toBe(22);
    });

    it("exceptional behavior quality increases by 2", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(14);
    });

    it("exceptional behavior quality increases by 3", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      ]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(11);
    });

    it("quality is set to 0 when sellIn reaches 0(after the concert)", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it("quality upper limit is respected", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 20, 49),
      ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(17);
      expect(items[0].quality).toBe(50);
    });
  });
});
