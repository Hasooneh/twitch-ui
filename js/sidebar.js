const followedChannelsList = document.querySelector(".followed-channels-list");
const showMoreBtn = document.querySelector(".show-more");
const showLessBtn = document.querySelector(".show-less");
let followedCollapseBtn = document.querySelector(".collapse-btn");
const followedChannelsBtnContainer = document.querySelector(".follower-ion-container");
let hiddenFollowedChnArr;
let totalHiddenChannels;
let hiddenFollowedChannels = 0;
let shownFollowedChannels = 0;

function arrangeFollowedChannels() {
  const onlineChannels = document.querySelectorAll(".followed-channels-list .online");

  let onlineChannelsSorted = Array.from(onlineChannels).sort(function(a,b) {
    return b.dataset.viewercount - a.dataset.viewercount;
  })

  onlineChannelsSorted.forEach((cur,index) => cur.style.order = index);
}
function formatNumber() {
  let number = Math.floor(Math.random() * 100000);
  let formatedNumber;
  if (number <= 999) {
    formatedNumber = number;
  } else if (number > 1000) {
    formatedNumber = number/1000;
    formatedNumber = Math.round(formatedNumber * 10)/10;
    formatedNumber = `${formatedNumber}k`
  }
  return [formatedNumber,number];
}
(function generateFollowerList() {
  let rug = require("random-username-generator");
  rug.setSeperator("");

  let totalFollowedChannels = Math.floor(Math.random() * 30 + 8);
  let numOnlineChannels = Math.floor(Math.random() * 4 + 6);
  let followedChannelsArr = [];

  let categories = ["arts","league of legends", "vainglory", "call of duty", "Ark", "Heroes of Newerth", "Fall Guys", "Among us", "Just Chatting", "PUBG MOBILE", "Fortnite", "Valorant"];

  for(let i = 0; i <= totalFollowedChannels; i++) {
    let userName = rug.generate();

    let html;
    let [viewerCountFormatted,viewerCount] = formatNumber();
    if(i <= numOnlineChannels) {
      html = `<li class="online" data-viewercount="${viewerCount}">
        <div class="avatar">
          <ion-icon class="person-icon" name="person-outline"></ion-icon>
        </div>
          <div class="wrapper collapsable">
          <div class="container streamer-info">
            <div>
              <p class="streamer-name">${userName}</p>
              <span class="category">${categories[Math.floor(Math.random() * categories.length)]}</span>
            </div>
          </div>

          <div class="container container-viewership">
            <div class="status">
              <div class="red-dot"></div>
              <span class="viewer-count">${viewerCountFormatted}</span>
            </div>
          </div>
          </div>
      </li>`
    } else if (i < 11) {
      html = `<li class="offline">
        <div class="avatar">
          <ion-icon class="person-icon" name="person-outline"></ion-icon>
      </div>
        <div class="wrapper collapsable">
        <div class="container streamer-info">
          <div>
            <p class="streamer-name">${userName}</p>
            <span class="invisible-game"></span>
          </div>
        </div>
        <div class="container container-viewership">
          <div class="status">
            <span>Offline</span>
          </div>
        </div>
        </div>
    </li>`
  } else {
    html = `<li class="offline hide">
      <div class="avatar">
        <ion-icon class="person-icon" name="person-outline"></ion-icon>
    </div>
      <div class="wrapper collapsable">
      <div class="container streamer-info">
        <div>
          <p class="streamer-name">${userName}</p>
          <span class="invisible-game"></span>
        </div>
      </div>
      <div class="container container-viewership">
        <div class="status">
          <span>Offline</span>
        </div>
      </div>
      </div>
  </li>`
    }
    followedChannelsArr.push(html);
  }
  function displayShowMoreButton() {
    if(totalFollowedChannels > 11) {
      showMoreBtn.classList.remove("invis");
    }
  }
  followedChannelsList.innerHTML = followedChannelsArr.join("");
  arrangeFollowedChannels();
  hiddenFollowedChnArr = Array.from(document.querySelectorAll("li.offline.hide"));
  totalHiddenChannels = hiddenFollowedChnArr.length;
  hiddenFollowedChannels = totalHiddenChannels;
  displayShowMoreButton();
})();

function updateFollowedChannelsData(type,amount) {
  if(type === "inc") {
    hiddenFollowedChannels-= amount;
    shownFollowedChannels+= amount;
  } else {
    hiddenFollowedChannels+= amount;
    shownFollowedChannels-= amount;
  }
}

function showMoreChannels() {
  if (hiddenFollowedChannels > 3) {
    for(let i = shownFollowedChannels; i < shownFollowedChannels + 3; i++) {
      hiddenFollowedChnArr[i].classList.remove("hide");
    }
    updateFollowedChannelsData("inc",3);
    showLessBtn.classList.remove("invis");
  } else {
    for(let i = shownFollowedChannels; i < totalHiddenChannels; i++) {
      hiddenFollowedChnArr[i].classList.remove("hide");
    }
    updateFollowedChannelsData("inc",totalHiddenChannels - shownFollowedChannels);
    showMoreBtn.classList.add("invis");
    showLessBtn.classList.remove("invis");
  }
}
function showLessChannels() {
  if(shownFollowedChannels > 3) {
    for (let i = shownFollowedChannels - 1 ; i > shownFollowedChannels -4; i--) {
      hiddenFollowedChnArr[i].classList.add("hide");
    }
      updateFollowedChannelsData("dec",3);
      showMoreBtn.classList.remove("invis");
  } else {
    for (let i = shownFollowedChannels; i > 0; i--) {
      hiddenFollowedChnArr[i].classList.add("hide");
    }
    updateFollowedChannelsData("dec", shownFollowedChannels - 0);
    showLessBtn.classList.add("invis");
    showMoreBtn.classList.remove("invis");
  }
}
function collapseSideBar() {
  document.querySelectorAll(".collapsable").forEach(cur => cur.classList.toggle("hide"));
  document.querySelector(".channel-type").classList.toggle("collapsed");
  if (followedCollapseBtn.getAttribute("name") == "chevron-back-outline") {
      followedCollapseBtn.setAttribute("name","chevron-forward-outline");
  } else {
      followedCollapseBtn.setAttribute("name","chevron-back-outline");
  }
}
showMoreBtn.addEventListener("click",showMoreChannels);
showLessBtn.addEventListener("click",showLessChannels);
followedCollapseBtn.addEventListener("click", collapseSideBar);
