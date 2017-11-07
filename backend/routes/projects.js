const mongoose = require('mongoose');
const Project = require('../models/project');
const ObjectId = mongoose.Types.ObjectId;


const projects = {

    getAll: (req, res) => {
        let query = Project.find({}).populate('user', 'full_name');
        query.exec((err, projects) => {
            if (err) throw err;
            res.status(200).json(projects);
        });
    },
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