const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose
    .connect('mongodb+srv://elenikehrioti:eleni2003@cluster0.kscqz9i.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));
