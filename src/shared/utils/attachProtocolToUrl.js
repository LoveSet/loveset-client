export default function attachProtocolToURL(url) {
  if (!url) return null; // Return null if URL is not provided

  const hasProtocol = /^https?:\/\//i.test(url);
  if (!hasProtocol) {
    // Attach "http://" to the URL if no protocol is present
    url = "https://" + url;
  }

  return url;
}
