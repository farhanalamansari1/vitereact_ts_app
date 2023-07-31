const express=require('express')
const router=express.Router();
var fetchuser= require('../middleware/fetchuser')
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');
// Route1:Get all notes. using http://localhost:5000/api/auth/fetchallnotes Login required
router.get('/fetchallnotes',fetchuser,async(req,resp)=>{
    try{
    const notes=await Notes.find({user: req.user.id})
    resp.json(notes)

    }
    catch(error){
        console.log(error.message)
        resp.status(500).send("Internal Server Error occured")
    }
})

// Route2:create a note using http://localhost:5000/api/auth/createnote Login required
router.post('/addnote',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"Enter a valid description").isLength({min:10}),
    body('tag',"Enter a valid tag").isLength({min:3})

],async(req,resp)=>{
    try{
    
    const {title,description,tag}=req.body;
     //if there are errors, return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return resp.status(400).json({ errors: errors.array() });
         }
         const note=new Notes({
            title,description,tag,user:req.user.id
         })
         const saveNote=await note.save()
    
    resp.json(saveNote)
}
catch(error){
    console.log(error.message)
    resp.status(500).send("Internal Server Error occured")
}})



// Route3:create a note using http://localhost:5000/api/notes/updatenote:id Login required
router.put('/updatenote/:id',fetchuser,async(req,resp)=>{
    try{
        const {title,description,tag}=req.body;
        //create note object
        const newnote={};
        if(title){
            newnote.title=title
        }
        if(description){
            newnote.description=description
        }
        if(tag){
            newnote.tag=tag
        }
        //find the note
        let note=await Notes.findById(req.params.id)
        if(!note){
            return resp.status(404).send("not found")
        }
    
        if(note.user.toString() !==req.user.id){
            return resp.status(401).send("not allowed")
        }
        note=await Notes.findByIdAndUpdate(req.params.id, {$set: newnote},{new:true})
        resp.json({note})

    }
    catch(error){
        console.log(error.message)
        resp.status(500).send("Internal Server Error occured")
    }})



    // Route4 :delete a note using http://localhost:5000/api/notes/deletenote:id Login required
router.delete('/deletenote/:id',fetchuser,async(req,resp)=>{
    try{
       
        //find the note
        let note=await Notes.findById(req.params.id)
        if(!note){
            return resp.status(404).send("not found")
        }
    
        if(note.user.toString() !==req.user.id){
            return resp.status(401).send("not allowed")
        }
        note=await Notes.findByIdAndDelete(req.params.id)
        resp.json({"Success":"note has been deleted",note:note})

    }
    catch(error){
        console.log(error.message)
        resp.status(500).send("Internal Server Error occured")
    }})
module.exports=router;  