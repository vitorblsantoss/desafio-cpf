// https://www.devmedia.com.br/validar-cpf-com-javascript/23916
// http://www.profcardy.com/cardicas/cpf.php
// https://www.guj.com.br/t/identificacao-cpf-ou-cnpj-com-mesma-quantidade-de-caracteres/324740/3
// https://www.somatematica.com.br/faq/cpf.php

const fs = require('fs')

function CPFValido(cpf) { 
  // defino uma variavel de resposta
  let resposta = true

  // valido se o tamanho do CPF e diferente de 11
  // e se existe um conjunto de 10 posicoes consecutivas identicas a primeira posicao. Ex.: 22222222222
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  // Uso esses dois valores (9, 10) para fazer uma validacao.
  // Primeiro, utilizo os nove primeiros digitos do CPF multiplicando em ordem decrescente de 10 à 2
  // Ex.: 894.749.842-47 = (8*10) / (9*9) / (4*8) / (7*7) / (4*6) / (9*5) / (8*4) / (4*3) / (2*2)  
  // somo os resultados obtidos(359) e divido por 11(7). Após, subtraio o módulo(resto) do número 11(11 - 7).
  // como o resultado da subtracao foi 4, o primeiro digito é 4.
  // depois, preciso validar o segundo digito. Para isso, utilizo os dez primeiros digitos do cpf e os multiplico
  // em ordem decrescente de 11 à 2. 
  // Ex.: 894.749.842-47 = (8*11) / (9*10) / (4*9) / (7*8) / (4*7) / (9*6) / (8*5) / (4*4) / (2*3) / (4*2)  
  // somo os resultados obtidos(422) e divido por 11(4). Após, subtraio o módulo(resto) do número 11(11 - 4).
  // como o resultado da subtracao foi 7, o segundo digito é 7.
  const defaults = [9, 10]

  defaults
    .map(function (el) {
      let resto
      let soma = 0
  
      // quebro o cpf em um array de posicao unica.
      // Ex.: 89474984247 - ['8', '9', '4', '7', '4', '9', '8', '4', '2', '4', '7']
      cpf
        .split(/(?=)/)
        .splice(0, el)
        .forEach(function (e, i) {
          soma += parseInt(e) * ((el + 2) - (i + 1))
        })

        
        resto = soma % 11
        // se o resto for menor que 2 o digito e 0
        resto = (resto < 2) ? 0 : 11 - resto
        if (resto !== parseInt(cpf.substring(el, el + 1))) resposta = false
    })

  return resposta
}

// uso esse metodo para salvar os conjuntos em um arquivo de evidencias.
function writeToFile(data) {
  fs.appendFileSync('evidencia.txt', `${data}\n`, function (err) {
    if (err) throw err
  })
}

// uso esse loop para gerar N conjuntos de CPF válido.
function loop(integer) {
  for (let a = 0; a <= integer; a++) {
    for (let b = 0; b <= integer; b++) {
      for (let c = 0; c <= integer; c++) {
        for (let d = 0; d <= integer; d++) {
          for (let e = 0; e <= integer; e++) {
            for (let f = 0; f <= integer; f++) {
              for (let g = 0; g <= integer; g++) {
                for (let h = 0; h <= integer; h++) {
                  for (let i = 0; i <= integer; i++) {
                    for (let j = 0; j <= integer; j++) {
                      for (let k = 0; k <= integer; k++) {
                        const cpf = `${a}${b}${c}${d}${e}${f}${g}${h}${i}${j}${k}`
                        if (CPFValido(cpf)) writeToFile(cpf)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

loop(9)