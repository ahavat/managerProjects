const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//utilizei esta variavel com array vazio para armazenar os valores que farei teste.
const projects = [];

app.get('/projects', (request, response) => {
    
    const { title } = request.query
    const results = title
    
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.status(200).json(results)
});


app.post('/projects', (request, response) => {
    const { title, owner } = request.body
    const project = { id: uuid(), title, owner }

    projects.push(project)
    return response.status(201).json(project)

});

app.put('/project/:id', (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0) {
    return response.status(400).json({ error:"Project not found" })
    }
const project = {
    id,
    title,
    owner,
};

projects[projectIndex] = project;

return response.json(project)

});

app.delete('/project/:id', (request, responde) => {

    const { id } = request.params;
    const projectIndex = projects.findIndex(project=> project.id === id)

    if(projectIndex < 0){
        return response.stauts(400).json({ error: 'Project not found'})
    }
    projects.splice(projectIndex, 1);
    return response.status(204).send()
});

app.listen(3333, () => {
    console.log('(☞ﾟヮﾟ)☞ Funcionando')
});