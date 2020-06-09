import { html, render, Component } from 'https://unpkg.com/htm/preact/standalone.module.js'

////////////////
//   CLASES   //
////////////////

// componente que es el botón "Añadir tarea"
class AddTaskButton extends Component {
   render() {
      return html`<button id="addTaskButton" onclick=${this.handleClick.bind(this)}>Añadir tarea</button>`
   }
   handleClick(e) {
      render(html`<${AddTaskContent} />`, document.getElementById('addTaskDiv'))
   }
}

// se rellena el div correspondiente al dar clic en "Añadir tarea"
// se añade el input text y botones correspondientes (agrupados para el css posterior)
class AddTaskContent extends Component {
   render() {
      return html`<input type="text" id="textAddTask"/><div class="contentTaskDivButtons"><${AddTaskAcceptButton}/><${AddTaskCancelButton}/></div>`
   }
}

// botón "Aceptar" de añadir tarea
class AddTaskAcceptButton extends Component {
   render() {
      return html`<button id="addTaskAcceptButton" onclick=${this.handleClick.bind(this)}>Aceptar</button>`
   }
   handleClick(e) {
      // añadir tarea
      let inputText = document.getElementById('textAddTask')

      // si el campo de texto está vacío se colorea en rojo
      if (inputText.value == '')
            inputText.style.backgroundColor = 'red'
      else {
         // se añade a localStorage y al HTML
         // se recarga la lista completa debido a que me daba problemas de otras maneras que probé
         // se vacía la parte de "Añadir tarea"
         console.log('Añadida tarea ' + inputText.value)
         inputText.style.backgroundColor = ''
         addTask(inputText.value)
         render(html``, document.getElementById('addTaskDiv'))
         render(html``, document.getElementById('taskListDiv'))
         render(html`<${ListElement}/>`, document.getElementById('taskListDiv'))
      }
   }
}

// botón "Cancelar" de añadir tareas
class AddTaskCancelButton extends Component {
   render() {
      return html`<button id="AddTaskCancelButton" onclick=${this.handleClick.bind(this)}>Cancelar</button>`
   }
   handleClick(e) {
      console.log('Cancelar.')
      // se vacía la parte de "Añadir tarea"
      render(html``, document.getElementById('addTaskDiv'))
   }
}

// Clase que incluye la lista de tareas
class ListElement extends Component {
   render() {
      let tasks = loadTaskList()
      let htmlList = [] // array de elementos htm
      if (tasks != null) {
         let i = 0
         // para cada tarea en localStorage
         tasks.forEach((valor) => {
            // botón correspondiente a cada tarea
            htmlList.push(html`<div id=${i}><${ListElementContent} value=${valor} i=${i}/></div>`)
            i++
         })
      }
      return htmlList
   }
}

// Clase que incluye el botón de una tarea concreta
class ListElementContent extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
      this.i = props.i
   }
   render() {
      return html`<button class="taskListButton" onclick=${this.handleClick.bind(this)}>${this.value} </button>`
   }
   handleClick(e) {
      // mostrar gestion de tarea (text, eliminar, cancelar, guardar)
      // primero se vacía el div correspondiente para sustituirse. El argumento replaceNode de render(component, containerNode, [replaceNode])
      // no me sobreescribía, por eso primero vacío el div.
      document.getElementById(this.i).innerHTML=''
      render(html`<${ListElementContentUpdate} value=${this.value} i=${this.i} />
                  <div class="contentTaskDivButtons">
                  <${TaskUpdateDel} value=${this.value} i=${this.i}/>
                  <${TaskUpdateCancel} value=${this.value} i=${this.i}/>
                  <${TaskUpdateSave} value=${this.value} i=${this.i}/>
                  </div>`, document.getElementById(this.i))

   }
}

// Botón "Eliminar" en modificar tarea
class TaskUpdateDel extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
      this.i = props.i
   }
   render() {
      return html`<button onclick=${this.handleClick.bind(this)}>Eliminar</button>`
   }
   handleClick(e) {
      // eliminar de localStorage y de lista (html)
      deleteTaskFromStorageList(document.getElementById('input'+this.i).parentNode)
      document.getElementById('taskListDiv').removeChild(document.getElementById('input'+this.i).parentNode)
   }
}

// Botón "Cancelar" en modificar tarea
class TaskUpdateCancel extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
      this.i = props.i
   }
   render() {
      return html`<button onclick=${this.handleClick.bind(this)}>Cancelar</button>`
   }
   handleClick(e) {
      console.log('Cancelar')
      // se vuelve a mostrar el botón de la tarea
      render(html`<${ListElementContent} value=${this.value} i=${this.i}/>`, document.getElementById(this.i))

   }
}


// Botón "Guardar" en modificar tarea
class TaskUpdateSave extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
      this.i = props.i
   }
   render() {
      return html`<button onclick=${this.handleClick.bind(this)}>Guardar</button>`
   }
   handleClick(e) {
      // se guarda en localStorage solo si el campo de texto no está vacío y el valor es diferente al de antes
      let inputText = document.getElementById('input'+this.i)
      console.log(inputText.value)
      if (inputText.value != '' && inputText.value != inputText.placeholder)
         updateStorageList(document.getElementById('input'+this.i).parentNode, inputText.value)
      // se vuelve a mostrar el botón de la tarea
      render(html`<${ListElementContent} value=${inputText.value == '' ? this.value : inputText.value} i=${this.i}/>`, document.getElementById(this.i))
   }
}

// Campo de texto para modificar el valor si se desea
class ListElementContentUpdate extends Component {
   constructor(props) {
      super(props)
      this.value = props.value
      this.i = props.i
   }
   render() {
      return html`<input type="text" placeholder=${this.value} id=${'input'+this.i}/>`
   }
}


/////////////////////////////
//       FUNCIONES         //
/////////////////////////////

/*
Añadir una tarea al array almacenado en 'tasks' en formato JSON Array de localStorage
*/
function addTask(value) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   if (tasks == null)
      tasks = [value]
   else
      tasks.push(value)
   console.log(tasks)
   localStorage.setItem('tasks', JSON.stringify(tasks))
   
}


/*
Cargar el array de tareas almacenado en localStorage
*/
function loadTaskList() {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   console.log('Cargando lista de tareas ' + tasks)

   return tasks
}


/*
Eliminar una tarea del array almacenado en localStorage
*/
function deleteTaskFromStorageList(e) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   const i = Array.from(document.getElementById('taskListDiv').children).indexOf(e)
   console.log(e)
   tasks.splice(i, 1)

   localStorage.setItem('tasks', JSON.stringify(tasks))
}


/*
Modificar una tarea del array almacenado en localStorage
*/
function updateStorageList(e, value) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   const i = Array.from(document.getElementById('taskListDiv').children).indexOf(e)
   tasks[i] = value

   localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Al principio se carga botón de añadir tarea y lista de tareas ya almacenadas
render(html`<${AddTaskButton} />`, document.body)
render(html`<${ListElement}/>`, document.getElementById('taskListDiv'))