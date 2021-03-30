import clsx from "clsx";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addToWatchIds,
  deleteFromWatchIds,
  getAssets,
  getWatchIds,
} from "../api";
import styles from "./AssetList.module.css";
import { TextLoading } from "./TextLoading";

export const AssetList: FC = () => {
  const queryClient = useQueryClient();

  const assetsQuery = useQuery("assets", () => getAssets(), {
    refetchInterval: 1500,
  });

  const watchIdsQuery = useQuery("watching_assets", () => getWatchIds());

  const addToWatchIdsMutation = useMutation<void, any, string>(
    (id) => addToWatchIds(id),
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Record<string, boolean>>(
          "watching_assets",
          (prevData) => ({ ...prevData, [id]: true })
        );
        queryClient.invalidateQueries("watching_assets");
        addToWatchIdsMutation.reset();
      },
    }
  );

  const deleteFromWatchIdsMutation = useMutation<void, any, string>(
    "watching_assets",
    (id) => deleteFromWatchIds(id),
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Record<string, boolean>>(
          "watching_assets",
          (prevData) => {
            if (prevData) {
              const { [id]: toDelete, ...rest } = prevData;
              return rest;
            }
            return {};
          }
        );
        queryClient.invalidateQueries("watching_assets");
        deleteFromWatchIdsMutation.reset();
      },
    }
  );

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
                className={clsx("btn", isBeingWatched && "btn--danger")}
                onClick={() =>
                  isBeingWatched
                    ? handleDeleteFromWatchIds(item.id)
                    : handleAddToWatchIds(item.id)
                }
              >
                {isBeingWatched ? "Unwatch" : "Watch"}
              </button>
            </div>
          );
        })}
    </div>
  );
};
