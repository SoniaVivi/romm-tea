import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilters } from "../postSlice";

const Container = styled.li`
  align-self: center;
  display: flex;
  align-items: center;
  min-width: 30px;
  max-width: 500px;
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

const Tag = styled.li`
  margin-bottom: 0;
  padding-bottom: 0;
  border-color: ${({ theme }) => theme.background};
  ${(props) => (props.isSelected ? "filter: grayscale(40%);" : "")}
  border: 2px solid  ${(props) =>
    props.isSelected ? props.theme.hover : "transparent"};
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
  const postTags = useSelector((state) => {
    const posts = Object.values(state.post.posts);
    if (!posts.length) return [];

    return [
      ...new Set(
        posts.reduce(
          (prev, post) => (prev && post?.tags ? [...prev, ...post.tags] : prev),
          []
        )
      ),
    ];
  });
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("title");
  const [tags, setTags] = useState([]);
  const inputProps = {
    type: "text",
    value: text,
    onChange: (e) => setText(e.target.value),
  };

  const closeModal = () => {
    setActiveTab("title");
    setShowModal(false);
    dispatch(setFilters(text, tags));
  };

  return (
    <Container>
      <input {...inputProps} onClick={() => setShowModal(true)}></input>
      <TagContainer onClick={() => setShowModal(true)}>
        {tags.map((tagName) => (
          <Tag key={tagName} className="tag">
            {tagName}
          </Tag>
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
                {postTags.map((tagName) => (
                  <Tag
                    key={tagName}
                    className="tag"
                    as="button"
                    isSelected={tags.includes(tagName)}
                    onClick={() =>
                      setTags((prev) =>
                        prev.includes(tagName)
                          ? prev.filter((current) => current != tagName)
                          : [...prev, tagName]
                      )
                    }
                  >
                    {tagName}
                  </Tag>
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
