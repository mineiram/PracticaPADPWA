import { html, h, render, Component } 
   from 'https://unpkg.com/htm/preact/standalone.module.js'


class AddTaskButton extends Component {
   render() {
      return html`<button id="addTaskButton" onclick=${this.handleClick.bind(this)}>Añadir tarea</button>`
   }
   handleClick(e) {
      //e.preventDefault()
      e.stopPropagation()
      render(html`<${AddTaskContent} />`, document.getElementById('addTaskDiv'))
   }
}


class AddTaskContent extends Component {
   render() {
      return html`<input type="text" id="textAddTask"/><${AddTaskAcceptButton}/><${AddTaskCancelButton}/>`
   }
}

class AddTaskAcceptButton extends Component {
   render() {
      return html`<button id="addTaskAcceptButton" onclick=${this.handleClick.bind(this)}>Aceptar</button>`
   }
   handleClick(e) {
      e.preventDefault()
      // añadir tarea
      let valor = document.getElementById('textAddTask').value
      console.log('Añadida tarea ' + valor)
      render(html`<${ListElementContent} value=${valor} />`, document.getElementById('taskListDiv'))
   }
}

class AddTaskCancelButton extends Component {
   render() {
      return html`<button id="AddTaskCancelButton" onclick=${this.handleClick.bind(this)}>Cancelar</button>`
   }
   handleClick(e) {
      e.preventDefault()
      // añadir tarea
      console.log('Cancelar.')
      // vaciar el div
      render(html``, document.getElementById('addTaskDiv')) // espero que sea similar a document.getElementById(addTaskDiv).innerHTML = ""
   }
}

class ListElementContent extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
   }
   render() {
      return html`<button class="TaskListButton" onclick=${this.handleClick.bind(this)}>${this.value} </button>`
   }
   handleClick(e) {
      e.preventDefault()
      console.log('Tarea ' + this.value)
      // mostrar gestion de tarea (text, eliminar, cancelar, guardar)
   }
}



function ejemplo(props) {
   return html`<button>${props.value}</button>`
}

//render(html`<${AddTaskButton} />`, document.getElementById('addTaskDiv'))
/*let e
for (let i = 0; i < 2; i++) {
   e = render(html`<${ejemplo} value=${i}/>`, document.body)
}*/
let e = render(html`<${ejemplo} value=${1}/>`, document.body)
render(html`<${ejemplo} value=${2}/>`, document.body)