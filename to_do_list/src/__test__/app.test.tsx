import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {App} from "../app"; 

describe("Testing app", () => {
  test("adds an item to the list", async () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const submitBtn =
      screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "Test input");
    await userEvent.click(submitBtn);

    const list = await screen.findByRole("list"); 
    expect(list).toBeInTheDocument();
    expect(await screen.findByText("Test input")).toBeInTheDocument();
  });
  test("showing error message", async () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const submitBtn = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "too long input data");
    await userEvent.click(submitBtn);

    screen.logTestingPlaygroundURL();
    const list = await screen.findByText(
      /too big: expected string to have <=10 characters/i
    );
    expect(list).toBeInTheDocument();
  });
});
