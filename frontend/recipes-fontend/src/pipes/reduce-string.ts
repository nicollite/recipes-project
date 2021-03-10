export const reduceString = (text: string, length: number): string => {
  if (text.length > length) return `${text.substr(0, length)}...`;
  return text;
};
