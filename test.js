const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((re) => console.log("Connted Successfully"))
  .catch((err) => console.log(err, "Error in the database"));

const Author = mongoose.model(
  "author",
  new mongoose.Schema({
    name: String,
    website: String,
    bio: String,
  })
);

const Customer = mongoose.model(
  "customer",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
   
  })
);

const createAuthor = async (name, website, bio) => {
  const author = await new Author({
    name: name,
    website: website,
    bio: bio,
  });

  const result = await author.save();
  console.log(result);
};

const createCustomer = async (name, author) => {
  const customer = await new Customer({
    name: name,
    author: author,
  });

  const result = await customer.save();
  console.log(result);
};

const listCustomer = async ()=> {
  const customer = await Customer.find().populate("author", " name bio").sort("name");
  
 

  console.log(customer);
}
//  createAuthor("Aaron", "https://maxinx.com", "ng");
//  createCustomer("John", "628494841a1b64c0312072b7");
// listCustomer();