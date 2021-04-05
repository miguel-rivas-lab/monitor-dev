import { FC } from "react";
import { AssetList } from "../components/AssetList";
import { WatchAssetList } from "../components/WatchAssetList";
import { useGlobalUI } from "../hooks/useGlobalUI";

export const HomePage: FC = () => {
  const globalUI = useGlobalUI();

  const handleClickAssetToggle = () => {
    if (globalUI.state.showAssets) {
      globalUI.dispatch({ type: "COLLAPSE_ASSETS" });
    } else {
      globalUI.dispatch({ type: "EXPAND_ASSETS" });
    }
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
      <br />
      <WatchAssetList />
      <button className="btn" onClick={handleClickAssetToggle}>
        {globalUI.state.showAssets ? "Hide All Assets" : "Show All Assets"}
      </button>
      {globalUI.state.showAssets && (
        <>
          <h2>Assets</h2>
          <AssetList />
        </>
      )}
    </div>
  );
};
