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

//validação de texto
botao.addEventListener("click", () => {
  if (texto.value) {
    traducaoApi();
  } else {
    traducao.value = "";
  }
});

function traducaoApi() {
  const lang1 = linguas[0].value;
  const lang2 = linguas[1].value;
  

  fetch(
    `https://api.mymemory.translated.net/get?q=${texto.value}&langpair=${lang1}|${lang2}`
  )
    .then((res) => res.json())
    .then((data) => {
      traducao.value = data.responseData.translatedText;
    });
}
