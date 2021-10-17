import { error } from "@pnotify/core";
import axios from "axios";
import weatherTemplate from "../templates/weatherWidget.hbs";
import { setAlertMsg } from "./notif";
import refs from "./refs";

const { weatherContainer, searchForm, showWidgetBtn, card, list } = refs;

export function getWeatherData(city) {
  // https://openweathermap.org/api
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;
  const apiKey = `b17a2dddb01d7481fea6373f92c2e546`;
  let url = baseUrl + `?q=${city}&appid=${apiKey}`;
  if (!city.trim()) setAlertMsg(`Enter the city`);

  axios
    .get(url)
    .then((result) => {
      return result.data;
    })
    .then((data) => {
      insertWidget(weatherTemplate, data);
    })
    .catch((err) => console.log(err));
}

function insertWidget(template, data) {
  let markup = template(data);
  weatherContainer.classList.remove("loading");
  weatherContainer.insertAdjacentHTML("beforeend", markup);
}

export class APIpexel {
  constructor() {
    this.API_KEY = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`;
    this.BASE_URL = `https://api.pexels.com/v1`;
    this.endPoint = `/search`;
    this._page = 1;
    this._query = "";
  }
  get query() {
    return this._query;
  }
  set query(value) {
    return (this._query = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    this._page = 1;
  }

  getFetch() {
    axios.defaults.headers.common.Authorization = this.API_KEY;
    let params = `?query=${this._query}&per_page=5&page=${this._page}`;

    let url = this.BASE_URL + this.endPoint + params;
    console.log("request", this._page, this._query);

    axios
      .get(url)
      .then((result) => result.data.photos)
      .then((data) => {
        let markup = this.createMarkupImages(data);
        list.insertAdjacentHTML("beforeend", markup);
        // делаем скролл вниз не мгновенно, с задержкой
        setTimeout(
          () =>
            window.scrollTo({
              // прокрутку делаем на всю высоту html вниз
              top: document.documentElement.offsetHeight,
              behavior: "smooth",
            }),
          500
        );
      })
      .catch((error) => console.log(error));
  }

  createMarkupImages(data) {
    return data
      .map((elem) => {
        const {
          photographer,
          src: { tiny, original },
        } = elem;
        return `<li>
    <img src="${tiny}" data-src="${original}" alt="${photographer}">
    </li>`;
      })
      .join("");
  }
}
