import React, { useReducer, useRef, useState } from "react";
import styled from "styled-components";
import ExitButton from "../shared/ExitButton";
import { NavOption } from "./NavOption";

const TimerContainer = styled.div`
  justify-content: center;
  align-items: center;
  height: 240px;
`;

const TimeDisplay = styled.span`
  display: flex;
  align-items: flex-end;
  width: 50%;
  height: 50%;
  padding-bottom: 5px;
  padding-left: 18%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 32px;
  background-color: ${(props) => props.theme.background};
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 50%;
  height: 25%;

  * {
    flex-grow: 1;
    align-text: center;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 18px;
  }

  .active {
    border-bottom-right-radius: 0;
  }
`;

const NavButton = styled.button`
  height: 100%;
  padding: 0 10px;
  font-size: 16px;
`;

const Timer = () => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useReducer((state, action) => {
    switch (action) {
      case "increment":
        return state + 1;
      case "reset":
        return 0;
    }
  }, 0);
  const [startTimerText, setStartTimerText] = useState(true);
  const runTime = useRef(false);
  const interval = () =>
    setTimeout(() => {
      if (runTime.current) {
        setTime("increment");
        interval();
      }
    }, 100);

  return (
    <React.Fragment>
      <NavOption onClick={() => setShowModal(true)} css={"margin-right: 5px;"}>
        <NavButton className="hover">Timer</NavButton>
      </NavOption>
      {showModal ? (
        <div className="modal">
          <TimerContainer className="modal-wrapper">
            <ExitButton
              toggle={() => setShowModal(false)}
              cssText={"margin-top: -25px; margin-bottom: 0;"}
            />
            <TimeDisplay>{(time / 10).toFixed(1)}</TimeDisplay>
            <ButtonsContainer>
              <button
                className={`hover${time != 0 ? " active" : ""}`}
                onClick={() => {
                  if (!runTime.current) {
                    runTime.current = true;
                    interval();
                  } else {
                    runTime.current = false;
                  }
                  setStartTimerText((prev) => !prev);
                }}
              >
                {startTimerText ? "Start" : "Pause"}
              </button>
              {time != 0 ? (
                <button
                  className="hover"
                  onClick={() => {
                    runTime.current = false;
                    setTimeout(() => setTime("reset"), 11);
                    setStartTimerText(true);
                  }}
                  css={"border-left: unset; border-bottom-left-radius: 0;"}
                >
                  Reset
                </button>
              ) : null}
            </ButtonsContainer>
          </TimerContainer>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Timer;
