export function formatRating(rating: number) {
  return `${Math.round(rating * 100) / 100} / 10`;
}
