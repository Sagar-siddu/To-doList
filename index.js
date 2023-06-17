//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://srutisagar7002:srutisagar7002@cluster0.og7qgvl.mongodb.net/todolistDB');

const itemSchema = {
  name: String
};
const Item= mongoose.model("Item",itemSchema);

const item1 = new Item({
  name : "Welcome To Your To-Do List!"
});
const item2 = new Item({
  name : "Hit + to add a new item."
})
const item3 = new Item({
  name : "<-- Hit this to delete an item. "
})

const defaults = [item1,item2,item3];



app.get("/", function(req, res) {

  async function getListItems() {
    try {
      const foundItems = await Item.find({});
      if(foundItems.length===0){
       Item.insertMany(defaults)
       re.redirect("/");
      }

      else{
      res.render("list", { listTitle: "Today", newListItems: foundItems });
      }

    } catch (error) {
      console.error(error);
    }
  }

  getListItems();



});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name : itemName
  })
  item.save();
  res.redirect("/");
});
app.post("/delete", function(req,res){
  const checkedItem = req.body.checkbox;

async function removeItem() {
  try {
    const removedItem = await Item.findByIdAndRemove(checkedItem);
    console.log("Successfully Removed The Checked Item.");
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
}
removeItem();
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
