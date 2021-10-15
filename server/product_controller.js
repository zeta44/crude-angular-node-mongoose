var express = require('express');
var router = express.Router();
var Product = require('./product');


router.post('/', (req, res)=>{
    let pro = new Product({
        name:req.body.name
    })

    pro.save((err, d)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(d);
        }
    })
})


router.get('/', (req, res)=>{
    Product.find().exec((err, deps)=>{
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

        await Product.deleteOne({_id:id})
        res.status(200).send({});
        
    } catch (err) {
        res.status(500).send({msg:'Erro interno', error: err});
    }
})


router.patch('/:id', async (req, res)=>{
    Product.findById(req.params.id, (err, pro)=>{
        if (err) {
            res.status(500).send(err);
        }
        else{
            if (!pro) {
                res.status(404).send({pro});
            }
            else{
                pro.name = req.body.name;
                pro.save()
                .then((d)=> res.status(200).send(d))
                .catch((d)=> res.status(500).send(e))

                
            }
            // res.status(200).send(pro);
        }
    })
})

module.exports = router

