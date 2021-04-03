import clsx from "clsx";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAssetById } from "../api";
import { TextLoading } from "../components/TextLoading";
import styles from "./Asset.module.css";

export type AssetPageParams = {
  assetId: string;
};

export const AssetPage: FC = () => {
  const { assetId } = useParams<AssetPageParams>();

  const assetQuery = useQuery(
    ["assets", assetId],
    () => getAssetById(assetId),
    { refetchInterval: 1500 }
  );

  if (assetQuery.isLoading) {
    return <TextLoading>Loading</TextLoading>;
  }

  if (assetQuery.isError) {
    return (
      <div>
        <div>
          Unable to get data from given asset :( Please try again later.
        </div>
        <Link to="/">
          <button className={clsx("btn", styles["home-button"])}>
            Go Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {assetQuery.data && (
        <div className={styles["asset"]}>
          <div className={styles["asset__id"]}>({assetQuery.data.id})</div>
          <h1 className={styles["asset__name"]}>
            <span className="zoom-in-anim" style={{ display: "inline-block" }}>
              🚀
            </span>{" "}
            {assetQuery.data.name}
          </h1>
          <div className={styles["asset__price"]}>
            {assetQuery.data.priceUsd}
          </div>
          <div className={styles["asset__details"]}>
            <div>
              <h3 className={styles["asset__label"]}>🧢 Market Cap</h3>
              <p className={styles["asset__value"]}>
                {assetQuery.data.marketCapUsd}
              </p>
            </div>
            <div>
              <h3 className={styles["asset__label"]}>📈 Supply</h3>
              <p className={styles["asset__value"]}>{assetQuery.data.supply}</p>
            </div>
            <div>
              <h3 className={styles["asset__label"]}>📉 Max Supply</h3>
              <p className={styles["asset__value"]}>
                {assetQuery.data.maxSupply || "N/A"}
              </p>
            </div>
            <div>
              <h3 className={styles["asset__label"]}>٪ Change (24hr)</h3>
              <p className={styles["asset__value"]}>
                {assetQuery.data.changePercent24Hr}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
