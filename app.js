window.addEventListener('DOMContentLoaded', function() {
    const chk = document.getElementById('chk');

    chk.addEventListener('change', () =>{
        document.body.classList.toggle('dark');
    });

    const texto = document.querySelector("#texto");
    const linguas = document.querySelectorAll("select");
    const traducao = document.querySelector("#traducao");
    const botao = document.querySelector("#botao");
    const speakBtn = document.querySelector('#speakBtn');

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

    
    function traduzirTexto(texto) {
        if (texto) {
            traducaoApi(texto);
        } else {
            traducao.value = "";
        }
    }

    
    function traducaoApi(texto) {
        const lang1 = linguas[0].value;
        const lang2 = linguas[1].value;

        fetch(
            `https://api.mymemory.translated.net/get?q=${texto}&langpair=${lang1}|${lang2}`
        )
        .then((res) => res.json())
        .then((data) => {
            traducao.value = data.responseData.translatedText;
            falar(data.responseData.translatedText); 
        });
    }

   
    function falar(texto) {
        const voz = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texto);
        voz.speak(utterance);
    }

    // Testando se o navegador suporta reconhecimento de voz
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        // Capturando a voz
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        
        recognition.start();
        
        let nataliaDetected = false;

      
        recognition.addEventListener('result', function(e) {
            const result = e.results[0][0].transcript;
            
            // Verificando se "NATALIA" foi detectado e pode ser usado
            if (result.trim().toUpperCase() === 'NATÁLIA') {
                nataliaDetected = true;
                recognition.stop();
                setTimeout(() => {
                    recognition.start(); 
                }, 2000);
            } else if (nataliaDetected) {
                texto.value = result;
            } else {
                if (result.trim().toLowerCase() === 'alice') {
                    document.body.classList.toggle('luz-apagada');
                }
            }
        });

        speakBtn.addEventListener('click', function(e) {
            recognition.start();
        });
    } else {
        alert('Este navegador não suporta esta funcionalidade ainda!');
    }

    botao.addEventListener('click', function() {
        traduzirTexto(texto.value);
    });

});
