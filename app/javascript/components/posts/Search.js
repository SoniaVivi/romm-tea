import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilters } from "./postSlice";

const Container = styled.li`
  align-self: center;
  display: flex;
  align-items: center;
  height: 36px;
  margin-left: auto;
  margin-right: 32px;
  border: 1px solid ${({ theme }) => theme.postColor};
  background-color: ${({ theme }) => theme.background};
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
  ${(props) =>
    props.isSelected ? `border: 2px solid ${props.theme.hover}` : ""}
`;

const SearchBar = styled.input`
  padding-left: 5px;
  background-color: ${({ theme }) => theme.background};

  &:focus {
    border: unset;
    outline: unset;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 9999999999999999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 480px;
  min-height: 240px;
  width: 100%;
  height: fit-content;
  padding: 5px 20px 0 20px;
  background-color: ${({ theme }) => theme.postColor};

  input {
    height: 39px;
    padding-left: 10px;
    border: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 39px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.background};
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
  flex-flow: row nowrap;
`;

const closeButtonSize = "32px";

const CloseButton = styled.button`
  position: relative;
  max-width: ${closeButtonSize};
  min-width: ${closeButtonSize};
  max-height: ${closeButtonSize};
  min-height: ${closeButtonSize};
  margin: 0 -15px 5px auto;
  border: 1px solid ${(props) => props.theme.postColor};
  border-radius: 50%;

  &:hover {
    background-color: ${(props) => props.theme.background};
  }

  * {
    position: absolute;
    top: 45%;
    left: 20%;
    width: 60%;
    height: 2px;
    background-color: ${(props) => props.theme.text};
    transform: rotate(45deg);
  }

  *:last-child {
    bottom: 0;
    transform: rotate(135deg);
  }
`;

const Search = () => {
  const postTags = useSelector((state) => {
    const posts = Object.values(state.post);
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
      <SearchBar {...inputProps} onClick={() => setShowModal(true)}></SearchBar>
      <TagContainer onClick={() => setShowModal(true)}>
        {tags.map((tagName) => (
          <Tag key={tagName} className="tag">
            {tagName}
          </Tag>
        ))}
      </TagContainer>
      {showModal ? (
        <Modal>
          <ModalWrapper>
            <CloseButton onClick={closeModal}>
              <div></div>
              <div></div>
            </CloseButton>
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
              <SearchBar
                {...inputProps}
                onKeyDown={(e) => (e.code == "Enter" ? closeModal() : "")}
              ></SearchBar>
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
        </Modal>
      ) : null}
    </Container>
  );
};

export default Search;
