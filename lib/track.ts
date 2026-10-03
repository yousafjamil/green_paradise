type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

/** Records a custom event when analytics is enabled; does nothing otherwise. */
export function track(event: string, props?: Record<string, string>) {
  (window as Window & { plausible?: Plausible }).plausible?.(event, props ? { props } : undefined);
}
