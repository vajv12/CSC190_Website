import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddEventForm from "./AddEventForm";

describe("AddEventForm", () => {
  test("Form submission adds event and displays it in the event list", async () => {
    // Mocking Firebase context and functions
    jest.mock("../FirebaseContext", () => ({
      useFirebase: () => ({
        db: jest.fn(),
      }),
    }));

    // Render the component
    render(<AddEventForm />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText("Event Title"), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2024-05-01" },
    });
    fireEvent.change(screen.getByLabelText("Event Description"), {
      target: { value: "This is a test event." },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Event"));

    // Wait for the success alert
    await waitFor(() => expect(screen.getByText("Event added successfully!")).toBeInTheDocument());

    // Check if the event appears in the event list
    expect(screen.getByText("Test Event")).toBeInTheDocument();
  });

  test("Deleting event removes it from the event list", async () => {
    // Mocking Firebase context and functions
    jest.mock("../FirebaseContext", () => ({
      useFirebase: () => ({
        db: jest.fn(),
      }),
    }));

    // Render the component
    render(<AddEventForm />);

    // Add a test event
    fireEvent.change(screen.getByLabelText("Event Title"), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2024-05-01" },
    });
    fireEvent.change(screen.getByLabelText("Event Description"), {
      target: { value: "This is a test event." },
    });
    fireEvent.click(screen.getByText("Add Event"));
    await waitFor(() => expect(screen.getByText("Event added successfully!")).toBeInTheDocument());

    // Check if the event appears in the event list
    expect(screen.getByText("Test Event")).toBeInTheDocument();

    // Delete the test event
    fireEvent.click(screen.getByText("Delete"));
    
    // Wait for the success alert
    await waitFor(() => expect(screen.getByText("Event deleted successfully!")).toBeInTheDocument());

    // Check if the event is removed from the event list
    expect(screen.queryByText("Test Event")).not.toBeInTheDocument();
  });
});
