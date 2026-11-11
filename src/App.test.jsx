import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the student management dashboard", () => {
  render(
    <MemoryRouter initialEntries={["/students"]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /Student Management/i })
  ).toBeInTheDocument();
});