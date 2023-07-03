interface FormatOptions {
  match?: RegExp;
  variables?: Record<string, string>;
  transform?: Record<string, StringCallbackFunction>;
  defaultValue?: string | Record<string, string>;
}

type StringCallbackFunction = (variable: string) => string;

export function formatMessageWithValues(
  message: string,
  variables: Record<string, string>,
  transform?: Record<string, StringCallbackFunction>
): string;

export function formatTextValues(
  message: string,
  options: FormatOptions
): string;
