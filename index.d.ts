interface FormatOptions {
  match?: RegExp;
  variables?: Record<string, string | number>;
  transform?: Record<string, TextCallbackFunction>;
  defaultValue?: string | Record<string, string>;
}

type TextCallbackFunction = (variable: string | number) => string;

export function formatMessageWithValues(
  message: string,
  variables: Record<string, string | number>,
  transform?: Record<string, TextCallbackFunction>
): string;

export function formatTextValues(
  message: string,
  options: FormatOptions
): string;
