import { FC } from "react";
import { AssetList } from "../components/AssetList";

export const HomePage: FC = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>USD Value</th>
            <th>Amount</th>
            <th>Investment</th>
            <th>Subtotal</th>
            <th>Gain</th>
          </tr>
        </thead>
        <tbody>
          <AssetList />
        </tbody>
      </table>
    </>
  );
};
