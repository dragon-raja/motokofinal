import { mysite } from "../../declarations/mysite";

async function post() {
  let post_button = document.getElementById("post");
  let error = document.getElementById("error");
  error.innerText = "";
  post_button.disabled = true;
  let textarea = document.getElementById("message");
  let otp = document.getElementById("otp1").value;
  let text = textarea.value;
  try {
    await mysite.post(otp, text);
    textarea.value = "";
  } catch (e) {
    console.log(e);
    error.innerText = "Post Failed!";
  }
  post_button.disabled = false;
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(Number(UNIX_timestamp / 1000000n));
  const humanDateFormat = a.toLocaleString();
  return humanDateFormat;
}

async function follow() {
  let follow_button = document.getElementById("tofollow");
  let error = document.getElementById("error1");
  error.innerText = "";
  follow_button.disabled = true;
  let textarea = document.getElementById("canister");
  let otp = document.getElementById("otp2").value;
  let text = textarea.value;
  try {
    await mysite.follow(otp, text);
    textarea.value = "";
  } catch (e) {
    console.log(e);
    error.innerText = "Follow Failed!";
  }
  post_button.disabled = false;
}

var num_follows = 0;
async function load_follows() {
  let follows_section = document.getElementById("follow");
  let follows = await mysite.follows();
  if (num_follows == follows.length) return;
  follows_section.replaceChildren([]);
  num_follows = follows.length;
  for (var i = 0; i < follows.length; i++) {
    let follow = document.createElement("f");
    follow.innerText = follows[i].name + " " + follows[i].id + "\n"
    follows_section.appendChild(follow)
  }
}

var timeline_posts = 0;
async function load_timeline() {
  let timeline_section = document.getElementById("timeline");
  let timelines = await mysite.timeline();
  if (timeline_posts == timelines.length) return;
  timeline_section.replaceChildren([]);
  timeline_posts = timelines.length;
  for (var i = 0; i < timelines.length; i++) {
    let timeline = document.createElement("t");
    timeline.innerText = timelines[i].text + " " + timelines[i].author + " " + timeConverter(timelines[i].time)
    timeline_section.appendChild(timeline)
  }
}

var num_posts = 0;
async function load_posts() {
  let posts_section = document.getElementById("posts");
  let posts = await mysite.posts();
  if (num_posts == posts.length) return;
  posts_section.replaceChildren([]);
  num_posts = posts.length;
  for (var i = 0; i < posts.length; i++) {
    let post = document.createElement("p");
    post.innerText = posts[i].text + " " + posts[i].author + " " + timeConverter(posts[i].time)
    posts_section.appendChild(post)
  }
}

function load() {
  let post_button = document.getElementById("post");
  post_button.onclick = post;
  let follow_button = document.getElementById("tofollow");
  follow_button.onclick = follow;
  load_follows();
  setInterval(load_follows, 3000)
  load_timeline();
  setInterval(load_timeline, 3000)
  load_posts();
  setInterval(load_posts, 3000)
}

window.onload = load