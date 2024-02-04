//step 1: get DOM
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 2500;
let timeAutoNext = 5000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};
let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}

// Lazy load
document.querySelectorAll(".lazy-load").forEach((img) => lazyLoad(img).load());

document.querySelectorAll("img[data-src]").forEach((img) => {
  var load = lazyLoad(img).load;
  document.addEventListener("DOMContentLoaded", load);
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  var load = lazyLoad(img).load;
  checkViewport();
  window.addEventListener("scroll", checkViewport);
  window.addEventListener("resize", checkViewport);
  window.addEventListener("orientationchange", checkViewport);
  function checkViewport() {
    var rect = img.getBoundingClientRect();
    var isVisible =
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top + rect.height >= 0 &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      rect.left + rect.width >= 0;
    if (isVisible) {
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("orientationchange", checkViewport);
      load();
    }
  }
});
