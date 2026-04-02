(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);

const scrollLinks = document.querySelectorAll(".cs-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    console.log("hi");
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    let position = element.offsetTop;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  });
});

let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy && (copy.innerHTML = `Copyright &copy; 2022-${date}`);

async function callLogApi() {
  try {
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    const payload = {
      uuid: localStorage.getItem("uuid"),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      deviceOrientation: screen.orientation?.type || "unknown",
      service: "67177f42cdd163c8f22ba4c7",

      platform: navigator.platform || "unknown",
      language: navigator.language || "unknown",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      queryParams,
      locationHref: location.href,
    };

    const response = await fetch(
      "https://kss-taby.onrender.com/api/v1/ks-solutions/logs",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const uuid = await response.text();
    localStorage.setItem("uuid", uuid);
  } catch {}
}

callLogApi();

const images = MENU_DATA?.sub_categories
  ?.sort((a, b) => a.order - b.order)
  .filter((c) => !c.hide);

const imagesDom = document.getElementById("bean-and-bar-images");
images.forEach((cat) => {
  const image = document.createElement("img");

  image.src = cat.bgImg;
  image.alt = cat.label;
  image.className = "menu-img";

  imagesDom.appendChild(image);
});
