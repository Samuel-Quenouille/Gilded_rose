const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  let listItems;

  beforeEach(() => {
    listItems = [];
  });

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("Tester si la qualité augmente par 3 quand il reste 5 jours ou moins (Backstage passes)", () => {
    const listItems = [];
    listItems.push(new Item('Aged Brie', 5, 30));
    listItems.push(new Item('Backstage passes to a TAFKAL80ETC concert', 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 4, quality: 31 },
      { sellIn: 3, quality: 31 },
    ];
    expected.forEach((testCase, i) => {
      expect(items[i].quality).toBe(testCase.quality);
      expect(items[i].sellIn).toBe(testCase.sellIn);
    });
  });

  it('Ne pas modifier la qualité de Sulfuras', () => {
    listItems.push(new Item('Sulfuras, Hand of Ragnaros', 5, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });
});
