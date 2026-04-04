import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "@/components/shared/copy-button";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<CopyButton text="hello" />);
    expect(
      screen.getByLabelText("Copy to clipboard")
    ).toBeInTheDocument();
  });

  it("renders a button element", () => {
    render(<CopyButton text="hello" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders copy icon SVG initially", () => {
    const { container } = render(<CopyButton text="hello" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Copy icon has rect + path
    expect(container.querySelector("rect")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("copies text to clipboard when clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<CopyButton text="pip install wbcli" />);

    await user.click(screen.getByRole("button"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "pip install wbcli"
    );
  });

  it("shows checkmark icon after copying", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<CopyButton text="hello" />);

    await user.click(screen.getByRole("button"));

    // Should now show checkmark (polyline) instead of copy icon (rect)
    expect(container.querySelector("polyline")).toBeInTheDocument();
    expect(container.querySelector("rect")).not.toBeInTheDocument();
  });

  it("changes aria-label to Copied after click", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<CopyButton text="hello" />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByLabelText("Copied")).toBeInTheDocument();
  });

  it("reverts to copy icon after 2 seconds", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(<CopyButton text="hello" />);

    await user.click(screen.getByRole("button"));

    // Verify checkmark is shown
    expect(container.querySelector("polyline")).toBeInTheDocument();

    // Advance past the 2-second timeout
    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    // Should revert to copy icon
    expect(container.querySelector("rect")).toBeInTheDocument();
    expect(container.querySelector("polyline")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Copy to clipboard")).toBeInTheDocument();
  });

  it("accepts and applies className prop", () => {
    render(<CopyButton text="hello" className="my-custom-class" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("my-custom-class");
  });

  it("has default styling classes", () => {
    render(<CopyButton text="hello" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("inline-flex");
    expect(button.className).toContain("rounded-md");
    expect(button.className).toContain("p-2");
  });

  it("is a named export, not a default export", async () => {
    const mod = await import("@/components/shared/copy-button");
    expect(mod.CopyButton).toBeDefined();
    expect(mod).not.toHaveProperty("default");
  });
});
