import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getAssetById } from "../api";
import { TextLoading } from "../components/TextLoading";
import styles from "./Asset.module.css";

export type AssetPageParams = {
  assetId: string;
};

export const AssetPage: FC = () => {
  const { assetId } = useParams<AssetPageParams>();

  const assetQuery = useQuery(["assets", assetId], () => getAssetById(assetId));

  if (assetQuery.isLoading) {
    return <TextLoading>Loading</TextLoading>;
  }

  if (assetQuery.isError) {
    return (
      <div>Unable to get data from given asset :( Please try again later.</div>
    );
  }

  return (
    <div>
      <div>
        {assetQuery.data && (
          <>
            <div className={styles["asset__id"]}>{assetQuery.data.id}</div>
            <div className={styles["asset__name"]}>{assetQuery.data.name}</div>
            <div className={styles["asset__price"]}>
              {assetQuery.data.priceUsd}
            </div>
            <div className={styles["asset__market-cap"]}>
              {assetQuery.data.marketCapUsd}
            </div>
            <div className={styles["asset__max-supply"]}>
              {assetQuery.data.maxSupply}
            </div>
            <div className={styles["asset__supply"]}>
              {assetQuery.data.supply}
            </div>
            <div className={styles["asset__change-percent"]}>
              {assetQuery.data.changePercent24Hr}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
