import { useState, useEffect } from "react";

const DelayedMount = ({ delay = 300, children, isGif = true }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return ready ? (
    children
  ) : isGif ? (
    <div className="flex w-full justify-center">
      <img src="/img/loading.gif" />
    </div>
  ) : null;
};

export default DelayedMount;
