/* Select elements */ 
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-filled");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player-slider");
const playerControls = document.querySelector(".player-controls");

/* build functions */
function togglePlayer() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateBtn() {
    const icon = this.paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
    toggle.innerHTML = icon;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    //progressBar.style.flexBasis = `${percent}%`;
    progressBar.style.width = `${percent}%`;
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
/* handle eventsn*/
video.addEventListener("click", togglePlayer);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);
player.addEventListener("mouseover", () => {
    playerControls.style.bottom = "10px";
});
player.addEventListener("mouseleave", () => {
    playerControls.style.bottom = "-100%";
});
toggle.addEventListener("click", togglePlayer);
skipButtons.forEach(btn => {
    btn.addEventListener("click", skip);
});
ranges.forEach(range=> {
    range.addEventListener("change", handleRangeUpdate);
});

let mousedown = false;

ranges.forEach(range=> {
    range.addEventListener("mousemove", handleRangeUpdate);
});
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

