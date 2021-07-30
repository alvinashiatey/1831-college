//select all images from the image__container class from the DOM
const imageSlide = () => {
  const images = document.querySelectorAll(".image__container img");
  const broadsheetModules = document.querySelectorAll(".grid-module");
  images.forEach((image) => {
    image.classList.add("hide");
  });

  broadsheetModules.forEach((module) => {
    module.addEventListener("mouseover", () => {
      images.forEach((image) => {
        const regex = /(")/g;
        const imageAlt = image.alt.toLowerCase().trim();
        const moduleText = module.firstElementChild.firstElementChild.innerText
          .toLowerCase()
          .replace(regex, "'");
        if (imageAlt === moduleText) {
          image.classList.toggle("hide");
        }
      });
    });
    module.addEventListener("mouseout", () => {
      images.forEach((image) => {
        image.classList.add("hide");
      });
    });
  });
};

export { imageSlide };
