import { FC } from "react";
import { useQuery } from "react-query";
import { getWatchIds } from "../api";
import { TextLoading } from "./TextLoading";
import styles from "./WatchAssetList.module.css";

export interface WatchAssetListProps {}

export const WatchAssetList: FC<WatchAssetListProps> = () => {
  const watchingAssetsQuery = useQuery("watching_assets", () => getWatchIds());

  return (
    <div className={styles.container}>
      <h2>Watching Assets</h2>
      {watchingAssetsQuery.isLoading ||
        (watchingAssetsQuery.isFetching && <TextLoading>Loading</TextLoading>)}
      {watchingAssetsQuery.data &&
        Object.keys(watchingAssetsQuery.data).length === 0 && (
          <div>You are not watching any crypto's, that is sad :(</div>
        )}
    </div>
  );
};
