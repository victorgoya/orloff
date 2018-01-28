export function loadNextPages(language) {
  return { type: "LOAD_NEXT_PAGES", language };
}

export function setPages(pages) {
  return { type: "SET_PAGES", pages };
}

export function clearPages() {
  return { type: "CLEAR_PAGES" };
}
