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
/*=====================================
        BAHAGIAN 3B
    DROP + SKOR + KEPUTUSAN
======================================*/


//=========================
// DROP KE DALAM TONG
//=========================

bins.forEach(bin=>{

    bin.addEventListener("drop",function(e){

        e.preventDefault();

        bin.classList.remove("drag-over");

        if(selectedItem==null){

            return;

        }

        const correctType=selectedItem.dataset.type;

        const selectedBin=bin.dataset.type;



        //-----------------------
        // JAWAPAN BETUL
        //-----------------------

        if(correctType===selectedBin){

            score+=10;

            scoreText.innerHTML=score;

            selectedItem.style.background="#b9f6ca";

            selectedItem.style.border="3px solid green";

            selectedItem.style.opacity=".3";

            selectedItem.draggable=false;

            selectedItem.style.pointerEvents="none";

        }

        //-----------------------
        // JAWAPAN SALAH
        //-----------------------

        else{

            selectedItem.style.background="#ffcdd2";

            selectedItem.style.border="3px solid red";

            setTimeout(()=>{

                selectedItem.style.background="white";

                selectedItem.style.border="none";

            },700);

        }



        //-----------------------
        // SEMAK BILANGAN
        //-----------------------

        answered++;

        selectedItem=null;



        if(answered===trashItems.length){

            setTimeout(showResult,600);

        }

    });

});



//=========================
// PAPAR KEPUTUSAN
//=========================

function showResult(){

    gameScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScore.innerHTML=score+"/100";



    //-------------------------
    // PENILAIAN
    //-------------------------

    if(score>=90){

        medal.innerHTML="🥇 EcoHero Emas";

    }

    else if(score>=70){

        medal.innerHTML="🥈 EcoHero Perak";

    }

    else if(score>=50){

        medal.innerHTML="🥉 EcoHero Gangsa";

    }

    else{

        medal.innerHTML="🌱 Teruskan Berlatih";

    }

}



//=========================
// SIJIL
//=========================

const certificateBtn=document.getElementById("certificateBtn");

certificateBtn.onclick=function(){

    localStorage.setItem("ecoheroName",finalName.innerHTML);

    localStorage.setItem("ecoheroScore",score);

    window.open("certificate.html","_blank");

}



//=========================
// FUNGSI RESET
//=========================

function resetGame(){

    score=0;

    answered=0;

    scoreText.innerHTML=0;

}



//=========================
// ANIMASI TAMBAHAN
//=========================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseover",()=>{

        btn.style.boxShadow="0 10px 20px rgba(0,0,0,.25)";

    });



    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="none";

    });

});



//=========================
// UCAPAN SELAMAT DATANG
//=========================

console.log("EcoHero Digital Loaded Successfully.");



//=========================
// VERSI
//=========================

console.log("EcoHero Digital v1.0");
