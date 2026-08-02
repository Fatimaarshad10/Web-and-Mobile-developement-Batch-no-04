import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#222" }}>
      <Link href="/" style={{ color: "white", marginRight: "20px" }}>
        Home
      </Link>

      <Link href="/about" style={{ color: "white", marginRight: "20px" }}>
        About
      </Link>

      <Link href="/contact" style={{ color: "white" }}>
        Contact
      </Link>
    </nav>
  );
}