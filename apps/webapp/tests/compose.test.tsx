import ComposeMail from "@/pages/compose";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(),
  };
});
import { useRouter } from "next/router";

describe("compose email page", () => {
  beforeEach(() => {
    // @ts-ignore
    jest.mocked(useRouter).mockReturnValue({ push: {} });
  });

  it("should render toemail input, subject input and body input", () => {
    render(<ComposeMail />);
    const subjectComp = screen.getByLabelText(/subject/i);
    const toEmailComp = screen.getByLabelText(/Recipient Email Address/i);
    const bodyComp = screen.getByLabelText(/email body/i);

    expect(toEmailComp).toBeInTheDocument();
    expect(bodyComp).toBeInTheDocument();
    expect(subjectComp).toBeInTheDocument();
  });

  it("should render a send button", () => {
    render(<ComposeMail />);

    const sendButton = screen.getByRole("button", { name: "Send" });
    screen.debug();
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeEnabled();
  });
});
