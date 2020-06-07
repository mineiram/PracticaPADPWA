/*import { html, render, Component } from 'https://unpkg.com/htm/preact/standalone.module.js'


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


//render(html`<${AddTaskButton} />`, document.getElementById('addTaskDiv'))

function ejemplo(props) {
   return html`<button>${props.value}</button>`
}
render(html`<${ejemplo} value=${1}/>`, document.body)
render(html`<div> Hola </div>`, document.body)

//localStorage.setItem('ejemplo', JSON.stringify(['tarea 1', 'tarea 2']))
//localStorage.setItem('ejemplo', ['tarea 1', 'tarea 2'])
render(html`<span>${localStorage.getItem('ejemplo')}</span>`, document.body)*/



window.onload = () => {
   let el = document.getElementById('addTask')
   el.addEventListener('click', (e) => {
      console.log('Click')
      let d = document.getElementById('addTaskDiv')

      let newD = document.createElement('div')
      newD.className='addTaskDivContent'

      let inputText = document.createElement('input')
      inputText.type='text'
      inputText.id='inputText'

      let buttonGroup = document.createElement('div')
      buttonGroup.className = 'contentTaskDivButtons'

      let buttonAccept = document.createElement('button')
      buttonAccept.innerText='Aceptar'
      buttonAccept.addEventListener('click', (e) => {
         console.log('Aceptar ' + inputText.value)
         if (inputText.value == '')
            inputText.style.backgroundColor = 'red'
         else {
            inputText.style.backgroundColor = ''
            addTask(inputText.value)
            d.removeChild(newD)
         }
      })

      let buttonCancel = document.createElement('button')
      buttonCancel.innerText='Cancelar'
      buttonCancel.addEventListener('click', (e) => {
         console.log('Cancelar')
         d.removeChild(newD)
      })


      buttonGroup.appendChild(buttonAccept)
      buttonGroup.appendChild(buttonCancel)

      newD.appendChild(inputText)
      newD.appendChild(buttonGroup)
   
      d.appendChild(newD)
   
   })

   loadTaskList()

}

// utilizar service worker que ejecute esto cada vez que se entre a la web??
function loadTaskList() {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   console.log('Cargando lista de tareas ' + tasks)
   tasks.forEach((valor) => {
      addTaskToList(valor)
   })
}

function addTask(value) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   if (tasks == null)
      tasks = [value]
   else
      tasks.push(value)
   console.log(tasks)
   localStorage.setItem('tasks', JSON.stringify(tasks))
   
   addTaskToList(value)

}

function addTaskToList(value) {
   let listDiv = document.getElementById('taskListDiv')
   let buttonTask = document.createElement('button')
   buttonTask.innerText = value
   buttonTask.addEventListener('click', (e) => {
      let currentButton = e.currentTarget

      console.log('Click en ' + currentButton.innerText)
      let contentTaskDiv = document.createElement('div')
      contentTaskDiv.className='contentTaskDiv'

      let inputText = document.createElement('input')
      inputText.type='text'
      inputText.placeholder=currentButton.innerText
      
      let buttonGroup = document.createElement('div')
      buttonGroup.className = 'contentTaskDivButtons'

      let buttonDel = document.createElement('button')
      buttonDel.innerText = 'Eliminar'
      buttonDel.addEventListener('click', (e) => {
         console.log('Eliminar ' + inputText.placeholder)
         // eliminar de lista y de html
         deleteTaskFromStorageList(contentTaskDiv)
         listDiv.removeChild(contentTaskDiv)
      })

      let buttonCancel = document.createElement('button')
      buttonCancel.innerText = 'Cancelar'
      buttonCancel.addEventListener('click', (e) => {
         console.log('Cancelar ' + inputText.placeholder)
         listDiv.replaceChild(currentButton, contentTaskDiv)
      })

      let buttonSave = document.createElement('button')
      buttonSave.innerText = 'Guardar'
      buttonSave.addEventListener('click', (e) => {
         console.log('Guardar ' + inputText.placeholder)
         // guardar
         // si no hay texto se deja el que estaba
         currentButton.innerText=inputText.value == '' ? inputText.placeholder : inputText.value
         listDiv.replaceChild(currentButton, contentTaskDiv)
         // si ha habido diferencia en texto se actualiza la lista (se intenta ser algo mas eficiente)
         if (currentButton.innerText != inputText.placeholder)
            updateStorageList(currentButton)
      })


      buttonGroup.appendChild(buttonDel)
      buttonGroup.appendChild(buttonCancel)
      buttonGroup.appendChild(buttonSave)

      contentTaskDiv.appendChild(inputText)
      contentTaskDiv.appendChild(buttonGroup)

      listDiv.replaceChild(contentTaskDiv, currentButton)
   })
   listDiv.appendChild(buttonTask)
}

function updateStorageList(e) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   const i = Array.from(e.parentNode.children).indexOf(e)
   tasks[i] = e.innerText

   /*for (b in document.querySelector('div#taskListDiv button'))
      tasks.push(b.innerText)*/

   localStorage.setItem('tasks', JSON.stringify(tasks))
}

function deleteTaskFromStorageList(e) {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   const i = Array.from(e.parentNode.children).indexOf(e)
   tasks.splice(i, 1)

   /*for (b in document.querySelector('div#taskListDiv button'))
      tasks.push(b.innerText)*/

   localStorage.setItem('tasks', JSON.stringify(tasks))
}