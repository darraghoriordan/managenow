export function getColor() {
  const colors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown"// ,
    // "grey",
    // "black"
  ];

  return `${rando(colors)}`;
}

export function rando(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}
