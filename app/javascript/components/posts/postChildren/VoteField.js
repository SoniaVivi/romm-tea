import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import sendAjaxRequest from "../../shared/sendAjaxRequest";
import { setScore } from "../postSlice";

const padding = `
  padding-top: 1px;
  padding-bottom: 2px;
`;

const Container = styled.div`
  display: flex;
  align-items: baseline;
  background-color: ${(props) => props.theme.background};

  * {
    margin: 0 2px;
  }
`;

const ScoreDisplay = styled.span`
  padding: 0 2px;
  ${padding}
  font-size: 15px;
  user-select: none;
  // background-color: ${(props) => props.theme.background};
`;

const voteButtonPadding = "3px";

const VoteButton = styled.button`
  padding: 0 ${voteButtonPadding};
  ${padding}
  font-size: 13px;

  // &:first-child {
  //   margin-left: -${voteButtonPadding};
  // }
`;

const VoteField = (props) => {
  const dispatch = useDispatch();

  const onVote = (voteType) => () => {
    let requestType = "POST";
    if (
      (voteType == "down" && props.voteType == -1) ||
      (voteType == "up" && props.voteType == 1)
    ) {
      requestType = "DELETE";
    }
    sendAjaxRequest(
      requestType,
      "/votes",
      {
        post_id: props.postId,
        vote_type: voteType,
      },
      (response) =>
        response.success &&
        dispatch(
          setScore(
            props.postId,
            requestType == "DELETE" ? 0 : voteType,
            response.score
          )
        )
    );
  };
  return (
    <Container>
      <VoteButton onClick={onVote("up")} className="hover">
        Like
      </VoteButton>
      <ScoreDisplay>{props.score}</ScoreDisplay>
      <VoteButton onClick={onVote("down")} className="hover">
        Dislike
      </VoteButton>
    </Container>
  );
};

export default VoteField;

VoteField.propTypes = {
  postId: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  voteType: PropTypes.number.isRequired,
};
