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
    isLoading=true;

    const promise = await fetch(GET_WORD_URL);
    const processedResponse = await promise.json();
    const aWord = await processedResponse.word;
    const wordParts = aWord.split("");
    let done = false;
    setLoading(false)
    isLoading=false;
    

    document.addEventListener("keydown",async function (event){

        if(done || isLoading){
            //do nothing
            return;
        }

        let key = event.key.toUpperCase();
    
        if(isLetter(key) ){
            addLetter(key)
            i++
        }
        else if(key==='BACKSPACE' && i !== 0){
            i--;
            removeLetter()
            
        }
        else if(key==='ENTER'){

            commit();
    
        
            
        }
        
      })

      async function commit(){
        if(currentGuess.length !== ANSWER_LENGTH){
            return
        }
        isLoading=true;
        setLoading(true)
        const res = await fetch(POST_WORD_URL,{
            method:"POST",
            body:JSON.stringify({word:currentGuess})
        });
        const resObj = await res.json();
        const validWord= resObj.validWord

        isLoading= false

        setLoading(false)

        if(!validWord){
            markInvalidWord();
            return
        }
       
        const gueessParts = currentGuess.split("");
        console.log(gueessParts)

        let map = makeMap(wordParts)

        console.log(map)
        
        for (let i = 0; i < ANSWER_LENGTH; i++) {
            // if element correct
            if(gueessParts[i]===wordParts[i]){
                letters[currentRow*ANSWER_LENGTH+i].classList.add('correct');
                map[gueessParts[i]]--;
            }
            
        
        }
        
           
            
        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if(gueessParts[i]===wordParts[i]){
                
            }else if (wordParts.includes(gueessParts[i]) && map[gueessParts[i]] >0)
                {
                    letters[currentRow*ANSWER_LENGTH+i].classList.add('close');
                    map[gueessParts[i]]--;
                } else{
                    letters[currentRow*ANSWER_LENGTH+i].classList.add('wrong');
                }
                
            
        }


        
        currentRow++;
        


        if(currentGuess===aWord){
            alert("Yoy won!")
            document.querySelector(".brand").classList.add("winner")
            done =true;
            return
        } else if( currentRow === ROUNDS ){
            alert(`You lost the word was ${aWord}`);
            done = true;
            return;

            }
        
            currentGuess=''
        }


    

}


function makeMap(array){
    let obj={};
    for (let i = 0; i < array.length; i++) {
        let letter = array[i]
       if(obj[letter]){
        obj[letter]++
       }else{
        obj[letter]=1;
       }
       console.log(obj[letter])
        
    }
    return obj
}

init();


function markInvalidWord(){
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        letters[currentRow*ANSWER_LENGTH+i].classList.add('invalid');


        setTimeout(function(){
            letters[currentRow*ANSWER_LENGTH+i].classList.remove('invalid');
        }, 500)
    }

    
    return;
}
