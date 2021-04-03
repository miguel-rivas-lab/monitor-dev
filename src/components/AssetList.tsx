import clsx from "clsx";
import { FC } from "react";
import { useQuery } from "react-query";
import { getAssets, getWatchIds } from "../api";
import { useDeleteWatchIdsMutation } from "../hooks/useDeleteWatchIdMutation";
import styles from "./AssetList.module.css";
import { TextLoading } from "./TextLoading";
import { Link } from "react-router-dom";
import { useAddToWatchIdMutation } from "../hooks/useAddToWatchIdMutation";

export const AssetList: FC = () => {
  const assetsQuery = useQuery("assets", () => getAssets(), {
    refetchInterval: 1500,
  });
  const watchIdsQuery = useQuery("watching_assets", () => getWatchIds());
  const addToWatchIdsMutation = useAddToWatchIdMutation();
  const deleteFromWatchIdsMutation = useDeleteWatchIdsMutation();

  const handleAddToWatchIds = (id: string) => {
    if (addToWatchIdsMutation.isIdle) {
      addToWatchIdsMutation.mutate(id);
    }
  };

  const handleDeleteFromWatchIds = (id: string) => {
    if (deleteFromWatchIdsMutation.isIdle) {
      deleteFromWatchIdsMutation.mutate(id);
    }
  };

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
          const isBeingWatched =
            watchIdsQuery.data && watchIdsQuery.data[item.id];

          return (
            <Link to={`/${item.id}`} className={styles["link"]}>
              <div className={styles["asset-item"]} key={item.id}>
                <div>
                  <div className={styles["asset-item__name"]}>{item.name}</div>
                  <div className={styles["asset-item__symbol"]}>
                    {item.symbol}
                  </div>
                </div>
                <div className={styles["asset-item__price"]}>
                  {Math.round(Number(item.priceUsd) * 10000) / 10000.0}
                </div>
                <button
                  className={clsx(
                    "btn",
                    styles["asset-item__watch"],
                    isBeingWatched && "btn--warning"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isBeingWatched) {
                      handleDeleteFromWatchIds(item.id);
                    } else {
                      handleAddToWatchIds(item.id);
                    }
                  }}
                >
                  {isBeingWatched ? "Unwatch" : "Watch"}
                </button>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
