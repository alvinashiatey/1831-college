function sortFunction() {
  const dateBtn = document.getElementById("date-btn");
  const titleBtn = document.getElementById("title-btn");
  const archiveContent = document.querySelectorAll(".grid-module");
  const archiveContainer = document.querySelector(".broadsheet-grid");
  const archiveData = [...archiveContent];
  archiveData.sort((a, b) => {
    let aElement = a.firstElementChild.lastElementChild.innerText.split(",");
    let bElement = b.firstElementChild.lastElementChild.innerText.split(",");
    return (
      parseInt(aElement[aElement.length - 1]) -
      parseInt(bElement[bElement.length - 1])
    );
  });
  dateBtn.addEventListener("click", () => {
    archiveContainer.innerHTML = "";
    archiveData.forEach((archive) => {
      archiveContainer.insertAdjacentElement("beforeend", archive);
    });
  });
}

export { sortFunction };
