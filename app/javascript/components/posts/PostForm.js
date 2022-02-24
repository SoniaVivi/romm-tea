import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextForm } from "../shared/formComponents/TextForm";
import NumberForm from "../shared/formComponents/NumberForm";
import Rating from "../shared/Rating";
import ItemForm from "../shared/formComponents/ItemForm";
import ItemSelection from "../shared/formComponents/ItemSelection";
import PublicEye from "svgs/eye.svg";
import PrivateEye from "svgs/eyeSlash.svg";
import { Icon } from "../shared/Icon";

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
  flex-flow: column nowrap;
  align-items: center;
  max-height: 71px;
  margin-right: 25px;
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
    temp_unit: "",
    water_quantity: "",
    leaf_quantity: "",
    is_public: true,
  };
  const [postData, setPostData] = useState(
    props.initialState
      ? {
          ...props.initialState,
          temp_unit: props.initialState.tempUnit,
          water_quantity: props.initialState.waterQuantity ?? "",
          leaf_quantity: props.initialState.leafQuantity ?? "",
          is_public: props.initialState.isPublic ?? true,
        }
      : emptyState
  );
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
        <div className="flex">
          <TextForm
            placeholder="Name"
            onChange={onChangeFunc("name")}
            value={postData.name}
          />
          <ItemSelection
            value={postData.is_public}
            items={[true, false]}
            onClick={(newVal) =>
              setPostData((prev) => ({ ...prev, is_public: newVal }))
            }
            displayFunc={(val) => <Icon link={val ? PublicEye : PrivateEye} />}
            cssString={"min-height: 39px; max-height: 39px; margin-top: 0;"}
          />
        </div>
        <RatingWrapper>
          <Rating
            currentRating={postData.rating}
            onClick={(_, i) =>
              setPostData((prev) => ({ ...prev, rating: i + 1 }))
            }
            starSize={30}
          />
        </RatingWrapper>
        <div className="flex">
          <PriceTemperatureWrapper className="flex column wrap">
            <h3 css={"max-width: 104px; max-height: 21px;"}>Temperature</h3>
            <NumberForm
              value={postData.temperature}
              onChange={setPostData}
              fieldName={"temperature"}
            />
            <div css={"height: 100%;"}></div>
            <ItemSelection
              value={postData.temp_unit}
              items={["celsius", "fahrenheit"]}
              onClick={(optionText) =>
                setPostData((prev) => ({ ...prev, temp_unit: optionText }))
              }
              displayFunc={(text) => (text == "celsius" ? "℃" : "℉")}
            />
          </PriceTemperatureWrapper>
          <PriceTemperatureWrapper>
            <h3>Price</h3>
            <NumberForm
              value={postData.price}
              onChange={setPostData}
              fieldName={"price"}
            />
          </PriceTemperatureWrapper>
        </div>
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
          css={"width: 240px;"}
          placeholder="Notes"
          onChange={onChangeFunc("notes")}
          value={postData.notes}
        ></textarea>
        <TextForm
          placeholder="Leaf Quantity"
          onChange={onChangeFunc("leaf_quantity")}
          value={postData.leaf_quantity}
        />
        <TextForm
          placeholder="Water Quantity"
          onChange={onChangeFunc("water_quantity")}
          value={postData.water_quantity}
        />
        <TextForm
          placeholder="Link"
          onChange={onChangeFunc("link")}
          value={postData.link}
        />
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
            const { tags, is_public, ...data } = postData;
            props.submitFunc({
              formData: JSON.stringify(data),
              tags: JSON.stringify(tags),
              is_public: JSON.stringify(is_public),
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
