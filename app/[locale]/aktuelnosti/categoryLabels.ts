const CATEGORY_LABELS: Record<string, string> = {
  inovacije: "Иновације",
  akcije: "Акције",
  oprema: "Опрема",
  uspeh: "Успех",
  edukacija: "Едукација",
  obavestenje: "Обавештење",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}
