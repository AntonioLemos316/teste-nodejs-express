const express = require('express')
const app = express()
const PORT = 3000

// Dados em memória ( lista de usuários )
let users = [
    { id: 1, name: 'João'},
    { id: 2, name: 'Maria'},
    { id: 3, name: 'Lemos'},
    { id: 4, name: 'Oliveira'},
]

app.use(express.json())

// Rota que obtem todos os usuários
app.get('/users', (req, res) => {
    res.json(users)
})

// Rota que obtem um usuário em específico
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(users => users.id === id)

    if(!user) {
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    res.json(user)
})

// Rota para atualizar usuário que exista
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === id)

    if(userIndex === -1){
        return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    users[userIndex].name = req.body.name
    res.json(users[userIndex])
})

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    
    const deleteUser = users.splice(userIndex, 1)
    res.json({ message: 'Usuário deletado', user: deleteUser[0] })
})

// Porta 3000
app.listen(PORT, () => {
    console.log(`Servidor está rodanddo em http://localhost:${PORT}`)
})