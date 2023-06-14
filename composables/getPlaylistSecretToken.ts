export default function getSecretCode(iframe: String) {
  const secret = "secret_token";
  const secretLength = secret.length;

  if (iframe.indexOf(secret) < 0) {
    return "";
  } else {
    const secretToken = iframe.slice(
      iframe.indexOf(secret) + secretLength + 3,
      iframe.indexOf(secret) + secretLength + 16
    );

    return "%3F" + secret + "%3D" + secretToken;
  }
}
