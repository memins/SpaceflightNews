import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  AdjustmentsVerticalIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

export default function ArticleList({ articles }) {
  const [sortOrder, setSortOrder] = useState("date");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let sortedArticles = [...articles];
  if (sortOrder === "title") {
    sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    sortedArticles.sort(
      (a, b) => new Date(b.published) - new Date(a.published)
    );
  }

  sortedArticles = sortedArticles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex m-4 gap-4">
        <SearchBar onSearch={setSearchTerm} />
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
          <AdjustmentsVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {dropdownOpen && (
        <div className="flex items-baseline gap-4">
          <p className="text-gray-400">Sort by </p>
          <div className="flex bg-white rounded mt-2 py-1 gap-4">
            <button
              className="border border-gray-300 rounded-md px-4 py-2"
              onClick={() => {
                setSortOrder("title");
                setDropdownOpen(false);
              }}
            >
              Title
            </button>
            <button
              className="border border-gray-300 rounded-md px-4 py-2"
              onClick={() => {
                setSortOrder("date");
                setDropdownOpen(false);
              }}
            >
              Date
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {sortedArticles.map((article) => (
          <div
            key={article.id}
            className="max-w-xs sm:max-w-md lg:max-w-2xl bg-white rounded-xl shadow-md overflow-hidden m-5"
          >
            <Link to={article.url}>
              <img
                className="w-full"
                src={article.imageUrl}
                alt={article.title}
              />
            </Link>
            <div className="p-8">
              <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {article.title}
              </h2>
              <p className="mt-2 text-gray-500">{article.summary}</p>

              <div className="flex gap-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-1"
                >
                  <p className="mt-2 text-gray-500">Source</p>
                  <ArrowUpRightIcon
                    className="h-3 w-3 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
                <p className="mt-2 text-gray-500">|</p>
                <p className="mt-2 text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-400 my-4">
        Showing {sortedArticles.length} articles
      </p>
    </div>
  );
}
