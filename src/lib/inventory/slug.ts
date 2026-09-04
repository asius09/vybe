export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ensureUniqueSlug(
  slug: string,
  existingSlugs: string[]
): string {
  let candidate = slug;
  let counter = 1;
  while (existingSlugs.includes(candidate)) {
    candidate = `${slug}-${counter}`;
    counter++;
  }
  return candidate;
}
