const startBtn = document.querySelector('.startBtn')
    const restartBtn = document.querySelector('.restartBtn')
    const showAnswer = document.querySelector('.showAnswer')
    const guessAnswer = document.querySelector('.guessAnswer')
    const inputNum = document.querySelector('.inputNum')
    const enterGuess = document.querySelector('.enterGuess')
    const answerBox = document.querySelector('.answerBox')
    const lockBtn = document.querySelectorAll('button:not(.startBtn)')

    let GuessAnswer = []
    let finalAnswer = []
    let wrongArr = []
    let a, b
    let toastBody = document.querySelector('.toast-body')

    window.onload = function () {
      lockBtns()
      startBtn.addEventListener('click', function () {
        getRandomNum()
        unlockBtns()
        startBtn.setAttribute('disabled', 'disabled')
      })
      enterGuess.addEventListener('click',  function () {
        getGuess()
        showResult()
        clearInput()
      })
      restartBtn.addEventListener('click', restart)
      showAnswer.addEventListener('click', function () {
        toastBody.textContent = ''
        showFinalAnswer()
      })
      inputNum.onkeypress = function(event){
        if(event.keyCode == 13){
          getGuess()
          showResult()
          clearInput()
        }
    }
    }
    //隨機陣列 toastBody.textContent
    function getRandomNum() {
      // const randomArray = []
      // const ArrayLength = 15
      // for (let i = 0; i < ArrayLength; i++) {
      //   randomArray.push(Math.floor((Math.random() * 9)))
      // }
      
      // finalAnswer = randomArray.reduce((a, b) => {
      //   if (!a.includes(b) && a.length < 4) a.push(b)
      //   return a
      // }, [])


      while(finalAnswer.length < 4){
        let x = Math.floor((Math.random() * 9))
        if(!finalAnswer.includes(x)){
          finalAnswer.push(x)
        }
      }
      console.log(finalAnswer)
    }
    
    // 取得input數字
    function getGuess() {
      Array.from(inputNum.value).forEach(num => {
        //不是數字的丟到錯誤陣列
        if (!Number.isInteger(Number(num))){
          wrongArr.push(num)
        }else{
          GuessAnswer.push(Number(num))
        }
      })
      // 創一個不重複數字陣列
      let setArr = Array.from(new Set(GuessAnswer))
      if(wrongArr.length > 0 || setArr.length < 4 || GuessAnswer.length > 4){
        alert('請輸入4個不重複整數')
        location.reload()
      }
    }
    //比較數字
    function compareAnswer(GuessAnswer, finalAnswer) {
      let intersect = finalAnswer.filter(x => GuessAnswer.includes(x))
      a = intersect.filter(x => finalAnswer.indexOf(x) == GuessAnswer.indexOf(x)).length
      b = intersect.length - a
    }
    //顯示結果
    function showResult() {
      let result = document.createElement('span')
      let inputAnswer = document.createElement('span')
      let spanBox = document.createElement('p')

      compareAnswer(GuessAnswer, finalAnswer)
      inputAnswer.innerText = inputNum.value
      result.innerText = `${a}A${b}B`
      if (a == 4) {
        result.style.backgroundColor = 'lightGreen'
        enterGuess.setAttribute('disabled', 'disabled')
        alert('恭喜通關，請重新開始')
      } else {
        result.style.backgroundColor = 'Red'
      }
      spanBox.appendChild(result)
      spanBox.appendChild(inputAnswer)
      answerBox.appendChild(spanBox)
      answerBox.scrollTo(0, answerBox.scrollHeight)
    }
    // 清除input.value 
    function clearInput() {
      inputNum.value = ''
      GuessAnswer.length = 0
    }
    // 鎖住按鈕
    function lockBtns() {
      lockBtn.forEach((btn) => {
        btn.setAttribute('disabled', 'disabled')
      })
    }
    // 解鎖按鈕
    function unlockBtns() {
      lockBtn.forEach((btn) => {
        btn.removeAttribute('disabled')
      })
    }
    // 重新開始
    function restart() {
      location.reload()
    }
    //顯示答案
    function showFinalAnswer() {
      finalAnswer.forEach(num => {
        toastBody.textContent += num
      })
    }