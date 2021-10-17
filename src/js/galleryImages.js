import { APIpexel } from "./services";
import refs from "./refs";
const { list, form, loadMoreBtn } = refs;

const x = new APIpexel();

form.addEventListener("submit", getImagesList);

function getImagesList(e) {
  e.preventDefault();
  list.innerHTML = "";
  x.resetPage();
  x.query = e.target.elements.searchImages.value;
  x.getFetch();
  form.reset();
}

loadMoreBtn.addEventListener("click", () => {
  x.page = 1;
  x.getFetch();
});
