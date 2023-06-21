export default function getMbFromFile(fileSize: number) {
  return Math.round((fileSize / 1024 / 1024) * 100) / 100;
}
