export default async function sitemap() {
  const routes = [""].map((route) => ({
    url: `https://sanzhar.xyz${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}
