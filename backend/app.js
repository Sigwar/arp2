const express = require('express');
require('dotenv').config({ path: '.env' });

//ROUTES
const authRoutes = require('./routes/auth/auth');
const levelsRoutes = require('./routes/levels/levels');
const projectRoutes = require('./routes/project/project');
const projectsRoutes = require('./routes/projects/projects');
const employeeRoutes = require('./routes/employee/employee');
const employeesRoutes = require('./routes/employees/employees');
const languagesRoutes = require('./routes/languages/languages');
const Registration = require('./routes/registration/registration');
const workstationsRoutes = require('./routes/workstations/workstations');
const itTechnologiesRoutes = require('./routes/itTechnologies/itTechnologies');

//OTHERS
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const multer = require('multer');

//MODELS
const Roles = require('./models/roles/roles');
const Users = require('./models/users/users');
const Levels = require('./models/levels/levels');
const Projects = require('./models/projects/projects');
const Pictures = require('./models/pictures/pictures');
const Employees = require('./models/emplyoees/employees');
const Languages = require('./models/languages/languages');
const Educations = require('./models/educations/educations');
const Activities = require('./models/activities/activities');
const Workstation = require('./models/workstation/workstation');
const Certificates = require('./models/certificates/certificates');
const ItTechnologies = require('./models/itTechnologies/itTechnologies');
const LanguagesLevels = require('./models/languagesLevels/languagesLevel');
const EmployeeProjects = require('./models/employeeProjects/employeeProjects');
const EmployeeLanguages = require('./models/employeeLanguages/employeeLanguages');
const ProjectItTechnologies = require('./models/projectItTechnologies/projectItTechnologies');
const EmployeeItTechnologies = require('./models/employeeItTechnologies/itTechnologiesEmployee');

Educations.belongsTo(Employees);
Certificates.belongsTo(Employees);
Pictures.belongsTo(Employees);
EmployeeProjects.belongsTo(Employees);
EmployeeProjects.belongsTo(Projects);

EmployeeLanguages.belongsTo(Languages, { onDelete: 'cascade', hooks: true });
EmployeeLanguages.belongsTo(LanguagesLevels, { onDelete: 'cascade', hooks: true });
EmployeeLanguages.belongsTo(Employees, { onDelete: 'cascade', hooks: true });

ItTechnologies.belongsToMany(Employees, { through: EmployeeItTechnologies, onDelete: 'cascade', hooks: true });
ItTechnologies.belongsToMany(EmployeeProjects, { through: ProjectItTechnologies, onDelete: 'cascade', hooks: true });

Employees.belongsTo(Workstation, { as: 'workstation' });
Employees.belongsTo(Levels);

Roles.belongsTo(EmployeeProjects);
Activities.belongsTo(EmployeeProjects);

Projects.belongsTo(Users);
Employees.belongsTo(Users);
Workstation.belongsTo(Users);
ItTechnologies.belongsTo(Users);
Levels.belongsTo(Users);
Languages.belongsTo(Users);

const app = express();
app.use(multer().single('image'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//ROUTES
app.use('/auth', authRoutes);

app.use('/employees', employeesRoutes);
app.use('/employee', employeeRoutes);

app.use('/project', projectRoutes);
app.use('/projects', projectsRoutes);

app.use('/levels', levelsRoutes);

app.use('/itTechnologies', itTechnologiesRoutes);

app.use('/workstations', workstationsRoutes);

app.use('/languages', languagesRoutes);

app.use('/registration', Registration);

console.log(process.env);

if(process.env.NODE_ENV === 'production') {
  console.log('tutaj:',)

  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

sequelize.sync().then(() => { //REBUILD DATABASE -> { force: true }
  app.listen(8081);
}).catch(() => {
});