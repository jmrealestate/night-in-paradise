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
  const now = new Date().getTime();
  const lastCall = localStorage.getItem("lastCall");
  if (lastCall) {
    const lastCallNb = Number(lastCall);
    if (now - lastCallNb < 1800000) {
      return;
    }
  }

  try {
    await fetch(
      "https://main-server-u49f.onrender.com/api/v1/ks-solutions/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendLogData()),
      }
    );

    localStorage.setItem("lastCall", now.toString());
  } catch (error) {}
}

// Function to send log data to the server
function sendLogData() {
  let uuid = localStorage.getItem("uuid");

  if (!uuid) {
    uuid = generateUUID();
    localStorage.setItem("uuid", uuid);
  }

  const urlParams = new URLSearchParams(window.location.search);
  return {
    uuid,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    deviceOrientation: screen.orientation.type,
    utmParameters: {
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
    },
    service: "external website",
    brand: "Night In Paradise",
  };
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

callLogApi();
