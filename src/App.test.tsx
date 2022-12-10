import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Mac OS Finder App", () => {
  render(<App />);
  const linkElement = screen.getByText(/Documents/i);
  expect(linkElement).toBeInTheDocument();
});
