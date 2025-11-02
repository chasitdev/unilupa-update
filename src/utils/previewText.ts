export function previewText(text: string, count: number): string {
  if (text.length > count) {
    return text.substring(0, count) + '...';
  }
  return text;
}
