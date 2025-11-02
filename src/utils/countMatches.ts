export function countMatches(array1, array2) {
  const set1 = new Set(array1);
  const set2 = new Set(array2);

  let matches = 0;

  set1.forEach(item => {
    if (set2.has(item)) {
      matches++;
    }
  });

  return matches;
}
