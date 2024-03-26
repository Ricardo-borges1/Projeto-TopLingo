'use strict'

window.addEventListener('DOMContentLoaded', function() {
    var speakBtn = document.querySelector('#speakBtn');

    // testa se o navegador suporta o reconhecimento de voz
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        // captura a voz
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        // inicia reconhecimento
        speakBtn.addEventListener('click', function(e) {
            recognition.start();
    
        }, false);

        // resultado do reconhecimento
        recognition.addEventListener('result', function(e) {
            console.log(e);
            var result = e.results[0][0].transcript;
            texto.value = result
            if (result.toLowerCase() === 'alice') {
                document.body.classList.toggle('luz-apagada');
            }
        }, false);
    } else {
        alert('Este navegador não suporta esta funcionalidade ainda!');
    }

}, false);