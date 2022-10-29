
var traverseDomAndCollectElements = function (matchFunc, startEl, resultSet = []) {
  // var resultSet = [];
  if (typeof startEl === "undefined") {
    var startEl = document.body;
  }
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  // TU CÓDIGO AQUÍ

  //1ro checkea si matchiea
  if (matchFunc(startEl)) {
    //va rellenando el array con los q encuentre
    resultSet.unshift(startEl)

  }
  //debo hacer procedimientos recursivos sin retorno
  //
  //voy a usar .nextElementSibling y .firstElementChild
  //checkea primer nivel y va rellenando array
  if (startEl.firstElementChild) traverseDomAndCollectElements(matchFunc, startEl.firstElementChild, resultSet)
  if (startEl.nextElementSibling) traverseDomAndCollectElements(matchFunc, startEl.nextElementSibling, resultSet)
  //devuelve el array rellenado
  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector.charAt(0) === '.') return 'class'
  if (selector.charAt(0) === '#') return 'id'
  let str = selector.split('.')
  if (str.length === 2) return 'tag.class'
  return 'tag'

};


// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (elementus) => ('#' + elementus.id === selector)
  } else if (selectorType === "class") {

    matchFunction = (elementus) => {
      for (let i = 0; i < elementus.classList.length; i++) {
        const element = elementus.classList[i];
        if (element === selector.slice(1)) return true
      }
      return false
    }

  } else if (selectorType === "tag.class") {
    matchFunction = (ele) => {
      //debo separar selector
      const [miTag,miClass] = selector.split('.')
      //no me gushta, no me gushta // hacerlo con recursividad mejor
      return matchFunctionMaker(miTag)(ele) && matchFunctionMaker('.' + miClass)(ele) 
    }
  } else if (selectorType === "tag") {
    matchFunction = (elementus) => {
      return (elementus.tagName === selector.toUpperCase())
    }
  }
  return matchFunction;
};


var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector); //crea una funcion por closure
  elements = traverseDomAndCollectElements(selectorMatchFunc); //le pasa UN callback
  //dentro de traverseDomAndCollectELements()
  // debemos invocar selectorMatchFunc(conCadaElementoEncontrado)
  //y esa funcion rellena un array
  return elements;
};


