const Car = require('../models/Car');
const fs = require("fs");
const Image = require('../models/Image');

exports.createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.fields;
        const images = req.files.images;

        console.log(images)
        
        const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');
       

        const imageDocs = [];

        
        const normalizedImages = Array.isArray(images) ? images : [images];

        for (const image of normalizedImages) {
            const newImg = new Image({});
            console.log("newImg", newImg);

            
            newImg.image.data = fs.readFileSync(image.path);
            newImg.image.contentType = image.type;
            newImg.imageName = image.name;

           
            await newImg.save();

            
            imageDocs.push(newImg._id);
        }

        


     
        const car = new Car({
            title,
            description,
            tags: parsedTags,
            images: imageDocs,  
            user: req.user._id
        });

        await car.save();
        res.status(201).send({
            success: true,
            message: "Car created successfully",
            car,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in creating car",
            error,
        });
    }
};

exports.getCars = async (req, res) => {
    try {
        const { keyword } = req.query;
        const query = { user: req.user._id };

        
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ];
        }

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, tags } = req.fields;
        const images = req.files?.images;

       
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).send({ success: false, message: "Car not found" });
        }

        
        const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');

        
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = parsedTags;

       
        if (images) {
            const imageDocs = [];
            const normalizedImages = Array.isArray(images) ? images : [images];

            for (const image of normalizedImages) {
                const newImg = new Image({});
                newImg.image.data = fs.readFileSync(image.path);
                newImg.image.contentType = image.type;
                newImg.imageName = image.name;

               
                await newImg.save();
                imageDocs.push(newImg._id);
            }

           
            car.images = [...car.images, ...imageDocs];
        }

       
        await car.save();

        res.status(200).send({
            success: true,
            message: "Car updated successfully",
            car,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating car",
            error,
        });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
