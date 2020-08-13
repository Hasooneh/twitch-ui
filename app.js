const dropdownTogglers = document.querySelectorAll(".dropdown-toggler");
const dropdowns = document.querySelectorAll(".dropdown");
const notificationsDeleteiconWrapper = document.querySelectorAll(".delete-icon-wrapper");
const notifications = document.querySelectorAll(".notification-list li");
const whispers = document.querySelectorAll(".whispers-list li");
const onlineStatusVisual = document.querySelectorAll(".online-status");
const onlineBtn = document.querySelector(".white-circle-online");
const OnlineStatusWord = document.querySelector(".online-offline");
const shareActivitySection = document.querySelector(".share-activity");
const shareActivityBtn = shareActivitySection.querySelector(".white-circle");
const navLeftLinks = document.querySelectorAll(".nav-left-link-wrapper");
const darkThemeBtn = document.querySelector(".dark-theme-btn");
const links = document.querySelectorAll("a");


(function calcFlex() {
  navLeftLinks.forEach(cur => cur.style.flex = 1 + cur.offsetWidth/100);
})();
function closeOtherDropdowns(dropdown) {
  dropdownTogglers.forEach(cur => {
    cur === dropdown ? "": cur.nextElementSibling.classList.remove("show");
})}

function toggleDropdown() {
  closeOtherDropdowns(this);
  const dropdown = this.nextElementSibling;
  dropdown.classList.toggle("show");

  x = setTimeout(() => {
    let dropdownRect = dropdown.getBoundingClientRect();
    document.addEventListener("click", function closeDropdownIfClickedOutside(e) {

          if((e.pageX <= dropdownRect.x || dropdownRect.right <= e.pageX)||(e.pageY <= dropdownRect.y || dropdownRect.bottom <= e.pageY)) {
            dropdown.classList.remove("show");
            document.removeEventListener("click",closeDropdownIfClickedOutside);
            clearTimeout(x);
          }
    })
  },0)
}
function closeDropdown(e) {
  if(e.target.classList.contains("close-icon")) {
    this.classList.remove("show");
  }
}
function changeNotifColor() {
    this.parentElement.parentElement.classList.add("hover1");
}
function returnNotifColor() {
  this.parentElement.parentElement.classList.remove("hover1");
}
function deleteNotif(e) {
  if(e.target.classList.contains("delete-icon")) {
    this.remove();
  }
}
function preventDefault(e) {
  e.preventDefault();
}
function moveCircle(circle) {
    circle.classList.toggle("move");
    circle.parentElement.classList.toggle("online");
}
function changeOnlinePresence() {
  onlineStatusVisual.forEach(cur => cur.classList.toggle("online"));
  shareActivitySection.classList.toggle("hidden");
  if(OnlineStatusWord.innerText === "Offline") {
    OnlineStatusWord.innerText = "Online"
  } else {
    OnlineStatusWord.innerText = "Offline"
  }
}
function updateOnlineStatus() {
  moveCircle(this);
  if(this.classList.contains("white-circle-online")) {
    changeOnlinePresence()
  }
}
function changeTheme() {
  moveCircle(this);
  document.querySelector(".theme").classList.toggle("on");
}

dropdownTogglers.forEach(toggler => toggler.addEventListener("click",toggleDropdown));
dropdowns.forEach(dropdown => dropdown.addEventListener("click", closeDropdown));

notifications.forEach(notification => notification.addEventListener("click",deleteNotif));
notificationsDeleteiconWrapper.forEach(cur => cur.addEventListener("mouseover",changeNotifColor));
notificationsDeleteiconWrapper.forEach(cur => cur.addEventListener("mouseout",returnNotifColor));

whispers.forEach(whisper => whisper.addEventListener("click",deleteNotif));

links.forEach(link => {
  link.addEventListener("click",preventDefault);
})

onlineBtn.addEventListener("click",updateOnlineStatus);
shareActivityBtn.addEventListener("click",updateOnlineStatus);
darkThemeBtn.addEventListener("click",changeTheme);
