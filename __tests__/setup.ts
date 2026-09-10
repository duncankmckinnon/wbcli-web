import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// This project runs vitest without `globals`, so @testing-library/react's
// automatic per-test cleanup (which only fires when `afterEach` is global)
// never runs. Without it, rendered DOM accumulates across tests and
// `getBy*` queries throw "multiple elements found". Register it explicitly.
afterEach(() => {
  cleanup();
});
