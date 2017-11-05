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
            newProject.populate(project, { path: "user", select: "_id full_name" }, (err, project) => {
                if (err) throw err;
                res.status(200).json(project);
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
        Project.delete({ _id: req.params.id }, (err, result) => {
            res.send(200).json({
                "message": "Project successfully deleted",
                result
            });
        });
    }
};

module.exports = projects;