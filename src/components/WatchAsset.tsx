import { FC } from "react";
import { useQuery } from "react-query";
import { getAssetById } from "../api";
import { useDeleteWatchIdsMutation } from "../hooks/useDeleteWatchIdMutation";
import { TextLoading } from "./TextLoading";
import styles from "./WatchAsset.module.css";

export interface WatchAssetItemProps {
  id: string;
}

export const WatchAssetItem: FC<WatchAssetItemProps> = ({ id }) => {
  const assetQuery = useQuery(["assets", id], () => getAssetById(id), {
    refetchInterval: 1500,
  });

  const deleteFromWatchIdsMutation = useDeleteWatchIdsMutation();

  const handleUnwatchClick = () => {
    deleteFromWatchIdsMutation.mutate(id);
  };

  return (
    <div className={styles["watch-asset"]}>
      {assetQuery.isLoading ? (
        <>
          <div className={styles["watch-asset__id"]}>{id}</div>
          <TextLoading>Loading</TextLoading>
        </>
      ) : (
        assetQuery.data && (
          <>
            <div>
              <div className={styles["watch-asset__name"]}>
                {assetQuery.data.name}
              </div>
              <div className={styles["watch-asset__symbol"]}>
                {assetQuery.data.symbol}
              </div>
              <div className={styles["watch-asset__price"]}>
                {Math.round(Number(assetQuery.data.priceUsd) * 10000) / 10000}
              </div>
            </div>
            <button className={"btn btn--warning"} onClick={handleUnwatchClick}>
              Unwatch
            </button>
          </>
        )
      )}
    </div>
  );
};
