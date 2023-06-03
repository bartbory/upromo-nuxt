export default function getPlaylistId(iframe: String) {
  const id = iframe.slice(
    iframe.indexOf("playlists/") + 10,
    iframe.indexOf("playlists/") + 20
  );
  return id;
}
