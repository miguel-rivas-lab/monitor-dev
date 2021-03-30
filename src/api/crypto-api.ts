import axios from "axios";
import { Asset } from ".";

export async function getAssets(): Promise<Asset[]> {
  return axios
    .get<{ data: Asset[] }>("https://api.coincap.io/v2/assets")
    .then((res) => res.data.data);
}
