import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/apiServer/server.mock";
import user from "@testing-library/user-event";

expect.extend(matchers);

beforeAll(() => {
    server.listen();
});

beforeEach(() => {
    user.setup();
})

afterEach(() => {
    cleanup();

    server.resetHandlers();
});

afterAll(() => {
    server.close();
});