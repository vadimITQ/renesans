
export function getOption(optionName: string): any {
  // @ts-ignore
  return window?.options?.[optionName] ?? null;
}