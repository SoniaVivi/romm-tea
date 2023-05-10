import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { TextForm } from "../../shared/formComponents/TextForm";
import { PageLink } from "../../shared/formComponents/PageLink";
import { FormActionButton } from "../../shared/formComponents/FormActionButton";
import { setUserName } from "../userSlice";

const Signup = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
  });
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <h3>Sign up</h3>
      <TextForm
        type="text"
        placeholder="romm@example.com"
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev, email: e.target.value }))
        }
      ></TextForm>
      <TextForm
        type="text"
        placeholder="Romm Shindou"
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev, name: e.target.value }))
        }
      ></TextForm>
      <TextForm
        type="Password"
        placeholder="password"
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev, password: e.target.value }))
        }
      ></TextForm>
      <TextForm
        type="Password"
        placeholder="password confirmation"
        onChange={(e) =>
          setUserInfo((prev) => ({
            ...prev,
            passwordConfirmation: e.target.value,
          }))
        }
      ></TextForm>
      <PageLink>
        Already have an account? <a onClick={props.togglePage}>Sign in</a>
      </PageLink>
      <FormActionButton
        className="hover"
        onClick={() => {
          if (
            userInfo.name.length < 3 ||
            !userInfo.email.length ||
            !userInfo.password.length
          ) {
            return;
          }
          fetch("/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRF-Token": document.querySelector('[name="csrf-token"]')
                .content,
            },
            body: JSON.stringify(userInfo),
          })
            .then((r) => r.json())
            .then((response) => {
              if (response?.name.length) {
                dispatch(setUserName(response.name));
                fetch("/users/sign_in", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": document.querySelector(
                      '[name="csrf-token"]'
                    ).content,
                  },
                  body: JSON.stringify({
                    email: userInfo.email,
                    password: userInfo.password,
                  }),
                });
              } else {
                console.log("X", response);
              }
            })
            .catch((e) => console.log(e))
            .finally(() => props.toggleModal());
        }}
      >
        Sign up
      </FormActionButton>
    </React.Fragment>
  );
};

export default Signup;

Signup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  togglePage: PropTypes.func.isRequired,
};
