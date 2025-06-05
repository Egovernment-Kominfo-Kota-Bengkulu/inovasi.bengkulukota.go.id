const loaded: Record<string, Promise<void>> = {};

export function loadScript(src: string): Promise<void> {
  if (loaded[src] !== undefined) return loaded[src]; // avoid double load

  loaded[src] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      console.log(`${src} loaded`);
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return loaded[src];
}

export async function loadScriptsInOrder(sources: string[]): Promise<void> {
  for (const src of sources) {
    await loadScript(src);
  }
}
