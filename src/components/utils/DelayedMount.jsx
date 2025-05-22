// utils/DelayedMount.jsx
import { useState, useEffect } from "react";
import loadingGif from "../../assets/img/loading.gif";

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
      <img src={loadingGif} />
    </div>
  ) : null;
};

export default DelayedMount;
