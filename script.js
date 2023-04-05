const letters = document.querySelectorAll(".scoreboard-letter")

const loadingDiv = document.querySelector(".info-bar");

const ANSWER_LENGTH =5;

const ROUNDS=6;

currentGuess=""

currentRow=0;

let i = 0;






const GET_WORD_URL = "https://words.dev-apis.com/word-of-the-day";

const POST_WORD_URL = "https://words.dev-apis.com/validate-word";





function addLetter(letter){

    if(currentGuess.length< ANSWER_LENGTH){
        currentGuess+=letter.toLowerCase()
        


    }else{
        
        currentGuess = currentGuess.substring(0,currentGuess.length -1) + letter.toLowerCase()
        
    }
    letters[ANSWER_LENGTH*currentRow + currentGuess.length-1].innerText=letter;

    
    
}

function setLoading(isLoading){
    loadingDiv.classList.toggle('hidden',!isLoading)
}

async function commit(){
    if(currentGuess.length !== ANSWER_LENGTH){
        return
    }
    const gueessParts = currentGuess.sp
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
    }
    currentRow++;
    currentGuess=''
}


function removeLetter(){

    currentGuess = currentGuess.substring(0,currentGuess.length -1)
    letters[ANSWER_LENGTH*currentRow + currentGuess.length].innerText = "";

}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }



function isIValid(i){
    if(i>=0 &&  i <=4){
        return true
    }
    else{
        return false
    }
}





async function checkWordValidity(){
   

    let data = {'word': currentGuess}


    let res = await fetch(POST_WORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        let ret = await res.json();
        console.log(ret.validWord )

        return ret.validWord
    } else {
        return `HTTP error: ${res.status}`;
    }
}



function checkLetters(aWord){

    for (let i = 0; i < 5; i++) {
    
        if (!aWord.includes(currentGuess[i])){

            letters[currentRow*5 + i].style.backgroundColor = '#888';
        }
        else if ( aWord[i] === currentGuess[i]){

            letters[currentRow*5 + i].style.backgroundColor = 'darkgreen';
        }

        else  {

            letters[currentRow*5 + i].style.backgroundColor = 'goldenrod';
        }
             
    }

}
  



async function init(){

    const promise = await fetch(GET_WORD_URL);
    const processedResponse = await promise.json();
    const aWord = await processedResponse.word;
    setLoading(false)

    document.addEventListener("keydown",async function (event){

        let key = event.key.toUpperCase();
    
        if(isLetter(key) ){
            addLetter(key)
            i++
        }
        else if(key==='BACKSPACE' && i !== 0){
            i--;
            removeLetter()
            
        }
        else if(key==='ENTER' && i===ANSWER_LENGTH){

            commit();
    
            if( await checkWordValidity()){
                if( currentGuess === aWord ){
                    checkLetters(aWord)
                    alert("You won!")
                    
                }
                else{
                    checkLetters(aWord);
                    

                }
    
            }
    
            else{
                alert("invalid word ")
            }
            
        }
        
      })

}

init();

















 
   


  



  


  
    
   






