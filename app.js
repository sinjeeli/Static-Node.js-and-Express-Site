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
  
//
app.get('/test-error', (req, res, next) => {
  const err = new Error('Test error');
  err.status = 500;
  next(err);
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.error(`Error (${err.status}): ${err.message}`);
  res.status(err.status).render('error', { error: err });
});

//


  //
  const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
