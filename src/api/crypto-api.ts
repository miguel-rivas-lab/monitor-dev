import axios from "axios";
import { Asset } from ".";

export const WATCH_IDS_KEY = "watch_ids";

export async function getAssets(): Promise<Asset[]> {
  return axios
    .get<{ data: Asset[] }>("https://api.coincap.io/v2/assets")
    .then((res) => res.data.data);
}

export async function getAssetById(id: string): Promise<Asset> {
  return axios
    .get<{ data: Asset }>(`https://api.coincap.io/v2/assets/${id}`)
    .then((res) => res.data.data);
}

export async function getWatchIds(): Promise<Record<string, boolean>> {
  const stringData = window.localStorage.getItem(WATCH_IDS_KEY);

  if (!stringData) {
    return {};
  }

  return JSON.parse(stringData);
}

export async function addToWatchIds(id: string): Promise<void> {
  const ids = await getWatchIds();
  ids[id] = true;
  window.localStorage.setItem(WATCH_IDS_KEY, JSON.stringify(ids));
}

export async function deleteFromWatchIds(id: string): Promise<void> {
  const ids = await getWatchIds();
  const { [id]: toBeDeleted, ...rest } = ids;
  window.localStorage.setItem(WATCH_IDS_KEY, JSON.stringify(rest));
}
