// utils/DelayedMount.jsx
import { useState, useEffect } from "react";

const DelayedMount = ({ delay = 300, children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return ready ? children : null;
};

export default DelayedMount;
