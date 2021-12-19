import React, { Props, useContext } from "react";
import {
  findByTestId,
  render,
  fireEvent,
  act,
  getByText,
  getByTestId,
} from "@testing-library/react";

import Login from "../pages/auth/Login/Login";
import { BrowserRouter } from "react-router-dom";

describe("<Login />", () => {
  const UserResponse = {token: 'user_token'}
  jest.spyOn(window, 'fetch').mockImplementationOnce(() : any => {
    return Promise.resolve({
      json: () => Promise.resolve(UserResponse),
    })
  });

  // unit tests
  test("should render a login form", async () => {
    const login = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginForm = await login.findByTestId("form");
    expect(loginForm).toHaveFormValues({
      email: "",
      password: "",
    });
  });

  test("should allow entering a password", async () => {
    const login = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passsword = await login.findByTestId("password");
    fireEvent.change(passsword, { target: { value: "asd" } });
    expect(passsword).toHaveValue("asd");
  });

  // integration tests
  test("should submit the form with email, and password", async () => {
    const login = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const email = await login.getByTestId("email");
    const passsword = await login.getByTestId("password");
    const submit = await login.getByTestId("form");
    

    await act (async () => {
      fireEvent.change(email, { target: { value: "admin_ilya@gmail.com" } });
    });
    await act (async () => {
      fireEvent.change(passsword, { target: { value: "asd" } });
    });
    await act (async () => {
      fireEvent.submit(submit);
    });

    expect(window.localStorage.getItem('token')).not.toEqual(undefined)
  });
});
