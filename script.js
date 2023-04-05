const letters = document.querySelectorAll(".scoreboard-letter")

const ANSWER_LENGTH =5;

const ROUNDS=6;

currentGuess=""

currentRow=0;

let i = 0;





const GET_WORD_URL = "https://words.dev-apis.com/word-of-the-day";

const POST_WORD_URL = "https://words.dev-apis.com/validate-word";

let x;
let aWord;


async function getWord() {

    
  const promise = await fetch(GET_WORD_URL);
  const processedResponse = await promise.json();
  const word = await processedResponse.word
 

  
  return word
}

x= getWord()


x.then((value) => {
 
    aWord = value// "Success"

    console.log(aWord)
  })    


console.log(aWord )




function addLetter(letter){
    currentGuess+=letter.toLowerCase()
    letters[currentRow*5 + i].innerText = letter;
}

function removeLetter(){

    currentGuess=currentGuess.slice(0,currentGuess.length - 1);
    letters[currentRow*5 + i].innerText = "";

}

function isIValid(i){
    if(i>=0 &&  i <=4){
        return true
    }
    else{
        return false
    }
}
  

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

 
   


  document.addEventListener("keydown",async function (event){
    let key = event.key.toUpperCase();
    if(isLetter(key) && isIValid(i) ){
        console.log(i)
        addLetter(key)
        i++
    }
    else if(key==='BACKSPACE' && i !== 0){
        i--;
        removeLetter()
        
    }
    else if(key==='ENTER' && i===5){

        if( await checkWordValidity()){
            if( currentGuess === aWord ){
                alert("You won!")
                
            }
            else{
    
    
                checkWordValidity().then(data => {
                    console.log(data);
                });

                checkLetters();
                currentGuess="";
                currentRow++;
                i=0;


            }

        }

        else{
            alert("invalid word ")
        }
        
    }
    

  })

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



function checkLetters(){

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
  
    
   






