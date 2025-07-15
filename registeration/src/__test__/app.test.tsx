import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { App } from "../app";

describe("Testing app", () => {
  test("create account", async () => {
    render(<App />);

    const input = screen.getByLabelText(/firstName/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "first name");
    await userEvent.click(submitBtn);

    // ✅ Assert value is in input
    expect(input).toHaveValue("first name");

    // ✅ Optionally: check if value was added somewhere in the DOM (if you re-enable the <ul>)
    // expect(await screen.findByText("first name")).toBeInTheDocument();
  });

  test("showing error message", async () => {
    render(<App />);

    const input = screen.getByLabelText(/firstName/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "too long input data");
    await userEvent.click(submitBtn);

    screen.logTestingPlaygroundURL();

    const errorName = await screen.findByText(
      /too big: expected string to have <=12 characters/i
    );
    expect(errorName).toBeInTheDocument();
  });
});
