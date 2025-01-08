import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8  ">

     <h1>Blog Management Application</h1>

      <Link href="/blogs">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Go to Blog
        </button>
      </Link>

    </div>
  );
}
