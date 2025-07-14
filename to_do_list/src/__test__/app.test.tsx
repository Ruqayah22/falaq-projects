import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import AppView from "../app/app.view"; 

describe("Testing app", () => {
  test("adds an item to the list", async () => {
    render(<AppView />);

    const input = screen.getByRole("textbox");
    const submitBtn =
      screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "Test input");
    await userEvent.click(submitBtn);

    const list = await screen.findByRole("list"); 
    expect(list).toBeInTheDocument();
    expect(await screen.findByText("Test input")).toBeInTheDocument();
  });
});
