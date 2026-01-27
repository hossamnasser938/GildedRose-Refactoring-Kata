const QUALITY_LOWER_LIMIT = 0;
const QUALITY_UPPER_LIMIT = 50;

export abstract class ItemBehavior {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number,
  ) {}

  protected isQualityLowerLimitSafe() {
    return this.quality > QUALITY_LOWER_LIMIT;
  }

  protected isQualityUpperLimitSafe() {
    return this.quality < QUALITY_UPPER_LIMIT;
  }

  protected decrementSellIn() {
    this.sellIn--;
  }

  protected incrementQuality() {
    if (this.isQualityUpperLimitSafe()) {
      this.quality++;
    }
  }

  protected decrementQuality() {
    if (this.isQualityLowerLimitSafe()) {
      this.quality--;
    }
  }

  protected decreaseQuality() {
    this.decrementQuality();

    if (this.sellIn < 0) {
      this.decrementQuality();
    }
  }

  protected increaseQuality() {
    this.incrementQuality();

    if (this.sellIn < 0) {
      this.incrementQuality();
    }
  }

  abstract updateQuality();
}
