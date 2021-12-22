//Creamos elementos del tipo template (https://developer.mozilla.org/es/docs/Web/HTML/Element/template)
const inputText = document.createElement('template');
const maxLongText = document.createElement('template');
const inputConvertidor = document.createElement('template');

//Le asignamos un html interno a los elementos creados
inputText.innerHTML = `
  <div>
    <input placeholder="Ingrese la palabra secreta" style="-webkit-text-security: square;" >
    <p id="texto-pipe"></p>
  </div>
`;

maxLongText.innerHTML = `
  <div>
    <input placeholder="Texto con caracteres limitados" >
  </div>
`;

inputConvertidor.innerHTML = `
  <div>
    <input placeholder="Texto convertidor" >
    <ul id="lista-numeros"></ul>
  </div>
`;

//Creamos clases que extienden de HTMLElement y redefinimos su constructor
class NeorisPipeInput extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' }); //El attachShadow nos devuelve una referencia de una instancia de shadow que observa a las instancias de la clase
    this._shadowRoot.appendChild(inputText.content.cloneNode(true)); //Le agregamos el contenido HTML de inputText dentro del tag correspondiente a esta clase
    this.input = this._shadowRoot.querySelector('input'); //Obtenemos la referencia al tag input contenido dentro del tag de la clase
    this.texto = this._shadowRoot.querySelector('#texto-pipe'); //Obtenemos la referencia a un tag con id="texto-pipe" contenido dentro del tag de la clase
    this.input.addEventListener('input', () => { //La función addEventListener se ejecuta siempre que el input ejecute un evento input (cuando escribas o borres)
      const pText = this.input.value; //Tomamos el valor que tiene el input y lo asignamos a una variable
      //this.input.value = pText.replace(/[a-zA-Z0-9_.-]/g, '|');
      this.texto.innerHTML = pText; //Reemplazamos el contenido del tag al que hace referencia la variable texto con el valor del pText
    });
  }
}

class NeorisMaxLengthInput extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(maxLongText.content.cloneNode(true));
    this.input = this._shadowRoot.querySelector('input');
    this.input.addEventListener('input', () => {
      let length = this.getAttribute('longitud-maxima'); //Obtenemos el atributo "longitud-maxima" del tag que se crea en base a esta clase

      if (length == null) { //Si el atributo longitud-maxima no existe devuelve null. En caso de que sea null le asignamos el valor por defecto 10
        length = 10;
      }

      this.input.value = this.input.value.slice(0, length); //Slice es una función de los arrays, esta función toma una posición de inicio y otra de fin, y nos devuelve el array particionado entre esas posiciones. Tomando el valor ingresado como un array de caracteres le decimos que parta de la posición 0, hasta el valor máximo.
    });
  }
}

//Array de objetos los cuales tienen dos atributos id y texto
const arrayDeValores = [
  { id: 1, texto: 'uno' },
  { id: 2, texto: 'dos' },
  { id: 3, texto: 'tres' },
  { id: 4, texto: 'cuatro' },
  { id: 5, texto: 'cinco' },
  { id: 6, texto: 'seis' },
  { id: 7, texto: 'siete' },
  { id: 8, texto: 'ocho' },
  { id: 9, texto: 'nueve' },
  { id: 0, texto: 'cero' },
];

class NeorisConvertidorInput extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(inputConvertidor.content.cloneNode(true));
    this.input = this._shadowRoot.querySelector('input');
    this.lista = this._shadowRoot.querySelector('#lista-numeros');
    this.input.addEventListener('input', () => {
      const valores = Array.from(this.input.value); // Creo un array a partir del valor del input

      // Vacio lo que contiene el tag <ul>
      this.lista.innerHTML = '';

      // Recorro uno por uno los caracters del input value
      for (let valor of valores) {
        let nodoValor = document.createElement('LI'); // Creo un "nodo", que es una instancia de un elemento html (a partir de un identificador de HTML). En este caso "LI" == <li></li>

        let objetoConElValor = arrayDeValores.find((elementoArray) => elementoArray.id == valor); // Busco dentro de arrayDeValores el primer objeto cuyo id sea igual a valor

        nodoValor.innerHTML = objetoConElValor.texto; // Le asignamos el valor al <li></li>
        this.lista.appendChild(nodoValor); // Le agrego a la lista un hijo que contiene lo que creamos para la variable nodoValor
      }
    });
  }
}

//Agregamos a window unos elementos custom
//define recibe un tag/alias y la clase que tiene que instanciar
window.customElements.define('neoris-pipe', NeorisPipeInput);
window.customElements.define('neoris-max-length', NeorisMaxLengthInput);
window.customElements.define('neoris-convertidor', NeorisConvertidorInput);
