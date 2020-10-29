const express           = require("express");
const router            = express.Router();

const Project           = require("../models/project");
const Task              = require("../models/task");

const authMiddleware    =  require("../middlewares/authentication");

router.use(authMiddleware);

router.get("/", async (req, res, next) => {
    try{
        const projects = await Project.find({ user: res.locals.userId }).populate([ "user", "tasks" ]);
        return res.status(200).send({ projects });
    } catch( error ) {
        return res.status(400).send({ message: "Error to list projects" });
    }
})

router.get("/:projectId", async (req, res, next) => {
    try{
        const project = await Project.findById( req.params.projectId ).populate([ "user", "tasks" ]);
        return res.status(200).send({ project });
    } catch( error ) {
        return res.status(400).send({ message: "Error to show project" });
    }
})

router.post("/", async (req, res, next) => {
    try{
        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description, user: res.locals.userId});

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id, user: res.locals.userId });
            
            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.status(200).send({ project });
    } catch ( error ){
        console.log(error);
        return res.status(400).send({ error:"Error Creating new Project" })
    }
})

router.put("/:projectId", async (req, res, next) => {
    try{
        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate( req.params.projectId, { 
            title, 
            description
        }, { new: true });

        project.tasks = [];
        await Task.deleteMany({ project: project._id });

        await Promise.all( tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id, user: res.locals.userId });
            
            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.status(200).send({ project });
    } catch ( error ){
        console.log(error);
        return res.status(400).send({ error:"Error Updating Project" })
    }
})

router.delete("/:projectId", async (req, res, next) => {
    try{
        const project = await Project.findByIdAndDelete( req.params.projectId ).populate( "user" );
        return res.status(200).send();
    } catch( error ) {
        return res.status(400).send({ message: "Error to deleting project" });
    }
})

module.exports = app => app.use("/projects", router);