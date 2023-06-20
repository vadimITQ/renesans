export type ValidationMessage = string | null;

export interface Validation {
  [key: string]: ValidationMessage;
}
