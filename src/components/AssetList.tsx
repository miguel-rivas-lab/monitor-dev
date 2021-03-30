import { FC } from "react";
import { useQuery } from "react-query";
import { getAssets } from "../api";
import styles from "./AssetList.module.css";
import { TextLoading } from "./TextLoading";

export const AssetList: FC = () => {
  const assetsQuery = useQuery("assets", () => getAssets(), {
    refetchInterval: 1500,
  });

  if (assetsQuery.isLoading) {
    return (
      <TextLoading className={styles.loading}>
        Loading Crypto Assets
      </TextLoading>
    );
  }

  if (assetsQuery.isError) {
    return (
      <>
        <div className={styles["error__text"]}>Error fetching assets!</div>
        <button className="btn" onClick={() => assetsQuery.refetch()}>
          Refetch
        </button>
      </>
    );
  }

  return (
    <div>
      {assetsQuery.data &&
        assetsQuery.data.map((item) => {
          return (
            <div className={styles["asset-item"]} key={item.id}>
              <div>
                <div className={styles["asset-item__name"]}>{item.name}</div>
                <div className={styles["asset-item__symbol"]}>
                  {item.symbol}
                </div>
              </div>
              <div className={styles["asset-item__price"]}>
                {Math.round(Number(item.priceUsd) * 100) / 100.0}
              </div>
              <button className="btn">Watch</button>
            </div>
          );
        })}
    </div>
  );
};
