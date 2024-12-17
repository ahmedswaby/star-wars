import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { ReduxProvider } from '../app/storeProvider';


describe("Home Component", () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it("renders the loading state initially", () => {
    render(<ReduxProvider><Home /></ReduxProvider>);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(screen.getByTestId("rocket-icon")).toBeInTheDocument();
  });




});
