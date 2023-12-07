import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ArticleList from "~/components/ArticleList";

import logo from "public/assets/logo.jpg";

export let loader: LoaderFunction = async () => {
  let res = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
  let articles = await res.json();
  return json(articles);
};

export default function App() {
  let articles = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <img src={logo} alt="Logo" className=" w-32" />

      <ArticleList articles={articles} />
    </div>
  );
}
