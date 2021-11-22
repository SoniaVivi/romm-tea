import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";
import thermometer from "svgs/thermometer.svg";
import clock from "svgs/clock.svg";
import TrimmedLink from "./TrimmedLink";
import { relativeTime } from "../../helpers/dateHelpers";
import { Icon } from "../shared/Icon";
import Rating from "../shared/Rating";
import OptionsContainer from "./OptionsContainer";

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
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  margin-bottom: 5px;
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

const Post = (props) => {
  const data = useSelector((state) => state.post.posts[props.id]);

  if (data) {
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

    return (
      <PostBody className="background-post">
        <OptionsContainer postId={data.id} />
        <Field>
          <h3>{data.name}</h3>
        </Field>
        <Field>
          <PosterDate>
            Posted by {data.poster}{" "}
            {relativeTime(new Date(data.posted), { croppedFormat: true })} ago
          </PosterDate>
        </Field>
        <Field>
          <Rating currentRating={data.rating} />
        </Field>
        <Field>
          <Icon link={thermometer} color="#000000" marginRight={"2px"} />
          {data.temperature}
          <Divider size={"4px"} />
          <Icon link={clock} color="#000000" marginRight={"3px"} />
          {data.time ? data?.time.join(" ") : null}
        </Field>
        <Field>{price}</Field>
        <p>{data.notes}</p>
        <Field>
          <TrimmedLink href={data.link} />
        </Field>
        <TagContainer>
          {[...data.tags]
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
        </TagContainer>
      </PostBody>
    );
  } else {
    return <PostBody></PostBody>;
  }
};

export default Post;

Post.propTypes = { id: PropTypes.number.isRequired };
