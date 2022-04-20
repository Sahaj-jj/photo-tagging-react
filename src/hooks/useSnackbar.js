import { useEffect, useState } from 'react';

function useSnackbar() {
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setActive(false);
      }, 2000);
    }
  }, [active]);

  const show = (opts) => {
    setActive(true);
    setOptions(opts);
  };

  return [active, options, show];
}

export default useSnackbar;
