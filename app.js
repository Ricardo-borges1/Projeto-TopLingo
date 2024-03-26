window.addEventListener('DOMContentLoaded', function() {
  const chk = document.getElementById('chk')

  chk.addEventListener('change', () =>{
      document.body.classList.toggle('dark')
  })

  const texto = document.querySelector("#texto");
  const linguas = document.querySelectorAll("select");
  const traducao = document.querySelector("#traducao");
  const botao = document.querySelector("#botao");

  const linguagens = {
    "en-GB": "Inglês",
    "pt-BR": "Português",
    "es-ES" : "Espanhol",
    "ru-RU": "Russo",
    "fr-Fr" : "Francês",
    "it-It" : "Italiano",
    "ja-Ja" : "Japonês",
    "Ar-Ar" : "Árabe"
  };

  linguas.forEach((select) => {
    for (let id in linguagens) {
      let escolhas = document.createElement("option");
      escolhas.value = id;
      escolhas.textContent = linguagens[id];
      if ((select.classList.contains("linguas") && id === "pt-BR") ||
          (select.classList.contains("linguas2") && id === "en-GB")) 
          {
        escolhas.selected = true;
      }
      select.appendChild(escolhas);
    }
  });

  // validação de texto
  function traduzirTexto(text) {
    if (text) {
      traducaoApi(text);
    } else {
      traducao.value = "";
    }
  }

  function traducaoApi(text) {
    const lang1 = linguas[0].value;
    const lang2 = linguas[1].value;
    
    fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${lang1}|${lang2}`
    )
      .then((res) => res.json())
      .then((data) => {
        traducao.value = data.responseData.translatedText;
        falar(data.responseData.translatedText); // Chamando a função para falar o texto traduzido
      });
  }

  function falar(texto) {
      const voz = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(texto);
      voz.speak(utterance);
  }

  const speakBtn = document.querySelector('#speakBtn');

  // testa se o navegador suporta o reconhecimento de voz
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {

      // captura a voz
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      // inicia reconhecimento
      speakBtn.addEventListener('click', function(e) {
          recognition.start();
  
      }, false);

      // resultado do reconhecimento
      recognition.addEventListener('result', function(e) {
          console.log(e);
          const result = e.results[0][0].transcript;
          texto.value = result;
          if (result.toLowerCase() === 'alice') {
              document.body.classList.toggle('luz-apagada');
          } else {
          }
      }, false);
  } else {
      alert('Este navegador não suporta esta funcionalidade ainda!');
  }

 
  botao.addEventListener('click', function() {
      traduzirTexto(texto.value);
  });

}, false);
