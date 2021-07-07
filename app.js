const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#save-tab");
const inputContainer = document.querySelector(".input-container");
const leadsList = document.querySelector(".leads-list");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));
let leads = leadsFromLocalStorage != null ? leadsFromLocalStorage : [];

const render = (leads) => {
  leadsList.innerHTML = "";
  leads.forEach((lead) => {
    createElement(lead);
  });
};

const createElement = (lead) => {
  const listElement = document.createElement("li");
  const aTag = document.createElement("a");
  aTag.textContent = lead;
  if (lead.startsWith("http")) {
    aTag.setAttribute("href", `${lead}`);
  } else {
    aTag.setAttribute("href", `//${lead}`);
  }
  aTag.setAttribute("target", "__blank");
  let child = leadsList.appendChild(listElement);
  child.appendChild(aTag);
};

const updateLeads = (lead) => {
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));
};

const save = () => {
  let lead = inputContainer.value;
  updateLeads(lead);
  render(leads);
  inputContainer.value = "";
};

inputBtn.addEventListener("click", save);

deleteBtn.addEventListener("click", () => {
  localStorage.clear("leads");
  leads = [];
  render(leads);
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let lead = tabs[0].url;
    updateLeads(lead);
    render(leads);
  });
});

render(leads);

