/**
 * MENU
 * ------------------------------------------------------------------
 * SAMPLE CONTENT — replace with the client's final menu, prices and
 * allergen information. Dietary tags: V (vegetarian), VE (vegan),
 * GF (gluten-free), GFO (gluten-free option), DF (dairy-free), N (contains nuts).
 *
 * Allergens use the UK's 14 regulated allergens. Keep them accurate —
 * this is a legal requirement, not decoration.
 */
export type Dish = {
  name: string;
  desc?: string;
  price: string;
  tags?: string[];
  allergens?: string[];
};

export type MenuSection = { title: string; note?: string; items: Dish[] };
export type Menu = {
  id: string;
  label: string;
  served: string;
  intro?: string;
  sections: MenuSection[];
};

export const dietaryKey = [
  { tag: "V", label: "Vegetarian" },
  { tag: "VE", label: "Vegan" },
  { tag: "GF", label: "Gluten-free" },
  { tag: "GFO", label: "Gluten-free option available" },
  { tag: "DF", label: "Dairy-free" },
  { tag: "N", label: "Contains nuts" },
];

export const menus: Menu[] = [
  {
    id: "lunch-dinner",
    label: "Lunch & Dinner",
    served: "Wednesday – Saturday · From 6pm",
    intro:
      "Proper pub food, cooked from scratch with produce from Essex and the surrounding counties. The menu changes with the seasons — this is a taste of what to expect.",
    sections: [
      {
        title: "While you decide",
        items: [
          { name: "Warm sourdough, whipped Netherend butter", price: "4.50", tags: ["V", "GFO"], allergens: ["Gluten", "Milk"] },
          { name: "Marinated Gordal olives", price: "4.50", tags: ["VE", "GF"] },
          { name: "Pork crackling, Bramley apple sauce", price: "5.00", tags: ["GF", "DF"] },
        ],
      },
      {
        title: "Starters",
        items: [
          { name: "Soup of the day", desc: "Ask for today's — served with sourdough", price: "7.50", tags: ["V", "GFO"], allergens: ["Gluten", "Milk", "Celery"] },
          { name: "Chicken liver parfait", desc: "Red onion marmalade, toasted brioche", price: "9.00", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Sulphites"] },
          { name: "Cromer crab on toast", desc: "Brown crab mayonnaise, pickled cucumber, chilli", price: "12.50", tags: ["GFO"], allergens: ["Crustaceans", "Gluten", "Egg"] },
          { name: "Heritage beetroot salad", desc: "Whipped goat's curd, candied walnuts, watercress", price: "8.50", tags: ["V", "GF", "N"], allergens: ["Milk", "Nuts"] },
          { name: "Crispy Suffolk pork belly", desc: "Burnt apple, black pudding crumb, cider jus", price: "10.00", allergens: ["Gluten", "Sulphites"] },
        ],
      },
      {
        title: "Mains",
        items: [
          { name: "Beer-battered haddock & chips", desc: "Triple-cooked chips, crushed peas, tartare sauce", price: "18.50", tags: ["GFO"], allergens: ["Fish", "Gluten", "Egg", "Mustard"] },
          { name: "The Queen's Head burger", desc: "Aged beef, smoked bacon, Barber's cheddar, house pickles, skin-on fries", price: "17.50", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Mustard", "Sesame"] },
          { name: "Steak & Adnams ale pie", desc: "Suet pastry, buttered greens, proper gravy", price: "18.00", allergens: ["Gluten", "Milk", "Egg", "Celery"] },
          { name: "Pan-roasted chicken supreme", desc: "Wild mushrooms, tarragon, crushed new potatoes", price: "21.00", tags: ["GF"], allergens: ["Milk", "Celery", "Sulphites"] },
          { name: "10oz Essex rib-eye", desc: "Roast tomato, field mushroom, chips, peppercorn or garlic butter", price: "32.00", tags: ["GF"], allergens: ["Milk"] },
          { name: "Roast cod, brown shrimp butter", desc: "Samphire, crushed Jersey Royals", price: "24.00", tags: ["GF"], allergens: ["Fish", "Crustaceans", "Milk"] },
          { name: "Wild mushroom & truffle risotto", desc: "Aged parmesan, crispy sage", price: "16.50", tags: ["V", "GF"], allergens: ["Milk", "Celery", "Sulphites"] },
          { name: "Roasted cauliflower steak", desc: "Romesco, chickpeas, salsa verde, toasted almonds", price: "15.50", tags: ["VE", "GF", "N"], allergens: ["Nuts", "Sulphites"] },
        ],
      },
      {
        title: "Sides",
        items: [
          { name: "Triple-cooked chips", price: "4.50", tags: ["VE", "GF"] },
          { name: "Buttered seasonal greens", price: "4.50", tags: ["V", "GF"], allergens: ["Milk"] },
          { name: "House salad", price: "4.00", tags: ["VE", "GF"], allergens: ["Mustard"] },
          { name: "Cauliflower cheese", price: "5.50", tags: ["V"], allergens: ["Gluten", "Milk", "Mustard"] },
        ],
      },
      {
        title: "Puddings",
        items: [
          { name: "Sticky toffee pudding", desc: "Butterscotch sauce, vanilla ice cream", price: "8.50", tags: ["V"], allergens: ["Gluten", "Milk", "Egg"] },
          { name: "Dark chocolate delice", desc: "Salted caramel, hazelnut praline", price: "9.00", tags: ["V", "N"], allergens: ["Milk", "Egg", "Nuts", "Soya"] },
          { name: "Lemon posset", desc: "Raspberries, shortbread", price: "8.00", tags: ["V", "GFO"], allergens: ["Milk", "Gluten"] },
          { name: "British cheeseboard", desc: "Three cheeses, quince, crackers, celery", price: "12.50", tags: ["V", "GFO"], allergens: ["Milk", "Gluten", "Celery"] },
          { name: "Ice creams & sorbets", desc: "Ask for today's flavours", price: "6.50", tags: ["V", "GF"], allergens: ["Milk"] },
        ],
      },
    ],
  },
  {
    id: "sunday",
    label: "Sunday Roast",
    served: "Every Sunday · 12–5pm · Booking strongly advised",
    intro:
      "Our Sunday roast is what we're known for. Everything comes with duck-fat roast potatoes, Yorkshire pudding, seasonal vegetables, cauliflower cheese and lashings of gravy.",
    sections: [
      {
        title: "Roasts",
        items: [
          { name: "Roast sirloin of Essex beef", desc: "Served pink, horseradish cream", price: "22.00", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Celery"] },
          { name: "Roast leg of lamb", desc: "Mint sauce", price: "21.00", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Celery"] },
          { name: "Roast Suffolk pork loin", desc: "Crackling, Bramley apple sauce", price: "19.50", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Celery"] },
          { name: "Half roast chicken", desc: "Sage & onion stuffing, bread sauce", price: "19.50", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Celery"] },
          { name: "Nut roast wellington", desc: "Vegan gravy", price: "17.00", tags: ["VE", "N"], allergens: ["Gluten", "Nuts", "Celery"] },
          { name: "Trio of roasts", desc: "Beef, lamb and pork", price: "26.00", tags: ["GFO"], allergens: ["Gluten", "Milk", "Egg", "Celery"] },
        ],
      },
      {
        title: "Little ones (under 12)",
        items: [
          { name: "Children's roast", desc: "Smaller portion of any roast", price: "10.50" },
          { name: "Sausage, mash & peas", price: "8.00", allergens: ["Gluten", "Milk", "Sulphites"] },
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    served: "All day, every day we're open",
    intro:
      "Local cask ales, a carefully chosen wine list and classic cocktails made properly. Ask at the bar for our guest ale of the week.",
    sections: [
      {
        title: "Cask & craft",
        note: "Prices per pint. Halves and thirds available.",
        items: [
          { name: "Adnams Ghost Ship", desc: "Pale ale · 4.5% · Southwold", price: "5.60" },
          { name: "Woodforde's Wherry", desc: "Amber bitter · 3.8% · Norfolk", price: "5.40" },
          { name: "Guest cask ale", desc: "Changes weekly — ask at the bar", price: "5.50" },
          { name: "Camden Hells", desc: "Lager · 4.6%", price: "6.20" },
          { name: "Aspall Cyder", desc: "Suffolk cider · 5.5%", price: "5.80" },
          { name: "Guinness", desc: "Stout · 4.2%", price: "6.00" },
          { name: "Lucky Saint", desc: "Alcohol-free lager · 0.5%", price: "4.80" },
        ],
      },
      {
        title: "Wines by the glass",
        note: "175ml / 250ml · All wines also by the bottle. Full list available at the bar.",
        items: [
          { name: "Picpoul de Pinet, Languedoc", desc: "Crisp, citrus, sea-breeze fresh", price: "8.50 / 11.50" },
          { name: "Sauvignon Blanc, Marlborough", desc: "Gooseberry, lime, zesty", price: "9.00 / 12.50" },
          { name: "Provence Rosé", desc: "Pale, dry, strawberry", price: "9.00 / 12.50" },
          { name: "Malbec, Mendoza", desc: "Plum, spice, soft tannins", price: "8.50 / 11.50" },
          { name: "Rioja Crianza", desc: "Cherry, vanilla, oak", price: "9.50 / 13.00" },
          { name: "English sparkling, Essex", desc: "Local fizz — the perfect start", price: "12.00 (125ml)" },
        ],
      },
      {
        title: "Cocktails",
        items: [
          { name: "Queen's Negroni", desc: "Gin, Campari, sweet vermouth, orange", price: "11.00" },
          { name: "Espresso Martini", desc: "Vodka, coffee liqueur, fresh espresso", price: "11.00" },
          { name: "Rhubarb & Ginger Fizz", desc: "Rhubarb gin, ginger, prosecco", price: "10.50" },
          { name: "Hedgerow Sour", desc: "Sloe gin, lemon, blackberry", price: "10.50" },
        ],
      },
      {
        title: "Soft drinks & hot drinks",
        items: [
          { name: "Fentimans (assorted)", price: "3.50" },
          { name: "Fresh juices", desc: "Orange, apple, cranberry", price: "3.20" },
          { name: "Fever-Tree mixers", price: "2.80" },
          { name: "Coffee", desc: "Americano, latte, cappuccino, flat white", price: "3.20 – 3.60", allergens: ["Milk"] },
          { name: "Pot of tea", desc: "Breakfast, Earl Grey, herbal", price: "3.00" },
        ],
      },
    ],
  },
];
