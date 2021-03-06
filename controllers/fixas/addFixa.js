const mongoose = require('mongoose');
const Fixa = require('../../models/fixa');
module.exports = async (req, res, next) => {
    try {
        let fixa = new Fixa({
            fixaId: mongoose.Types.ObjectId(),
            name: req.body.name,
            title: req.body.title,
            image_urls: req.body.image_urls,
            address: req.body.address,
            description: req.body.description,
            location: {
                type: 'Point',
                coordinates: [req.body.longitude, req.body.latitude],
            }
        });

        await fixa.save((err, message)=>{
            if(err){
                console.log(err);
            }
            console.log(message);
        });

        res.json({ data: fixa });

    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This fixer already exist' })
        }
        res.status(200).json({ error: 'Server error' });
    }
};