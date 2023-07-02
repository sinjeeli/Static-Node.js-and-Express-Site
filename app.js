const express = require('express');
const data = require('./data.json');
const path = require('path');
//

const app = new express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));
//
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
  });
  
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = data.projects[projectId];
    res.render('project', { project, projectImage: project.project_image });

  });

  //
  const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//
