function placeholder(elements: Record<string, HTMLElement>, placeholderId: string, element: HTMLElement) {
  elements[placeholderId].replaceWith(element);
  elements[placeholderId] = element;
}

export { placeholder };
