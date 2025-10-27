import { useState, useEffect, useCallback } from 'preact/hooks';

const useViewSwitcher = (defaultView = 'grid', paramName = 'productView') => {
  const [viewMode, setViewModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get(paramName) || defaultView;
    }
    return defaultView;
  });

  const setViewMode = useCallback(
    (newMode) => {
      setViewModeState(newMode);
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        params.set(paramName, newMode);
        const newSearch = params.toString();
        const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    },
    [paramName],
  );

  //listen for browser back/forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setViewModeState(params.get(paramName) || defaultView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [defaultView, paramName]);

  return [viewMode, setViewMode];
};

export default useViewSwitcher;
