/*=====================================
        ECOHERO DIGITAL
======================================*/

//=========================
// DAPATKAN ELEMEN HTML
//=========================

const startScreen = document.getElementById("startScreen");
const instructionScreen = document.getElementById("instructionScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const playerNameInput = document.getElementById("playerName");
const displayName = document.getElementById("displayName");
const finalName = document.getElementById("finalName");

const startBtn = document.getElementById("startBtn");
const playBtn = document.getElementById("playBtn");

const trashContainer = document.getElementById("trashContainer");

const bins = document.querySelectorAll(".bin");

const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const medal = document.getElementById("medal");


//=========================
// PEMBOLEH UBAH
//=========================

let score = 0;
let answered = 0;


//=========================
// SENARAI SAMPAH
//=========================

const trashItems = [

{
    name:"Surat Khabar",
    emoji:"📰",
    type:"blue"
},

{
    name:"Kotak",
    emoji:"📦",
    type:"blue"
},

{
    name:"Botol Plastik",
    emoji:"🧴",
    type:"blue"
},

{
    name:"Majalah",
    emoji:"📚",
    type:"blue"
},

{
    name:"Tin Minuman",
    emoji:"🥫",
    type:"orange"
},

{
    name:"Tin Makanan",
    emoji:"🥫",
    type:"orange"
},

{
    name:"Aluminium",
    emoji:"🔩",
    type:"orange"
},

{
    name:"Botol Kaca",
    emoji:"🍾",
    type:"brown"
},

{
    name:"Balang Kaca",
    emoji:"🏺",
    type:"brown"
},

{
    name:"Gelas Pecah",
    emoji:"🥛",
    type:"brown"
}

];


//=========================
// BUTANG MULA
//=========================

startBtn.onclick = function(){

    const name = playerNameInput.value.trim();

    if(name===""){

        alert("Sila masukkan nama anda.");

        return;

    }

    displayName.innerHTML=name;

    finalName.innerHTML=name;

    startScreen.classList.add("hidden");

    instructionScreen.classList.remove("hidden");

};


//=========================
// BUTANG PLAY
//=========================

playBtn.onclick=function(){

    instructionScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    createTrash();

};


//=========================
// CIPTA ITEM SAMPAH
//=========================

function createTrash(){

    trashContainer.innerHTML="";

    trashItems.forEach((item,index)=>{

        const div=document.createElement("div");

        div.className="trash";

        div.draggable=true;

        div.dataset.type=item.type;

        div.id="trash"+index;

        div.innerHTML=`

            <span>${item.emoji}</span>

            ${item.name}

        `;

        addDragEvent(div);

        trashContainer.appendChild(div);

    });

}



//=========================
// DRAG EVENT
//=========================

function addDragEvent(item){

    item.addEventListener("dragstart",dragStart);

}



//=========================
// SIMPAN ITEM YANG DIHERET
//=========================

let selectedItem=null;

function dragStart(e){

    selectedItem=e.target;

}



//=========================
// DROP ZONE
//=========================

bins.forEach(bin=>{

    bin.addEventListener("dragover",function(e){

        e.preventDefault();

        bin.classList.add("drag-over");

    });

    bin.addEventListener("dragleave",function(){

        bin.classList.remove("drag-over");

    });

});
