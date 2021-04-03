import clsx from "clsx";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAssetById, getPriceHistory } from "../api";
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

  const priceHistory = useQuery(
    ["assets", assetId, "history"],
    () => getPriceHistory(assetId),
    { enabled: !!assetQuery.data?.id, cacheTime: 0 }
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
      <Link to="/" className={styles["back"]}>
        {"<< Home"}
      </Link>
      {assetQuery.data && (
        <>
          <div className={styles["asset"]}>
            <div className={styles["asset__id"]}>({assetQuery.data.id})</div>
            <h1 className={styles["asset__name"]}>
              <span
                className="zoom-in-anim"
                style={{ display: "inline-block" }}
              >
                🚀
              </span>{" "}
              {assetQuery.data.name}
            </h1>
            <div className={styles["asset__price"]}>
              {Number(assetQuery.data.priceUsd).toFixed(4)}
            </div>
            <div className={styles["asset__details"]}>
              <div>
                <h3 className={styles["asset__label"]}>🧢 Market Cap</h3>
                <p className={styles["asset__value"]}>
                  {Number(assetQuery.data.marketCapUsd).toFixed(4)}
                </p>
              </div>
              <div>
                <h3 className={styles["asset__label"]}>📈 Supply</h3>
                <p className={styles["asset__value"]}>
                  {Number(assetQuery.data.supply).toFixed(4)}
                </p>
              </div>
              <div>
                <h3 className={styles["asset__label"]}>📉 Max Supply</h3>
                <p className={styles["asset__value"]}>
                  {assetQuery.data.maxSupply
                    ? Number(assetQuery.data.maxSupply).toFixed(4)
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className={styles["asset__label"]}>٪ Change (24hr)</h3>
                <p className={styles["asset__value"]}>
                  {Number(assetQuery.data.changePercent24Hr).toFixed(4)}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["price-history"]}>
            <h2>Price History</h2>
            {priceHistory.isLoading && (
              <TextLoading>Loading price history</TextLoading>
            )}
            {priceHistory.data && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  className={styles["price-history__chart"]}
                  data={priceHistory.data.map((item) => ({
                    price: Number(item.priceUsd),
                    date: new Date(item.date).toDateString(),
                  }))}
                >
                  <XAxis dataKey="date" />
                  <YAxis domain={["dataMin"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="basis"
                    dataKey="price"
                    stroke="coral"
                    strokeWidth={1.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
};
