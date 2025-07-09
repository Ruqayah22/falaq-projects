// import { test, describe } from "vitest";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

// import { App } from "../app";

// describe("Testing app", () => {
//   test("Testing Days Count", async () => {
//     render(<App />);
// //     const input = screen.getByLabelText(/count-input/i);

// //     // Simulate user selecting a date
// //     await userEvent.clear(input);
// //     await userEvent.type(input, "2025-07-01");

// //     // Expect the heading to appear after setting the date
// //     expect(
// //       await screen.findByRole("heading", {
// //         name: /selected date: tue jul 01 2025/i,
// //       })
// //     ).toBeInTheDocument();
// //   });

//   const input = screen.getByRole('input', {name: /count-input/i})
//   const input = screen.getByLabelText(/count-input/i)

//   expect(await screen.findByRole('heading', {
//   //    expect(await screen.getByLabelText('heading', {
//     name: /Selected Date: /i
//   })).toBeDefined()

//   userEvent.click(input)
//   Change(input)

//   expect(await screen.findByRole('heading', {
//     name: /counter: 1/i
//   })).toBeDefined()

//   userEvent.click(button)

//   expect(await screen.findByRole('heading', {
//     name: /counter: 2/i
//   })).toBeDefined()

//       screen.logTestingPlaygroundURL()
//     })
// });

//////////////////////////////////////////////

// import { test, describe, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

// import { App } from "../app";

// describe("Testing app", () => {
//   test("Testing Days Count", async () => {
//     render(<App />);

//     const input = screen.getByLabelText(/count-input/i);

//     // Simulate user selecting a date
//     await userEvent.clear(input);
//     await userEvent.type(input, "2025-07-01");

//     // Wait for the date text to appear
//     expect(await screen.findByText(/selected date:/i)).toBeInTheDocument();

//     expect(await screen.findByText(/Tue Jul 01 2025/i)).toBeInTheDocument();

//     expect(await screen.findByText(/days passed:/i)).toBeInTheDocument();
//   });
// });


//////////////////////////////////////////////////

// import { test, describe, expect } from "vitest";
// import { render, screen, within } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

// import { App } from "../app";

// describe("Testing app", () => {
//   test("Testing Days Count", async () => {
//     render(<App />);

//     // Step 1: Get the date input
//     const input = screen.getByLabelText(/count-input/i);

//     // Step 2: Simulate user selecting a date
//     await userEvent.clear(input);
//     await userEvent.type(input, "2025-07-01");

//     // Step 3: Wait for the Selected Date text to appear
//     const dateLabel = await screen.findByText(/selected date:/i);

//     // Step 4: Assert it contains both label and the selected date in text
//     expect(dateLabel).toHaveTextContent("Selected Date: Tue Jul 01 2025");

//     // Optionally check the days passed too
//     const daysPassed = await screen.findByText(/days passed:/i);
//     expect(daysPassed).toHaveTextContent(/days passed:\s*\d+\s*days/i);
//   });
// });

//////////////////////////////////////////////////

// import { test, describe, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
// import { App } from "../app";

// describe("Testing app", () => {
//   test("renders default selected date info", async () => {
//     render(<App />);

//     const input = screen.getByLabelText(/count-input/i);

//     // expect(await screen.findByText(/selected date:/i)).toBeInTheDocument();
//     // expect(await screen.findByText(/tue Jul 01 2025/i)).toBeInTheDocument();
//     // expect(await screen.findByText(/days passed: 9/i)).toBeInTheDocument();
//     await userEvent.clear(input);
//     await userEvent.type(input, "2025-07-10");

//     expect(await screen.findByText(/Thu Jul 10 2025/i)).toBeInTheDocument();

//   });
// });

/////////////////////////////////////////////////

// import { test, describe } from "vitest";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

// import { App } from "../app";

// describe("Testing app", () => {
//   test("Testing Days Count", async () => {
//     render(<App />);
    

//     // const input = screen.getByRole("p", { name: /count-input/i });
//     const input = screen.getByTestId(/count-input/i);

//     expect(
//       await screen.getByText("Selected Date: Thu Jul 10 2025")
//     ).toBeDefined();

//     userEvent.click(input);
   

//     screen.logTestingPlaygroundURL();
//   });
// });

///////////////////////////

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { App } from "../app";

describe("Testing app", () => {
//   test("Should render <p> with selected date correctly", async () => {
//     render(<App />);

//     // Step 1: Find the input and select a date
//     const input = screen.getByTestId("count-input");
//     await userEvent.clear(input);
//     await userEvent.type(input, "2025-07-10");

//     // Step 2: Wait for the <strong> text to appear
//     const strongDate = await screen.findByText("Thu Jul 10 2025");
//     const strongDate2 = await screen.findByText("1 days");
    
//     // Step 3: Find the parent <p> tag
//     const paragraph = strongDate.closest("p");
//     const paragraph2 = strongDate2.closest("p");
    
//     // Step 4: Assert the <p> exists and has correct full content
//     expect(paragraph).toBeInTheDocument();
//     expect(paragraph).toHaveTextContent("Selected Date: Thu Jul 10 2025");
    
//     expect(paragraph2).toBeInTheDocument();
//     expect(paragraph2).toHaveTextContent("Days to come: 1 days");
  
    

// });

test("Should render <p> with selected future date correctly", async () => {
  render(<App />);

  const input = screen.getByTestId("count-input");

  // Type a future date (e.g., tomorrow)
  await userEvent.clear(input);
  await userEvent.type(input, "2025-07-10");

  // Find expected content
  const selectedDateText = await screen.findByText("Thu Jul 10 2025");
  const daysToComeText = await screen.findByText((content) => //(content, element)
    content.includes("1") && content.includes("days")
  );

  // Check <p> containers
  expect(selectedDateText.closest("p")).toHaveTextContent("Selected Date: Thu Jul 10 2025");
  expect(daysToComeText.closest("p")).toHaveTextContent(/Days to come: 1\s*days/);
});


test("Should show 'days passed' for a past date", async () => {
  render(<App />);
  const input = screen.getByTestId("count-input");
  await userEvent.clear(input);
  await userEvent.type(input, "2025-07-01"); // past

  const pastText = await screen.findByText((text) =>
    text.toLowerCase().includes("days passed")
  );

  expect(pastText).toHaveTextContent(/Days passed:\s*\d+\s*days/);
});
});
