import React from "react";
import PropTypes from "prop-types";
import starFill from "svgs/starFill.svg";
import starOutline from "svgs/starOutline.svg";
import { Icon } from "./Icon";

const Rating = (props) => {
  const onClick = (starType, i) => () => props.onClick(starType, i) ?? null;
  return (
    <React.Fragment>
      {Array(5)
        .fill()
        .map((_, i) =>
          i < props.currentRating ? (
            <Icon
              key={i}
              link={starFill}
              color="#25c5df"
              onClick={onClick("filled", i)}
              size={props.starSize ?? null}
            />
          ) : (
            <Icon
              key={i}
              link={starOutline}
              color="#25c5df"
              onClick={onClick("empty", i)}
              size={props.starSize ?? null}
            />
          )
        )}
    </React.Fragment>
  );
};

export default Rating;

Rating.propTypes = {
  currentRating: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  starSize: PropTypes.string,
};
