const express = require('express')
const fs = require('fs')
const path = require('path')
const repertorioPath = path.join(__dirname, 'data', 'repertorio.json')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public'))) // Sirve archivos estáticos desde la carpeta 'public'


app.get('/canciones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  fs.readFile(path.join(__dirname, 'data', 'repertorio.json'), 'utf8', (_err, data) => {
  const canciones = JSON.parse(data);
  cancion = canciones.find(c => c.id == id) 
  res.json(cancion)
  })
 
})

app.get('/canciones', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'repertorio.json'), 'utf8', (_err, data) => {
    res.json(JSON.parse(data))
  })
})

app.post('/canciones', (req, res) => {
  const nuevaCancion = req.body
  fs.readFile(repertorioPath, 'utf8', (_err, data) => {
    const canciones = JSON.parse(data)
    nuevaCancion.id = parseInt(Math.floor(Math.random() * 9999), 10)
    canciones.push(nuevaCancion)
    fs.writeFile(repertorioPath, JSON.stringify(canciones, null, 2), () => {
      res.json(console.log('cancion agregada'))
    })
  })
})
app.delete('/canciones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  fs.readFile(path.join(__dirname, 'data', 'repertorio.json'), 'utf8', (_err, data) => {
    let canciones = JSON.parse(data)
    canciones = canciones.filter(c => c.id !== id) 
   fs.writeFile(path.join(__dirname, 'data', 'repertorio.json'), JSON.stringify(canciones, null, 2), () => {
   res.json(console.log('cancion eliminada'))
    })
  })
})

app.put('/canciones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const editCancion = req.body
  fs.readFile(path.join(__dirname, 'data', 'repertorio.json'), 'utf8', (_err, data) => {
    const canciones = JSON.parse(data)
    const index = canciones.findIndex(c => c.id === id)
      delete editCancion.id
      canciones[index] = { ...canciones[index], ...editCancion }
      fs.writeFile(path.join(__dirname, 'data', 'repertorio.json'), JSON.stringify(canciones, null, 2), () => {
        res.json({ mensaje: 'Canción actualizada con éxito', editCancion })
      }) 
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
