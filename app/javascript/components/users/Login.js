import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormActionButton } from "./formComponents/FormActionButton";
import { TextForm } from "./formComponents/TextForm";
import { PageLink } from "./formComponents/PageLink";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import { useDispatch } from "react-redux";
import { setUserName } from "./userSlice";

const Login = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <h3>Login</h3>
      <TextForm
        type="text"
        placeholder="romm@example.com"
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev, email: e.target.value }))
        }
      ></TextForm>
      <TextForm
        type="Password"
        placeholder="password"
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev, password: e.target.value }))
        }
      ></TextForm>
      <PageLink>
        Don&apos;t have an account? <a onClick={props.togglePage}>Sign up</a>
      </PageLink>
      <FormActionButton
        className="hover"
        onClick={() => {
          sendAjaxRequest("POST", "/users/sign_in", userInfo)
            .then((response) => {
              if (response?.name.length) {
                dispatch(setUserName(response.name));
              }
              props.toggleModal();
            })
            .catch((e) => {
              console.log(e);
              props.toggleModal();
            });
        }}
      >
        Login
      </FormActionButton>
    </React.Fragment>
  );
};

export default Login;

Login.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  togglePage: PropTypes.func.isRequired,
};
