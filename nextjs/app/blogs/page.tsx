
import Link from "next/link";
import { blogs } from "../data/blogs";
export default function BlogPage() {


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Our Blog</h1>
        <p className="mt-2 text-lg">
          Read the latest articles and tutorials
        </p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-bold text-green-600">
              {blog.title}
            </h2>

            <p className="text-gray-600 mt-3">
              {blog.description}
            </p>

            <button className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
             <Link  href={`/blogs/${blog.slug}`}>Read More</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}