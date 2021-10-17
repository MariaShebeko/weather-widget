import refs from "./refs";
import { getWeatherData } from "./services";

const { weatherContainer, searchForm, showWidgetBtn, card } = refs;

showWidgetBtn.addEventListener("click", () => {
  card.classList.toggle("isHide");
});

searchForm.addEventListener("submit", getWeather);

function getWeather(e) {
  e.preventDefault();
  let city = e.target.elements.searchBar.value;
  getWeatherData(city);
  searchForm.reset();
}

if (!card.classList.contains("isHide")) {
  searchForm.removeEventListener("submit", getWeather);
}
