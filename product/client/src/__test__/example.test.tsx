import { test } from "vitest";
import { render, screen } from "@testing-library/react";

import { App } from "../app";
import userEvent from "@testing-library/user-event";

describe("Testing products", () => {
  // all products
  test("rendering list of products", async () => {
    render(<App />);

    const element = await screen.findByText("test one");
    expect(element).toBeDefined();
  });

  // one product
  test("renders one product by default", async () => {
    render(<App />);

    const title = await screen.findByText("test one");
    const description = await screen.findByText("test description one");

    expect(title).toBeDefined();
    expect(description).toBeDefined();
  });

  // create product
  test("creates and renders new product", async () => {
    render(<App />);

    const name = screen.getByRole("textbox", { name: /title/i });
    const description = screen.getByRole("textbox", { name: /description/i });
    const price = screen.getByRole("spinbutton", { name: /price/i });
    const submit = screen.getByRole("button", { name: /create/i });

    await userEvent.type(name, "Paracetamol");
    await userEvent.type(description, "Paracetamol Description");
    await userEvent.type(price, "3000");
    await userEvent.click(submit);

    const productTitle = await screen.findByText("Paracetamol");
    const productDescription = await screen.findByText(
      "Paracetamol Description"
    );

    expect(productTitle).toBeDefined();
    expect(productDescription).toBeDefined();
  });

  // updata product
  test("updata product", async () => {
    render(<App />);

    const editButton = await screen.findByTestId("edit-1");
    await userEvent.click(editButton);

    const name = screen.getByRole("textbox", { name: /title/i });
    const description = screen.getByRole("textbox", { name: /description/i });
    const price = screen.getByRole("spinbutton", { name: /price/i });
    const submit = await screen.findByRole("button", { name: /save/i });

    await userEvent.clear(name);
    await userEvent.type(name, "Paracetamol2");
    await userEvent.clear(description);
    await userEvent.type(description, "Paracetamol 2 Description");
    await userEvent.clear(price);
    await userEvent.type(price, "3500");
    await userEvent.click(submit);

    const productTitle = await screen.findByText("Paracetamol2");
    const productDescription = await screen.findByText(
      "Paracetamol 2 Description"
    );

    expect(productTitle).toBeDefined();
    expect(productDescription).toBeDefined();
  });

  // delete product
  test("deletes a product", async () => {
    render(<App />);
    const deleteBtn = await screen.findByTestId("delete-2");
    await userEvent.click(deleteBtn);

    const deletedItem = screen.queryByText("test two");
    expect(deletedItem).toBeNull();
  });

  // error message

  test("error message", async () => {
    render(<App />);

    const submit = screen.getByRole("button", { name: /create/i });
    await userEvent.click(submit);

    // screen.logTestingPlaygroundURL(); // for show the ui code 

    // const titleError = await screen.findByText(
    //   "Too small: expected string to have >=1 characters"
    // );

    const titleError = await screen.getByTestId("error-title");
    // const descriptionError = await screen.findByText(
    //   "Too small: expected string to have >=1 characters"
    // );

    // const descriptionError = await screen.getByText(
    //   /too small: expected string to have >=1 characters/i
    // );
    const descriptionError = await screen.getByTestId("error-description");

    const priceError = await screen.findByText(
      "Too small: expected number to be >=250"
    );

    // const priceError = await screen.getByText(
    //   /too small: expected number to be >=250/i
    // );

    // const priceError = await screen.getByTestId("error-price");

    expect(titleError).toBeDefined();
    expect(descriptionError).toBeDefined();
    expect(priceError).toBeDefined();
  });
});
