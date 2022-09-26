// pilihan dari komputer
function getCompChoice() {
    const comp = Math.random();
    if (comp < 1 / 3) return "rock";
    if (comp >= 1 / 3 && comp < 2 / 3) return "paper";
    return "scissor";
  }
  
  // permainan
  let result = null;
  function getResult(comp, player) {
    if (player == comp) return (result = "DRAW");
    if (player == "rock")
      return comp == "scissor" ? (result = "PLAYER 1 WIN") : (result = "COM WIN");
    if (player == "paper")
      return comp == "rock" ? (result = "PLAYER 1 WIN") : (result = "COM WIN");
    if (player == "scissor")
      return comp == "paper" ? (result = "PLAYER 1 WIN") : (result = "COM WIN");
  }
  
  /* Game start */
  /* DOM Selector */
  const versus = document.querySelector(".versus h1");
  const resultClass = document.querySelector(".versus div div");
  const textResult = document.querySelector(".versus h5");
  const compBox = document.querySelectorAll(".greyBox.compImage");
  const playerBox = document.querySelectorAll(".greyBox.playerImage");
    
    function wait() {
    const start = new Date().getTime();
    let i = 0;
  
    setInterval(function () {
      if (new Date().getTime() - start >= 1000) {
        clearInterval;
        return;
      }
      compBox[i++].style.backgroundColor = "#c4c4c4";
      if (i == compBox.length) i = 0;
      resultClass.classList.remove("result");
      versus.style.color = "rgb(255,0,0)";
    }, 50);
  
    setTimeout(function () {
      setInterval(function () {
        if (new Date().getTime() - start >= 1200) {
          clearInterval;
          return;
        }
  
        /* Handling agar Menyamarkan greyBox dengan bgColor supaya tidak semuanya memiliki greyBox berwarna abu */
        compBox[i++].style.backgroundColor = "#b36c07";
        if (i == compBox.length) i = 0;
      }, 50);
    }, 50);
  }
  
  /* Menangkap pilihan pemain */
  const player = document.querySelectorAll(".contentImage .player");
  player.forEach(function (choice) {
    choice.addEventListener("click", function () {
      for (let i = 0; i < playerBox.length; i++) {
        playerBox[i].style.backgroundColor = "#b36c07";
      }
  
      /* Eventlistener hanya dikerjakan apabila result masih dalam kondisi null */
      if (result === null) {
        const compChoice = getCompChoice();
        const playerChoice = choice.className.substr(7, 7);
        result = getResult(compChoice, playerChoice);
  
        /* Berikan greyBox pada pilihan pemain */
        if (playerChoice == "rock") {
          playerBox[0].style.backgroundColor = "#dbd9d5";
        } else if (playerChoice == "paper") {
          playerBox[1].style.backgroundColor = "#dbd9d5";
        } else {
          playerBox[2].style.backgroundColor = "#dbd9d5";
        }
  
        /* Jalankan fungsi wait agar komputer terlihat berpikir dahulu */
        wait();
  
        /* Jalankan seluruh perintah dibawah setelah fungsi wait selesai dijalankan */
        setTimeout(function () {
          versus.style.color = "#9c835f";
          resultClass.classList.add("result");  
          textResult.innerHTML = result;
          if (result == "DRAW") {
            textResult.style.backgroundColor = "#225c0e";
          } else {
            textResult.style.backgroundColor = "#4c9654";
          }
  
          /* Berikan greyBox pada comp choice */
          if (compChoice == "rock") {
            compBox[0].style.backgroundColor = "#dbd9d5";
          } else if (compChoice == "paper") {
            compBox[1].style.backgroundColor = "#dbd9d5";
          } else {
            compBox[2].style.backgroundColor = "#dbd9d5";
          }
        }, 1200);
      } else {
        alert("Refresh Untuk Memulai Permainan");
      }
    });
  });
  
  /* Reset tampilan game dengan tombol refresh */
  const reset = document.querySelector(".refresh");
  reset.addEventListener("click", function () {
    textResult.innerHTML = "";
    resultClass.classList.remove("result");
  
    /* Hilangkan kembali seluruh greyBox */
    for (let i = 0; i < compBox.length; i++) {
      playerBox[i].style.backgroundColor = "#9c835f";
      compBox[i].style.backgroundColor = "#9c835f";
    }
    versus.style.color = "rgb(255,0,0)";
  
    /* Reset kembali result menjadi null agar dapat melakukan permainan kembali */
    result = null;
  });