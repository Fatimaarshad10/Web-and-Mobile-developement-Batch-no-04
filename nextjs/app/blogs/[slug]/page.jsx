export default async function BlogPage({ params }) {
  const { slug } = await params;

  return <h1>{slug}</h1>;
}