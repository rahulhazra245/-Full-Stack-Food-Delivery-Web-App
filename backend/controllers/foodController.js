import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file.filename; // ✅ Only filename, no path

    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image,
    });

    await newFood.save();
    res.status(200).json({ message: "Food added successfully", food: newFood });
  } catch (error) {
    res.status(500).json({ error: "Failed to add food" });
  }
};


// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listFood, addFood, removeFood }