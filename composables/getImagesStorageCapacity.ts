import { IFiles, IImage } from "~/types";

export default function getStorageCapacity(data: IImage[] | IFiles[]) {
  let storageCapacity = 0;
  for (let i = 0; i < data.length; i++) {
    storageCapacity += data[i].size;
  }
  return storageCapacity;
}
