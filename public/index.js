const input = document.querySelector('#task-name')
const getUsersBtn = document.getElementById('get-users')
const createEditTaskBtn = document.getElementById('create-task')
let main = document.querySelector('main')

const baseBackendUrl = `${window.origin}/api`

getUsersBtn.addEventListener('click', async () => {

    console.log('obteniendo usuarios');
    await fetch('http://localhost:4000/users')
        .then(response => response.json())
        .then(data => {
            main.innerHTML = data.map(user => `<li style='list-style:none'>Nombre: ${user.name}</li>`)
        })

})

let TASK__TO_EDIT = null

// OBTENIENDO LAS TAREAS
const getTask = () => {
    main.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
        .then(res => res.json())
        .then(data => {

            data.data.forEach(element => {
                const div = document.createElement('div')
                const taskParraf = document.createElement('p')
                taskParraf.addEventListener('click', () => {
                    input.value = taskParraf.innerText
                    createEditTaskBtn.innerText = 'Editar Task'
                    TASK__TO_EDIT = element
                    console.log(TASK__TO_EDIT);
                })

                const deleteTaskBtn = document.createElement('button')
                deleteTaskBtn.classList.add('get-task')
                deleteTaskBtn.innerText = 'Borrar'
                deleteTaskBtn.setAttribute('id', element._id)
                deleteTaskBtn.addEventListener('click', (e) => {
                    const taskId = e.target.id
                    deleteTaskBtn.innerHTML = '...'
                    fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                        method: 'DELETE'
                    })
                        .then(() => {
                            const divTask = deleteTaskBtn.parentElement
                            divTask.remove()
                            input.focus()
                        })
                })

                div.appendChild(taskParraf)
                div.appendChild(deleteTaskBtn)
                main.appendChild(div)

                taskParraf.innerText = element.name
            })

        })
        .catch(err => console.log('Ocurrio un error' + err))
}

createEditTaskBtn.addEventListener('click', () => {
    const creating = !TASK__TO_EDIT
    const path = creating ? 'tasks' : `tasks/${TASK__TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"

    fetch(`${baseBackendUrl}/${path}`, {
        method: `${method}`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.value })
    }).then(() => {
        input.value = ''
        createEditTaskBtn.innerText = 'Crear Tarea'
        input.focus()
        getTask()
    })
})

// const suma = (especie1, especie2, ...animales) => {
//     let animalesGroup = ''
//     for (const animal of animales) {
//         animalesGroup += animal
//     }
//     console.log(especie1, especie2)
// }

// suma('aligartor', 'pollo', 'serpiente', 'lombriz')