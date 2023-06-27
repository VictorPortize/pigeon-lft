type StringCallbackFunction = (variable: string) => string;

export function formatMessageWithValues(
  message: string,
  variables: Record<string, string>,
  transform?: Record<string, StringCallbackFunction>
): string;
