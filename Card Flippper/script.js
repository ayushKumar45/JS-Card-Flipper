// js
// selections
const gameContainer=document.querySelector('.game-container');
createCards(6);
const cards=document.querySelector('.game-container').children;
const clickNoBox=document.querySelector('.click-no');
const cardNums=document.querySelectorAll('.card-no');
let lastCard,currentCard;
let noOfClicks=0;


// events
for( let card of cards){
    card.addEventListener('click',showImage);
}
cardNums.forEach(cardNum=>{
    cardNum.addEventListener('click',restart);
});

// functions
function randomizeImages(){
    // Creating random cardNo to set images randomly
    const noOfCards=cards.length;
    let cardNo=new Set();
    let randomNo;
    while(cardNo.size!=noOfCards){
        randomNo=Math.ceil(Math.random()*10);
        if(randomNo<=noOfCards){
            cardNo.add(randomNo);
        }
    } 
    let counter=1;
    cardNo.forEach(no=>{
       const img =document.querySelector(`#card${no}`).children[0];
       
       img.src=`./Images/${counter}.png`;
       counter++;
       if(counter==noOfCards/2 +1){
           counter=1;
       }
    });
}

function showImage(e){
    noOfClicks++;
    const img=e.target.children[0];
    img.classList.add('revealed');
    currentCard=e.target;
    currentCard.style.pointerEvents='none';
    // checking if cards have same images
    if(noOfClicks%2==0){
        const lastImg=lastCard.children[0];
        const currentImg=currentCard.children[0];
        if(!(lastImg.src==currentImg.src)){
            setTimeout(()=>{
                lastImg.classList.remove('revealed');
                currentImg.classList.remove('revealed');
            },200);
            currentCard.style.pointerEvents='all';
            lastCard.style.pointerEvents='all';
        }
    }
    lastCard=e.target;
    if(noOfClicks>=cards.length){
        checkWinner();
    }

}

function checkWinner(){
    let noOfRevealedImages=0;
    for(let card of cards){
        const img=card.children[0];
        if(img.classList.contains('revealed')){
                noOfRevealedImages++;
        }
    }
    if(noOfRevealedImages==cards.length){
        setTimeout(win,200);
    }

}

function win(){
    clickNoBox.innerText=`You Won In ${noOfClicks} Clicks`;
    gameContainer.style.display='none';
    won.style.display='flex'; 
}
function restart(e){
    gameContainer.style.display='grid';
    won.style.display='none';
    noOfClicks=0;
    gameContainer.innerHTML='';
    for(let card of cards){
        const img=card.children[0];
        img.classList.remove('revealed');
        card.style.pointerEvents='all';
    }
    createCards(e.target.innerText);
    randomizeImages();
    for( let card of cards){
        card.addEventListener('click',showImage);
    }
}

function createCards(numOfCards){
    for(let i=1;i<=numOfCards;i++){
        const card=document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id',`card${i}`);
        const img=document.createElement('img');
        card.appendChild(img);
        gameContainer.appendChild(card);
    }
}


// on load
randomizeImages();





