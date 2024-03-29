/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import useUrlQueryState from "./useUrlQueryState";
import userEvent from "@testing-library/user-event";

const TestComponent = ({
  initialValue = "initial value",
  newValue = "new value",
}: {
  initialValue?: string;
  newValue?: string;
}) => {
  const [value, setValue] = useUrlQueryState("prop", initialValue);

  const handleClick = () => {
    setValue(newValue);
  };

  return (
    <>
      <h1>{value}</h1>
      <button id="testButton" onClick={handleClick}>
        Click
      </button>
    </>
  );
};

const TestComponentWithLocation = ({
  initialValue = "initial value",
  newValue = "new value",
}: {
  initialValue?: string;
  newValue?: string;
}) => {
  const [value, setValue] = useUrlQueryState("prop", initialValue);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setValue(newValue);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1 data-testid="searchParam">{location.search}</h1>
      <h1 data-testid="value">{value}</h1>
      <button data-testid="navigateButton" onClick={handleClick}>
        Click
      </button>
      <button data-testid="backButton" onClick={handleBack}>
        BACK
      </button>
    </>
  );
};

describe("useUrlQueryState", () => {
  it("should get the default value", () => {
    // arrange

    // act
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "?" }]}>
        <TestComponent initialValue="initial value"></TestComponent>
      </MemoryRouter>,
    );

    // assert
    expect(screen.getByRole("heading").textContent).toEqual("initial value");
  });

  it("should get handle updates", async () => {
    // arrange
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", search: "?" }]}>
        <TestComponent newValue="another value"></TestComponent>
      </MemoryRouter>,
    );

    // act
    await userEvent.click(screen.getByRole("button"));

    // assert
    expect(screen.getByRole("heading").textContent).toEqual("another value");
  });

  describe("route query parameter", () => {
    it("should update", async () => {
      // arrange
      render(
        <MemoryRouter initialEntries={[{ pathname: "/", search: "?" }]}>
          <TestComponentWithLocation newValue="another value"></TestComponentWithLocation>
        </MemoryRouter>,
      );

      // act
      await userEvent.click(screen.getByTestId("navigateButton"));

      // assert
      expect(screen.getByTestId("searchParam").textContent).toEqual(
        "?prop=%22another+value%22",
      );
    });

    it("should load from route", async () => {
      // arrange
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?prop=%22some+value%22" }]}
        >
          <TestComponent></TestComponent>
        </MemoryRouter>,
      );

      // act

      // assert
      expect(screen.getByRole("heading").textContent).toEqual("some value");
    });

    it("should change state when the route changes", async () => {
      // arrange
      render(
        <MemoryRouter
          initialEntries={[
            { pathname: "/", search: "?prop=%22start+value%22" },
          ]}
        >
          <TestComponentWithLocation
            initialValue="start"
            newValue="updated"
          ></TestComponentWithLocation>
        </MemoryRouter>,
      );

      // act
      await userEvent.click(screen.getByTestId("navigateButton"));
      await userEvent.click(screen.getByTestId("backButton"));

      // assert
      expect(screen.getByTestId("value").textContent).toEqual("start value");
    });

    it("should remove items when the value is equal to the default", async () => {
      // arrange
      render(
        <MemoryRouter
          initialEntries={[{ pathname: "/", search: "?prop=%22some+value%22" }]}
        >
          <TestComponentWithLocation
            initialValue="initial value"
            newValue="initial value"
          ></TestComponentWithLocation>
        </MemoryRouter>,
      );

      expect(screen.getByTestId("searchParam").textContent).toEqual(
        "?prop=%22some+value%22",
      );

      // act
      await userEvent.click(screen.getByTestId("navigateButton"));

      // assert
      expect(screen.getByTestId("searchParam").textContent).toEqual("");
    });
  });
});
