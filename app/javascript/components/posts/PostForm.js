import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextForm } from "../shared/formComponents/TextForm";
import NumberForm from "../shared/formComponents/NumberForm";
import Rating from "../shared/Rating";
import ItemForm from "../shared/formComponents/ItemForm";

const Wrapper = styled.div`
  align-items: center;
  min-height: 480px;
  overflow-y: scroll;

  > *:not(.exit) {
    margin-bottom: 15px;
  }
`;

const PriceTemperatureWrapper = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-right: 25px;
  }
`;

const RatingWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
`;

const SubmitButton = styled.button`
  height: 40px;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.postColor};
  border-radius: 30px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.background};
`;

const PostForm = (props) => {
  const emptyState = {
    name: "",
    rating: 0,
    temperature: 0,
    time: [0, 0, 0],
    price: 0,
    notes: "",
    link: "",
    tags: [""],
  };
  const [postData, setPostData] = useState(props.initialState ?? emptyState);
  const onChangeFunc =
    (fieldName, mutator = (data) => data) =>
    (e) =>
      setPostData((prev) => ({
        ...prev,
        [fieldName]: mutator(e.target.value),
      }));

  return (
    <div className="modal">
      <Wrapper className="modal-wrapper">
        <div onClick={props.toggle} className="exit">
          <div></div>
          <div></div>
        </div>
        <TextForm placeholder="Name" onChange={onChangeFunc("name")} />
        <RatingWrapper>
          <Rating
            currentRating={postData.rating}
            onClick={(_, i) =>
              setPostData((prev) => ({ ...prev, rating: i + 1 }))
            }
            starSize={30}
          />
        </RatingWrapper>
        <PriceTemperatureWrapper>
          <div>
            <h3>Temperature</h3>
            <NumberForm
              value={postData.temperature}
              onChange={setPostData}
              fieldName={"temperature"}
            />
          </div>
          <div>
            <h3>Price</h3>
            <NumberForm
              value={postData.price}
              onChange={setPostData}
              fieldName={"price"}
            />
          </div>
        </PriceTemperatureWrapper>
        <ItemForm
          items={postData.time}
          modifyItems={(mutator) =>
            setPostData((prev) => ({ ...prev, time: mutator(prev.time) }))
          }
          newItemValue={0}
          removeHeaderText="Remove Cup"
          editHeaderText="Edit Cup Times"
          childType="number"
        />
        <textarea
          placeholder="Notes"
          onChange={onChangeFunc("notes")}
        ></textarea>
        <TextForm placeholder="Link" onChange={onChangeFunc("link")} />
        <ItemForm
          items={postData.tags}
          modifyItems={(mutator) =>
            setPostData((prev) => ({ ...prev, tags: mutator(prev.tags) }))
          }
          newItemValue={""}
          removeHeaderText="Remove Tags"
          editHeaderText="Edit tags"
          childType="text"
        />
        <SubmitButton
          className="hover"
          onClick={() => {
            const { tags, ...data } = postData;
            props.submitFunc({
              formData: JSON.stringify(data),
              tags: JSON.stringify(tags),
            });
          }}
        >
          Submit
        </SubmitButton>
      </Wrapper>
    </div>
  );
};

export default PostForm;

PostForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  submitFunc: PropTypes.func.isRequired,
  initialState: PropTypes.object,
};
