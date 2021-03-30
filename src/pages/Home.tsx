import { FC, useState } from "react";
import { AssetList } from "../components/AssetList";

export const HomePage: FC = () => {
  const [showAssets, setShowAssest] = useState(false);

  const handleClickAssetToggle = () => {
    setShowAssest((val) => !val);
  };

  return (
    <div>
      <h1>Crypto Monitor</h1>
      <p>
        React app built with <strong>React Query</strong> ⚛️ 🚀 Read the code{" "}
        <a
          href="https://github.com/gurleensethi/crypto-monitor"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </p>
      <button className="btn" onClick={handleClickAssetToggle}>
        {showAssets ? "Hide All Assets" : "Show All Assets"}
      </button>
      {showAssets && (
        <>
          <h2>Assets</h2>
          <AssetList />
        </>
      )}
    </div>
  );
};
