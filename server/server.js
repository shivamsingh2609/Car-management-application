
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); 
const cors = require("cors");



const userRoutes = require('./routes/user'); 
const carRoutes = require('./routes/car');  
const imageRoutes = require('./routes/image'); 

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/', imageRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
