import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRemixStub } from "@remix-run/testing";
// 👇 import the loader and action
import SearchBar, { loader, action } from "./SearchBar";

test("counter increments when clicked", async () => {
  const App = createRemixStub([
    {
      path: "/SearchBar",
      Component: SearchBar,
      // 👇 use the original loader and action
      loader,
      action,
    },
  ]);
  await render(<App initialEntries={["/counter"]} />);
  const button = await screen.findByRole("button", { name: /count:/i });
  expect(button).toHaveTextContent("Count: 0");
  await userEvent.click(button);
  expect(button).toHaveTextContent("Count: 1");
});
