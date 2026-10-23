/**
 * MENU
 * ------------------------------------------------------------------
 * FOOD MENU = the client's real menu, transcribed from the printed
 * board (Spanish tapas · Mediterranean dining · British pub classics).
 *
 * DRINKS = still SAMPLE CONTENT. Replace with the client's real list.
 *
 * ALLERGENS: the client's printed menu carries no allergen information,
 * so none is listed here. Do NOT guess it — under the Food Information
 * Regulations the 14 regulated allergens must be accurate. Once the
 * kitchen supplies the data, add `allergens: ["Milk", "Gluten", ...]`
 * to each dish and it will render automatically under the dish name.
 *
 * Dietary tags follow the client's own notation: V (vegetarian) and
 * VG (vegan). GF / GFO / DF / N can be added back to `dietaryKey` below
 * if the kitchen confirms them.
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
  { tag: "VG", label: "Vegan" },
];

export const menus: Menu[] = [
  {
    id: "food",
    label: "Food",
    served: "Wednesday – Saturday · From 6pm",
    intro:
      "Spanish tapas, Mediterranean dining and British pub classics, cooked fresh to order. Small plates made for sharing, generous mains and a few old favourites done properly.",
    sections: [
      {
        title: "Spanish Tapas",
        note: "Small plates, big flavours — perfect for sharing. 3 selected tapas £20 · 5 selected tapas £32. Premium dishes may carry a supplement.",
        items: [
          { name: "Garlic King Prawns", desc: "Succulent king prawns sizzling in garlic, chilli and olive oil.", price: "9.95" },
          { name: "Tempura King Prawns", desc: "Crispy king prawns in a light tempura batter, served with a dipping sauce.", price: "9.95" },
          { name: "Spanish Meatballs", desc: "Tender meatballs simmered in a rich Mediterranean tomato sauce.", price: "8.50" },
          { name: "Mediterranean Moussaka", desc: "Tender vegetables and lentils layered with aubergine and potatoes, topped with creamy béchamel and a rich tomato sauce.", price: "8.50" },
          { name: "Crispy Calamari", desc: "Golden-fried calamari rings served with lemon and garlic aioli.", price: "7.50" },
          { name: "Garlic Mushrooms", desc: "Tender mushrooms sautéed with garlic, parsley and olive oil.", price: "6.95", tags: ["VG"] },
          { name: "Tempura Vegetables", desc: "Seasonal vegetables in a light, crispy tempura batter.", price: "6.95", tags: ["VG"] },
          { name: "Spanish Croquettes", desc: "Golden, crispy croquettes with a creamy Serrano ham filling.", price: "6.95" },
          { name: "Padrón Peppers", desc: "Blistered Spanish green peppers finished with sea salt.", price: "6.50", tags: ["VG"] },
          { name: "Patatas Bravas", desc: "Crispy golden potatoes with a lightly spiced Spanish tomato sauce.", price: "6.50", tags: ["VG"] },
        ],
      },
      {
        title: "Sharing Boards",
        items: [
          { name: "The Queen's Cheese Board", desc: "A selection of cheeses served with crackers, chutney and accompaniments.", price: "14.95", tags: ["V"] },
          { name: "Spanish Charcuterie Board", desc: "A selection of Spanish cured meats served with traditional accompaniments.", price: "Please ask" },
          { name: "The Royal Sharing Board", desc: "A generous selection of cheeses, Spanish cured meats and accompaniments.", price: "Please ask" },
        ],
      },
      {
        title: "Main Courses",
        note: "All meat mains are served with creamy mashed potatoes and seasonal vegetables.",
        items: [
          { name: "Spanish Oxtail Stew", desc: "A slow-braised oxtail simmered in a rich Mediterranean sauce with aromatic herbs.", price: "18.00" },
          { name: "Braised Pork Cheeks", desc: "Melt-in-the-mouth pork cheeks slowly cooked in a rich savoury sauce.", price: "16.00" },
          { name: "Spanish Meatballs", desc: "A generous serving of tender meatballs in a rich Mediterranean tomato sauce.", price: "16.00" },
          { name: "Grilled Ribeye Steak", desc: "Succulent ribeye steak grilled to your preference, served with a choice of sauce.", price: "16.00" },
          { name: "Duck Leg Confit", desc: "Slow-cooked duck leg with golden, crispy skin, served with a rich jus.", price: "16.00" },
          { name: "Creamy Tuscan Chicken", desc: "Tender chicken breast in a rich garlic cream sauce with sun-dried tomatoes, spinach and Parmesan.", price: "16.00" },
          { name: "Traditional Steak & Ale Pie", desc: "Tender slow-cooked British beef in a rich ale gravy, encased in golden, flaky pastry.", price: "16.00" },
          { name: "Slow-Braised Lamb Shank", desc: "Tender lamb shank slow-cooked until falling off the bone, served with a rich red wine gravy.", price: "15.00" },
        ],
      },
      {
        title: "Fish and Seafood",
        items: [
          { name: "Traditional Fish & Chips", desc: "Golden battered fish served with chunky chips, garden peas and tartare sauce.", price: "14.95" },
          { name: "Hake in Salsa Verde", desc: "Tender hake in a traditional Spanish sauce of parsley, garlic and white wine.", price: "13.95" },
          { name: "Pan-Seared Salmon", desc: "Succulent salmon fillet glazed with soy sauce, honey, ginger and garlic.", price: "12.95" },
        ],
      },
      {
        title: "Fresh Salads",
        items: [
          { name: "Mediterranean Mixed Salad", desc: "Mixed leaves, roasted peppers, cucumber and tomatoes, finished with a Mediterranean vinaigrette.", price: "14.95", tags: ["VG"] },
          { name: "Chicken Caesar Salad", desc: "Classic Caesar salad topped with tender grilled chicken breast.", price: "14.95" },
          { name: "Burrata & Tomato Salad", desc: "Creamy burrata served with ripe tomatoes, fresh basil and extra virgin olive oil.", price: "13.95", tags: ["V"] },
          { name: "Warm Goat's Cheese Salad", desc: "Creamy goat's cheese served with mixed leaves, roasted Mediterranean vegetables and balsamic dressing.", price: "12.95", tags: ["V"] },
          { name: "Classic Caesar Salad", desc: "Crisp cos lettuce tossed in Caesar dressing with Parmesan and golden croutons.", price: "10.95" },
        ],
      },
      {
        title: "Pasta and Risotto",
        note: "Comforting Mediterranean favourites.",
        items: [
          { name: "Roasted Pumpkin, Sage & Vegetable Risotto", desc: "Creamy Arborio rice cooked with roasted pumpkin, seasonal Mediterranean vegetables, garlic and fresh sage, finished with toasted pumpkin seeds and a drizzle of extra virgin olive oil.", price: "14.95", tags: ["V"] },
          { name: "Classic Spaghetti Bolognese", desc: "Spaghetti in a rich, slow-cooked beef and tomato ragù with garlic, onions and Mediterranean herbs, finished with grated Parmesan.", price: "13.95" },
          { name: "Mediterranean Vegetable Pasta", desc: "Penne pasta tossed with roasted peppers, courgettes, mushrooms, garlic, tomatoes and fresh basil, finished with extra virgin olive oil.", price: "12.95", tags: ["VG"] },
        ],
      },
      {
        title: "Soup of the Day",
        items: [
          { name: "Homemade Soup of the Day", desc: "Freshly prepared seasonal soup. Please ask our team for today's selection.", price: "6.95" },
        ],
      },
      {
        title: "Side Dishes",
        items: [
          { name: "Chunky Chips", price: "4.50" },
          { name: "Creamy Mashed Potatoes", price: "4.50" },
          { name: "Seasonal Vegetables", price: "4.50" },
          { name: "Mixed Leaf Salad", price: "4.50" },
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
          { name: "Coffee", desc: "Americano, latte, cappuccino, flat white", price: "3.20 – 3.60" },
          { name: "Pot of tea", desc: "Breakfast, Earl Grey, herbal", price: "3.00" },
        ],
      },
    ],
  },
];
