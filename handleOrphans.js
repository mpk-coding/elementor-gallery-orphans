const handleOrphans = () => {
  const gridContainer = document.querySelector(".elementor-gallery__container");
  const gridCells = gridContainer.querySelectorAll(".e-gallery-item");
  //
  const getColumns = () => {
    const gridContainerStyle = window.getComputedStyle(gridContainer);
    return parseInt(gridContainerStyle.getPropertyValue("--columns"));
  };
  //
  const adjustOrphans = () => {
    const orphan = gridCells[gridCells.length - 1];
    const modulo = gridCells.length % getColumns();
    const emptyCells = modulo === 0 ? 0 : getColumns() - modulo;
    //
    orphan.style["grid-column"] =
      emptyCells !== 0 ? `span ${emptyCells + 1}` : "auto";
    //
  };
  //
  let timer;
  const debounce = function (func, delay) {
    //
    clearTimeout(timer);
    timer = setTimeout(func, delay);
    //
  };
  //
  const onResize = new ResizeObserver((entries) => {
    debounce(() => {
      for (let entry of entries) {
        adjustOrphans();
        //
      }
      //
    }, 100);
    //
  });
  //
  onResize.observe(gridContainer);
  //
};
//
window.onload = (event) => {
  handleOrphans();
};
