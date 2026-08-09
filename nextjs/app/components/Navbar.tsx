import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">MyApp</h1>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-green-200">
            Home
          </Link>

          <Link href="/about" className="hover:text-green-200">
            About
          </Link>


          <Link href="/contact" className="hover:text-green-200">
            Contact
          </Link>

              <Link href="/blogs" className="hover:text-green-200">
            Blogs
          </Link>
        </div>
      </div>
    </nav>
  );
}