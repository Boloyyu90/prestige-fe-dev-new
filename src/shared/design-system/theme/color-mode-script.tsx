export function ColorModeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
        
        if (resolvedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Prevent flash of unstyled content
        document.documentElement.style.setProperty('--initial-color-mode', resolvedTheme);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}