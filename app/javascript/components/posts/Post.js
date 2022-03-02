import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import thermometer from "svgs/thermometer.svg";
import clock from "svgs/clock.svg";
import TrimmedLink from "./TrimmedLink";
import { relativeTime } from "../../helpers/dateHelpers";
import { Icon } from "../shared/Icon";
import waterDroplet from "svgs/droplet.svg";
import Rating from "../shared/Rating";
import OptionsContainer from "./OptionsContainer";
import Tag from "../styled/Tag";
import PublicEye from "svgs/eye.svg";
import PrivateEye from "svgs/eyeSlash.svg";
import sendAjaxRequest from "../shared/sendAjaxRequest";
import { setScore } from "./postSlice";

const PostBody = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  max-width: 100%;
  width: calc(33% - 10px);
  margin: 0 ${({ theme }) => theme.postSideMargin}px;
  ${({ theme }) => theme.postMarginBottom}
  padding: 8px ${({ theme }) => theme.postSidePadding}px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  @media (max-width: 720px) {
    width: calc(50% - 14px);
  }

  @media (max-width: 540px) {
    width: calc(100% - 19px);
  }
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  margin-bottom: 5px;

  h3 {
    word-break: break-word;
  }
`;

const Divider = styled.div`
  align-self: center;
  max-width: ${(props) => props.size};
  max-height: ${(props) => props.size};
  min-width: ${(props) => props.size};
  min-height: ${(props) => props.size};
  margin: 0 5px;
  border: 1px solid ${({ theme }) => theme.postColor};
  border-radius: 50%;
  background: radial-gradient(
    ${(props) => props.theme.text},
    ${({ theme }) => theme.postColor}
  );
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -2px;
`;

const PosterDate = styled.span`
  font-size: 12px;
  color: #808080;
`;

const LeafQuantityWrapper = styled(Field)`
  align-items: flex-start;

  .hint {
    top: 30px;
    left: 15px;
    height: fit-content;
  }
`;

const IconWrapper = styled.div`
  align-items: center;
`;

const Post = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.name);
  const data = useSelector((state) => state.post.posts[props.id]);

  if (!data) {
    return <PostBody></PostBody>;
  }

  const price =
    "$" +
    (() => {
      const decimalPlace = data.price.search(/\./);
      if (decimalPlace == data.price.length - 3) {
        return data.price;
      } else if (decimalPlace == -1) {
        return `${data.price}.00`;
      } else {
        return `${data.price}${"0" * (decimalPlace - data.price.length)}`;
      }
    })();

  const onVote = (voteType) => () => {
    let requestType = "POST";
    if (
      (voteType == "down" && data.voteType == -1) ||
      (voteType == "up" && data.voteType == 1)
    ) {
      requestType = "DELETE";
    }
    sendAjaxRequest(
      requestType,
      "/votes",
      {
        post_id: data.id,
        vote_type: voteType,
      },
      (response) =>
        response.success &&
        dispatch(
          setScore(
            data.id,
            requestType == "DELETE" ? 0 : voteType,
            response.score
          )
        )
    );
  };

  return (
    <PostBody className="background-post">
      <OptionsContainer postId={data.id} />
      <Field>
        <h3>{data.name}</h3>
        {currentUser == data.poster ? (
          <IconWrapper className="hint-container">
            <Icon
              link={
                data.isPublic || data.isPublic == null ? PublicEye : PrivateEye
              }
              css={"margin-left: 5px;"}
            />
            <span className="hint" css={"width: 110px;"}>
              Can be seen{" "}
              {data.isPublic || data.isPublic == null
                ? "by anyone"
                : "only by you"}
            </span>
          </IconWrapper>
        ) : null}
      </Field>
      <Field>
        <PosterDate>
          Posted by {data.poster}{" "}
          {relativeTime(new Date(data.posted), { croppedFormat: true })} ago
        </PosterDate>
      </Field>
      <Field>
        <Rating currentRating={data.rating} />
        <Divider size={"4px"} />
        {data.score}
        <button onClick={onVote("up")}>+</button>
        <button onClick={onVote("down")}>-</button>
      </Field>
      <Field>
        <IconWrapper className="hint-container">
          <Icon link={thermometer} marginRight={"2px"} />
          {data.temperature}
          {data.tempUnit == "fahrenheit" ? "℉" : "℃"}
          <span className="hint">Temperature</span>
        </IconWrapper>
        <Divider size={"4px"} />
        <IconWrapper className="hint-container">
          <Icon link={clock} marginRight={"3px"} />
          {data.time ? data?.time.join(" ") : null}
          <span
            className="hint"
            css={`
              width: 180px;
            `}
          >
            Infusion time for each consequent cup in seconds
          </span>
        </IconWrapper>
      </Field>
      <Field>{price}</Field>
      {data.leafQuantity ? (
        <LeafQuantityWrapper className="hint-container">
          <span css={"width: 40px;"}>茶葉</span>
          <span>{data.leafQuantity}</span>
          <span className="hint">Leaf Quantity</span>
        </LeafQuantityWrapper>
      ) : null}
      {data.waterQuantity ? (
        <Field className="hint-container">
          <Icon link={waterDroplet} marginRight={"3px"} />
          <span>{data.waterQuantity}</span>
          <span className="hint" css={"left: 15%;"}>
            Water Quantity
          </span>
        </Field>
      ) : null}
      <p>{data.notes}</p>
      <Field>
        <TrimmedLink href={data.link} />
      </Field>
      <TagContainer>
        {[...data.tags]
          .sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
      </TagContainer>
    </PostBody>
  );
};

export default Post;

Post.propTypes = { id: PropTypes.number.isRequired };
