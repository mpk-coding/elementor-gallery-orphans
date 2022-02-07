const handleOrphans = () => {
  const root = document.querySelector(".elementor-gallery__container");
  const galleryItems = root.querySelectorAll(".e-gallery-item");
  //
  const getColumns = () => {
    const rootStyle = window.getComputedStyle(root);
    return parseInt(rootStyle.getPropertyValue("--columns"));
  };

  const adjustOrphans = () => {
    const orphan = galleryItems[galleryItems.length - 1];
    const modulo = galleryItems.length % getColumns();
    const emptyCells = getColumns() - modulo;
    //
    orphan.style["grid-column"] =
      modulo <= 1 && emptyCells !== 0
        ? `span ${getColumns()}`
        : `span ${getColumns() - emptyCells}`;
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

  const onResize = new ResizeObserver((entries) => {
    debounce(() => {
      for (let entry of entries) {
        adjustOrphans();
      }
    }, 100);
  });
  //
  onResize.observe(root);
  //
};