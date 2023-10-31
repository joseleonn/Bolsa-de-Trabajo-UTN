import React from "react";
import { render, screen } from "@testing-library/react";
import BotButton from "../components/BotButton";
import { test } from "vitest";
import userEvent from "@testing-library/user-event";

test("Renders BotButton component without errors", () => {
  render(<BotButton />);
});
test("Checks the existence of Telegram button", () => {
  const { container } = render(<BotButton />);
  const telegramButton = container.querySelector(
    "button[name='Telegram Button']"
  );

  expect(telegramButton).toBeTruthy();
});
test("Checks the existence of WhatsApp button", () => {
  const { container } = render(<BotButton />);
  const whatsappButton = container.querySelector(
    "button[name='WhatsApp Button']"
  );

  expect(whatsappButton).toBeTruthy();
});
