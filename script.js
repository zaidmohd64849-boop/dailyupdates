import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const jobsList = document.getElementById("jobsList");
const admitList = document.getElementById("admitList");
const resultList = document.getElementById("resultList");
const moreinformationList = document.getElementById("moreinformationList");

async function fetchPosts(){
try{
const querySnapshot = await getDocs(collection(db,"posts"));

querySnapshot.forEach((doc)=>{
const post = doc.data();
const id = doc.id;

let li = document.createElement("li");
li.innerHTML = `<a href="post.html?id=${id}">${post.title}</a>`;

switch(post.category){
case "jobs": jobsList.appendChild(li); break;
case "admit": admitList.appendChild(li); break;
case "result": resultList.appendChild(li); break;
case "more information": moreinformationList.appendChild(li); break;
}
});

}catch(e){
console.log(e);
}
}

fetchPosts();

window.searchPost = function(){
let input = document.getElementById("searchInput").value.toLowerCase();
let lists = document.querySelectorAll("ul li");

lists.forEach((item)=>{
let text = item.innerText.toLowerCase();
item.style.display = text.includes(input) ? "block" : "none";
});
}
