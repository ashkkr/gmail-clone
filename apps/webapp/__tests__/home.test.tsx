import "@testing-library/jest-dom";
import { getByLabelText, render, screen } from "@testing-library/react";
import Home from "@/pages/home/[userid]";
import { Email } from "@repo/db";
import { MailListProps } from "@repo/ui";

describe("Homepage", () => {
  it("should render a search box with a label", () => {
    render(<Home emails={[]} />);

    const searchBar = screen.getByRole("combobox");
    const searchBarLabel = screen.getByLabelText(/search/i);

    expect(searchBar).toBeInTheDocument();
    expect(searchBarLabel).toBeInTheDocument();
  });

  it("should render no emails since no emails are sent", () => {
    render(<Home emails={[]} />);

    const emailRows = screen.getByText(/0–0 of 0/);
    expect(emailRows).toBeInTheDocument();
  });

  it("should render email", () => {
    const mockEmails: MailListProps[] = [
      {
        id: 1,
        subject: "subject",
        body: "this is an imp email",
        createdAt: "2024-01-01",
      },
    ];
    render(<Home emails={mockEmails} />);

    const emailSubject = screen.getByText(/subject/i);
    const emailBody = screen.getByText(/email/i);
    const pagination = screen.getByText(/1–1 of 1/);
    const checkbox = screen.getAllByRole("checkbox");

    expect(emailSubject).toBeInTheDocument();
    expect(emailBody).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
    checkbox.forEach((c) => {
      expect(c).not.toBeChecked();
    });
  });
});
