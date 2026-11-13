(() => {
  const name = document.querySelector(".name-flashlight");
  if (!name) return;

  const moveSpotlight = (event) => {
    if (event.pointerType === "touch") return;
    const bounds = name.getBoundingClientRect();
    name.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    name.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  name.addEventListener("pointerenter", moveSpotlight);
  name.addEventListener("pointermove", moveSpotlight);
  name.addEventListener("pointerleave", () => {
    name.style.removeProperty("--spot-x");
    name.style.removeProperty("--spot-y");
  });
})();
