const express = require("express");
const {empModel} = require("../Model/empModel");
const { auth } = require("../middleware/auth");

const empRouter = express.Router();

empRouter.post("/add",auth,async(req,res)=>{
    console.log(req.body);
    try {
        let newEmp = new empModel(req.body);
        await newEmp.save();
        res.status(201).send({msg:"New Employee Added Successfully"});
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error!!"})
    }
})

empRouter.get("/allemployee",auth,async(req,res)=>{
    const {firstName,department,page} = req.query;
    try {
        let query = {};
        query.userId = req.body.userId;

        if(firstName && firstName!==""){
            query.firstName = firstName;
        }
        if(department && department!==""){
            query.department = department;
        }

        let skipping = (page-1)*5;

        let employee = await empModel.find(query).skip(skipping).limit(5);
        let total = await empModel.countDocuments(query);
        res.status(200).send({data:employee,total})
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error!!"})
    }
})

empRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id} = req.params;
    let employe = await empModel.findOne({_id:id});
    try {
        if(employe){
            let empUpdate = await empModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({msg:"Updated Successfully",empUpdate});
        }else{
            res.status(400).send({msg:`This ${id} is invalid`});
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }
})

empRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id} = req.params;
    let employe = await empModel.findOne({_id:id});
    try {
        if(employe){
            let empDelete = await empModel.findByIdAndDelete({_id:id});
            res.status(200).send({msg:"Deleted Successfully",empDelete});
        }else{
            res.status(400).send({msg:`This ${id} is invalid`});
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }
})

module.exports = {empRouter};