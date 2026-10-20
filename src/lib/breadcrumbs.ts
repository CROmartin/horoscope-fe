export type Crumb = { name: string; path: string };

export function breadcrumbTrail(path: string, currentTitle: string): Crumb[] {
  const items: Crumb[] = [{ name: "Acasă", path: "/" }];

  if (path.startsWith("/horoscop-azi-")) {
    items.push({ name: "Horoscop azi", path: "/horoscop-azi" });
  } else if (path.startsWith("/horoscop-saptamanal-")) {
    items.push({ name: "Horoscop săptămânal", path: "/horoscop-saptamanal" });
  } else if (path.startsWith("/horoscop-anual-")) {
    items.push({ name: "Horoscop chinezesc", path: "/horoscop-chinezesc" });
  } else if (path.startsWith("/horoscop-zilnic-")) {
    const parent = currentTitle.startsWith("Horoscop chinezesc")
      ? { name: "Horoscop chinezesc zilnic", path: "/horoscop-zilnic-chinezesc" }
      : { name: "Horoscop zilnic", path: "/horoscop-zilnic" };
    items.push(parent);
  }

  if (path !== "/") items.push({ name: currentTitle, path });
  return items;
}
