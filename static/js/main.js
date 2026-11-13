// Tabs for the simulation galleries.
document.querySelectorAll(".tab").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (b) { b.classList.remove("active"); });
    document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
    btn.classList.add("active");
    var panel = document.getElementById("tab-" + btn.dataset.tab);
    if (panel) panel.classList.add("active");
  });
});

// Play videos only while they are visible; load them lazily the first time.
var videos = document.querySelectorAll("video");
if ("IntersectionObserver" in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        if (v.preload === "none") { v.preload = "auto"; }
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.25 });
  videos.forEach(function (v) { io.observe(v); });
} else {
  videos.forEach(function (v) { v.preload = "auto"; v.autoplay = true; });
}
