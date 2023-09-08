const express = require("express");
require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Conexion exitodo con la DDBB'))
    .catch(err => console.log('Ocurrio un error al tratar de conectar con la DDBB' + err))

const taskSchema = new Schema({
    name: String,
    done: Boolean
})

const Task = mongoose.model('Task', taskSchema, 'Tasks')

const app = express()

// Middleware para servir archivos estaticos
app.use(express.static('./public'))

// Middleware para extraer los chunks del post que me envian mediante fetch

app.use(express.json())

// Creando los middleware

app.use((req, res, next) => {
    console.log('no estoy especificando ninguna ruta')
    next()
})

// Rutas del proyecto

app.get('/users', (req, res) => {
    res.json([{ name: 'jorge' }, { name: 'lucia' }])
})

app.get('/api/tasks', (req, res) => {
    Task.find()
        .then((tasks) => {
            res.status(200).json({ ok: true, data: tasks })
        })
        .catch((err) => {
            res.status(400).json({ ok: false, messaje: 'Ocurrio un fallo al traer los archivos' + err })
        })
})

app.post('/api/tasks', (req, res) => {
    const body = req.body
    console.log(body)
    Task.create({
        name: body.text,
        done: false
    }).then((createTask) => {
        res.status(201).json({
            ok: true,
            messaje: 'tarea creada con exito',
            data: createTask
        })
    }).catch((err) => {
        res.status(400).json({
            ok: false,
            messaje: 'Ocurrio un erro al crear la tarea' + { err }
        })
    })
})

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const newText = req.body.text
    Task.findByIdAndUpdate(id, {
        name: newText
    })
        .then(updateTask =>
            res.status(201).json({
                ok: true,
                messaje: 'Tarea actualizada con exito',
                data: updateTask
            }))
        .catch(err => res.status(400).json({
            ok: false,
            messaje: 'Error al actualizar ' + err
        }))
})


app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findByIdAndRemove(id).then((deletedTask) => {
        res.status(200).json({ ok: true, data: deletedTask })
    }).catch(err =>
        res.status(400).json({ ok: false, messaje: 'Ocurrio un error al eliminar la tarea ' + err }))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('escuchando en puerto' + PORT)
})