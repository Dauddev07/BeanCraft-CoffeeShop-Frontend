const menu = [
  {
    id: 1,
    name: "Latte",
    price: 4.5,
    image: "/images/Latte Image.jpg",
    category: "coffee",
  },

  {
    id: 2,
    name: "Cappuccino",
    price: 4,
    image: "/images/cappuccino image.jpg",
    category: "coffee",
  },

  {
    id: 3,
    name: "Espresso",
    price: 3,
    image: "/images/Expresso image.jpg",
    category: "coffee",
  },

  {
    id: 4,
    name: "Chocolate Cake",
    price: 5.5,
    image: "/images/Chocolate image.jpg",
    category: "sweets",
  },

  {
    id: 5,
    name: "Donut",
    price: 2.5,
    image: "/images/Donut image.jpg",
    category: "sweets",
  },

  {
    id: 6,
    name: "Brownie",
    price: 3.5,
    image: "/images/Brownie image.jpg",
    category: "sweets",
  },

  {
    id: 7,
    name: "Matcha",
    price: 4.75,
    image: "/images/Mocha image.jpg",
    category: "specials",
  },

  {
    id: 8,
    name: "Croissant",
    price: 3.25,
    image: "/images/Croissant image.jpg",
    category: "specials",
  },
];
if (!localStorage.getItem("menu")) {
  localStorage.setItem("menu", JSON.stringify(menu));
}
export default menu;
