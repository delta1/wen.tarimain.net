const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
function commit(j, id) {
  const el = document.querySelector(id);
  const rgx = /#(\d+)/;
  const sha = `<a href="${j.html_url}">${j.sha.substring(0, 8)}</a>`;
  const line = j.commit.message.split("\n")[0];
  const pr = '<a href="https://github.com/tari-project/tari/pull/$1">#$1</a>';
  const msg = line.replace(rgx, pr);
  const d = new Date(j.commit.author.date);
  const dt = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  const v = `<span class="pre">${dt} - ${sha} - ${msg}</span>`;
  el.innerHTML = v;
  el.removeAttribute("class");
}
function pull(j, id) {
  const el = document.querySelector(id);
  const d = new Date(j.created_at);
  const dt = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  const v = `<span class="pre">${dt} - <a href="${j.url}">#${j.number}</a> - ${j.title}</span>`;
  el.innerHTML = v;
  el.removeAttribute("class");
}
function url(type) {
  return `https://api.github.com/repos/tari-project/tari/${type}?per_page=1`;
}
(function () {
  window.fetch || alert("No browser fetch?!");
  fetch(`${url("commits")}&path=base_layer/core/src/blocks/genesis_block.rs`)
    .then((r) => r.json())
    .then((j) => commit(j[0], "#genesis"))
    .catch((e) => console.error(e));
  fetch(
    `${url(
      "commits"
    )}&path=base_layer/core/src/consensus/consensus_constants.rs`
  )
    .then((r) => r.json())
    .then((j) => commit(j[0], "#consensus"))
    .catch((e) => console.error(e));
  fetch(url("pulls"))
    .then((r) => r.json())
    .then((j) => pull(j[0], "#latest"))
    .catch((e) => console.error(e));
})();
