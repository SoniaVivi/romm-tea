import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setFilters } from "../../redux/optionSlice";
import { useGetTagsQuery } from "../../redux/postSlice";
import Tag from "../../styled/Tag";

const Container = styled.li`
  align-self: center;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  flex-basis: 300px;
  height: 36px;
  margin-left: auto;
  margin-right: 15px;
  border: 1px solid ${({ theme }) => theme.postColor};
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
`;

const TagContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const NavTag = styled(Tag)`
  margin-bottom: 0;
  padding-bottom: 0;
  border-color: ${({ theme }) => theme.background};
  ${(props) => (props.isSelected ? "filter: grayscale(40%);" : "")}
  border-color: ${(props) =>
    props.isSelected ? props.theme.hover : "transparent"};
  border-width: 2px;
  border-style: solid;
  user-select: none;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 39px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.background};

  * {
    font-size: 16px;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  margin-left: 5px;
  background-color: ${(props) =>
    props.active ? props.theme.postColor : props.theme.background};
  ${(props) =>
    props.active ? `box-shadow: 0 5px 2px rgba(0, 0, 0, 0.1);` : ""};
`;

const SearchTagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 100%;
`;

const ModalWrapper = styled.div`
  input {
    height: 39px;
    border: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const Search = () => {
  const { tags: postTags } = useGetTagsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      tags: data?.entities || {},
    }),
  });

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("title");
  const [tagIds, setTagIds] = useState([]);
  const inputProps = {
    type: "text",
    value: text,
    onChange: (e) => setText(e.target.value),
  };

  const closeModal = () => {
    setActiveTab("title");
    setShowModal(false);
    dispatch(setFilters(text, tagIds));
  };

  return (
    <Container>
      <input
        {...inputProps}
        onClick={() => setShowModal(true)}
        css={"height: 100%;"}
      ></input>
      <TagContainer onClick={() => setShowModal(true)}>
        {tagIds.map((tagId) => (
          <NavTag key={tagId} className="tag" as="li">
            {postTags[tagId].name}
          </NavTag>
        ))}
      </TagContainer>
      {showModal ? (
        <div className="modal">
          <ModalWrapper className="modal-wrapper">
            <div onClick={closeModal} className="exit">
              <div></div>
              <div></div>
            </div>
            <SearchButtonContainer>
              <SearchButton
                active={activeTab == "title"}
                onClick={() => setActiveTab("title")}
              >
                Title
              </SearchButton>
              <SearchButton
                active={activeTab == "tag"}
                onClick={() => setActiveTab("tag")}
              >
                Tags
              </SearchButton>
            </SearchButtonContainer>
            {activeTab == "title" ? (
              <input
                {...inputProps}
                onKeyDown={(e) => (e.code == "Enter" ? closeModal() : "")}
              ></input>
            ) : (
              <SearchTagContainer>
                {Object.values(postTags).map(({ name: tagName, id }) => (
                  <NavTag
                    key={id}
                    className="tag"
                    as="button"
                    isSelected={tagIds.includes(id)}
                    onClick={() =>
                      setTagIds((prev) =>
                        prev.includes(id)
                          ? prev.filter((current) => current != id)
                          : [...prev, id]
                      )
                    }
                  >
                    {tagName}
                  </NavTag>
                ))}
              </SearchTagContainer>
            )}
          </ModalWrapper>
        </div>
      ) : null}
    </Container>
  );
};

export default Search;
