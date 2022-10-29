
var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
  if (typeof startEl === "undefined") {
    var startEl = document.body;
  }
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {
    resultSet.unshift(startEl)
  }
  if (startEl.firstElementChild)
    resultSet = [...resultSet, ...traverseDomAndCollectElements(matchFunc, startEl.firstElementChild)]

  if (startEl.nextElementSibling)
    resultSet = [...resultSet, ...traverseDomAndCollectElements(matchFunc, startEl.nextElementSibling)]
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
    matchFunction = (elementus) => {
      //debo separar selector
      const [miTag, miClass] = selector.split('.')
      //no me gushta, no me gushta // hacerlo con recursividad mejor
      return matchFunctionMaker(miTag)(elementus) && matchFunctionMaker('.' + miClass)(elementus)
    }
  } else if (selectorType === "tag") {
    matchFunction = (elementus) => {
      return (elementus.tagName === selector.toUpperCase())
    }
  }
  return matchFunction;
};

// $('div > img')
// seleccionaría todos los <img> tags 
// hijos directos de <div> tags.
var jerarKIKO = function (selector, elements) {
  const [tagPadre, tagHijo] = selector.split(' > ')
  const arrHijos = $(tagHijo)
  console.log(arrHijos)
  for (const hijo of arrHijos) {
    if (hijo.parentElement) {
      if (hijo.parentElement.tagName == tagPadre.toUpperCase()) {
        elements.push(hijo)
      }
    }
  }
  return elements
}
var $ = function (selector) {
  var elements = [];
  if (selector.includes(' > ')) return jerarKIKO(selector, elements)
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
