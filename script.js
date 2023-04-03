const letters = document.querySelectorAll(".scoreboard-letter")

const ANSWER_LENGTH =5;

const ROUNDS=6;

currentGuess=""

currentRow=0;
let i = 0;


function addLetter(letter){
  
    letters[i].innerText = letter;
}

function removeLetter(){
    letters[i].innerText = "";

}

function isIValid(i){
    if(i>=0 &&  i <=30){
        return true
    }
    else{
        return false
    }
}
  

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

 
   


  document.addEventListener("keydown",function (event){
    let key = event.key.toUpperCase();
    if(isLetter(key) && isIValid(i) ){
        addLetter(key)
        i++
    }
    else if(key==='BACKSPACE' && i !== 0){
        i--;
        removeLetter()
        
    }
    else if(key==='ENTER' && isIValid(i) && i%5===0){
        
    }
    

  })



