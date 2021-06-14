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
            <th><button>USD Value</button></th>
            <th><button>Amount</button></th>
            <th><button>Subtotal</button></th>
          </tr>
        </thead>
        <tbody>
          <AssetList />
        </tbody>
      </table>
    </>
  );
};
