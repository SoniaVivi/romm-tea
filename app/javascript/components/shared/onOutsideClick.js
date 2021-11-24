const onOutsideClick = (toggle, event = null, target = null) => {
  let container;
  if (target == "parent") {
    container = event.target.parentNode;
  } else if (!target) {
    container = event.target;
  } else {
    container = target;
  }

  const closeMenu = (mouseUpEvent) => {
    let clickedElement = mouseUpEvent.target;

    if (!container.contains(clickedElement) || clickedElement == container) {
      toggle();
      document.removeEventListener("mouseup", closeMenu);
    }
  };
  document.addEventListener("mouseup", closeMenu);
};

export default onOutsideClick;
