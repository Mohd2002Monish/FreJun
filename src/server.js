const express = require("express");
const UserModel = require("./Model/student.model");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const mongo = require("mongodb");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/api/tables", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while retrieving the users",
    });
  }
});
app.get("/api/tables/:userid", async (req, res) => {
  const id = req.params.userid;

  try {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .send({ error: "User not found" });
    }

    return res.send(user);
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while retrieving the user",
    });
  }
});
app.post("/api/tables", async (req, res) => {
  const {
    name,
    grade,
    email,
    roll_number,
    subjects,
    total_marks,
  } = req.body;

  try {
    const user = new UserModel({
      name,
      grade,
      email,
      roll_number,
      subjects,
      total_marks,
    });

    await user.save();

    return res
      .status(201)
      .send({ msg: "User created successfully" });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the user",
    });
  }
});
app.delete("/api/tables/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await UserModel.deleteOne({ email: id });
    return res.send({ msg: "Student Removed" });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while deleting the user.",
    });
  }
});
app.patch("/api/tables/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    grade,
    email,
    roll_number,
    subjects,
    total_marks,
  } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ error: "User not found" });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (grade) {
      user.grade = grade;
    }

    if (roll_number) {
      user.roll_number = roll_number;
    }

    if (subjects) {
      user.subjects = subjects;
    }

    if (total_marks) {
      user.total_marks = total_marks;
    }

    await user.save();

    return res
      .status(200)
      .send({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while updating the user",
    });
  }
});
mongoose
  .connect(
    "mongodb+srv://mohdmonish:123@cluster0.lm1amsh.mongodb.net/freJun"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("server started ");
    });
  });
