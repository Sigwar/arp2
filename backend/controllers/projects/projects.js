const Projects = require('../../models/projects/projects');
const Users = require('../../models/users/users');

// GET PROJECTS LIST
exports.getProjects = async (req, res, next) => {
  try {
    const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });

    const data = await Projects.findAll({
      raw: true,
      where: { userId: user.id },
      order: [ [ req.body.sortBy, req.body.direction ] ],
      attributes: {
        exclude: [ 'id' ],
      },
    });
    res.status(200).json(data);
  } catch (e) {
  }
};

exports.projectsForEmployee = async (req, res, next) => {
  try {
    const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });

    const projects = await Projects.findAll({
      raw: true,
      where: { userId: user.id },
      attributes: {
        exclude: [ 'id', 'userId', 'topic', 'description', 'dateStart', 'dateEnd', 'createdAt', 'updatedAt' ],
      },
    });

    res.status(200).json(projects);
  } catch (e) {

  }
};
