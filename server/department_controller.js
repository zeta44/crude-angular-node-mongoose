var express = require('express');
var router = express.Router();
var Department = require('./department');


router.post('/', (req, res)=>{
    let dep = new Department({
        name:req.body.name
    })

    dep.save((err, d)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(d);
        }
    })
})


router.get('/', (req, res)=>{
    Department.find().exec((err, deps)=>{
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(deps);
        }
    })
})

router.delete('/:id', async (req, res)=>{
    try {
        let id = req.params.id;

        await Department.deleteOne({_id:id})
        res.status(200).send({});
        
    } catch (err) {
        res.status(500).send({msg:'Erro interno', error: err});
    }
})


router.patch('/:id', async (req, res)=>{
    Department.findById(req.params.id, (err, dep)=>{
        if (err) {
            res.status(500).send(err);
        }
        else{
            if (!dep) {
                res.status(404).send({dep});
            }
            else{
                dep.name = req.body.name;
                dep.save()
                .then((d)=> res.status(200).send(d))
                .catch((d)=> res.status(500).send(e))

                
            }
            // res.status(200).send(dep);
        }
    })
})

module.exports = router

