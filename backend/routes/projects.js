const mongoose = require('mongoose');
const Project = require('../models/project');
const ObjectId = mongoose.Types.ObjectId;


const projects = {

  /**
    * @api {get} /api/v1/projects getAll
    * @apiName projects.getAll
    * @apiGroup Projects
    *
    * @apiSuccessExample Success-Response:
    *    HTTP/1.1 200
    *    [
            {
                "_id": "5a2d8253a7b0be6faf78e69b",
                "name": "Project 1",
                "description": "Project 1 description",
                "user": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "created": "2017-12-10T18:52:03.906Z",
                "status": 1
            },
            {
                "_id": "5a2d8506a7b0be6faf78e69c",
                "name": "Project 2",
                "description": "Project 2 description",
                "user": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "created": "2017-12-10T19:03:34.141Z",
                "status": 1
            }
        ]
    *
    */
    getAll: (req, res) => {
        let query = Project.find({}).populate('user', 'full_name');
        query.exec((err, projects) => {
            if (err) throw err;
            res.status(200).json(projects);
        });
    },

    /**
     * @api {get} /api/v1/project/:id getOne
     * @apiName projects.getOne
     * @apiGroup Projects
     *
     * @apiParam {String} id Projects ID hash
     *
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200
     *    [
             {
                 "_id": "5a2d8253a7b0be6faf78e69b",
                 "name": "Project 1",
                 "description": "Project 1 description",
                 "user": {
                     "_id": "5a2d63778c6781413991d525",
                     "full_name": "Example User"
                 },
                 "created": "2017-12-10T18:52:03.906Z",
                 "status": 1
             }
           ]
     *
     */
    getOne: (req, res) => {
        let id = req.params.id;

        Project.find({ _id: ObjectId(id) }).populate('user', 'full_name')
            .exec((err, project) => {
                if (err) throw err;
                if (project && project.length > 0) {
                    res.status(200).json(project);
                } else {
                    res.status(400).json({
                        "status": 400,
                        "message": "Specified project could not be found"
                    });
                }

            });
    },

    /**
       * @api {post} /api/v1/project/ create
       * @apiName projects.create
       * @apiGroup Projects
       *
       * @apiParam {String} name Project name
       * @apiParam {String} description Project description
       * @apiParam {String} user Users ID hash
       *
       * @apiParamExample {json} Request-Example:
       *
       *     {
                "name": "Project 1",
                "description": "Example project 1",
                "user": "5a2d63778c6781413991d525"
              }
       *
       *
       * @apiSuccessExample Success-Response:
       *    HTTP/1.1 200
       *    {
                "name": "Project 1",
                "description": "Example project 1",
                "user": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "_id": "5a2d8253a7b0be6faf78e69b",
                "created": "2017-12-10T18:52:03.906Z",
                "status": 1
            }
       *
       *
       */
    create: (req, res) => {
        let newProject = new Project(req.body);
        newProject.save((err, project) => {
            if (err) {
                let errMessage;
                for (let errName in err.errors) {
                    errMessage += err.errors[errName].message + " , ";
                }
                console.log(errMessage);
            }
            project.populate({ path: "user", select: "_id full_name" }, (err, pop) => {
                if (err) throw err;
                res.status(200).json(pop);
            });
        });
    },

    /**
       * @api {post} /api/v1/project/:id update
       * @apiName projects.update
       * @apiGroup Projects
       *
       * @apiParam {String} id Project ID hash
       *
       * @apiParam {String} name Project name
       * @apiParam {String} description Project description
       *
       *
       * @apiParamExample {json} Request-Example:
       *
       *     {
                "description": "new Example project 1 description",
              }
       *
       *
       * @apiSuccessExample Success-Response:
       *    HTTP/1.1 200
       *    {
                "name": "Project 1",
                "description": "new Example project 1 description",
                "user": {
                    "_id": "5a2d63778c6781413991d525",
                    "full_name": "Example User"
                },
                "_id": "5a2d8253a7b0be6faf78e69b",
                "created": "2017-12-10T18:52:03.906Z",
                "status": 1
            }
       *
       *
       */
    update: (req, res) => {
        let id = req.params.id;
        Project.findById(id, (err, project) => {
            if (err) throw err;
            Object.assign(project, req.body).save((err, project) => {
                if (err) throw err;
                Project.populate(project, { path: "user", select: "_id full_name" }, (err, project) => {
                    if (err) throw err;
                    res.status(200).json(project);
                });

            });
        });
    },

    /**
       * @api {post} /api/v1/project/:id delete
       * @apiName projects.delete
       * @apiGroup Projects
       *
       * @apiParam {String} id Project ID hash
       *
       * @apiSuccessExample Success-Response:
       *    HTTP/1.1 200
       *    {
               "status": 200,
               "message": "Project successfully deleted",
            }
       *
       * @apiErrorExample Error-Response:
       *    HTTP/1.1 400
       *    {
       *        "status": 400,
       *        "message": "Requested project does not exist so we couldn't remove it"
       *    }
       *
       */
    delete: (req, res) => {
        Project.remove({ _id: req.params.id }, (err, result) => {
            if (err) throw err;
            if (result.result.n == 0) {
                res.status(400).json({
                    "status": 400,
                    "message": "Requested project does not exist so we couldn't remove it"
                });
            }
            if (result.result.n > 0) {
                console.log(result.result.n);
                res.status(200).json({
                    "status": 200,
                    "message": "Project successfully deleted",
                });
            }
        });
    }
};

module.exports = projects;
