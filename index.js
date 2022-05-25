const express = require("express");
const { use } = require("express/lib/application");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Buyer = require("./models/Buyer");
const Product = require("./models/Product");
const Receipt = require("./models/Receipt");

async function getUserInfo() {
  const users = await Buyer.find();
  const products = await Product.find();
  const receipts = await Receipt.find();
  let userabove20,
    userAboveAndEqual23,
    userBelow21,
    userAgeIs20or30 = [];

  let userEmail = [];
  let maleUser = [];
  let userName1 = [];
  let userName2 = [];
  let noPhone = [];
  let noEmail = [];
  let phone034 = [];
  let userReceipt = [];
  let correctProduct = [];
  let max8gbRAM = [];
  users.forEach((user) => {
    if (user.age > 20) {
      userabove20.push(JSON.stringify(user));
    }
    if (user.age >= 23) {
      userAboveAndEqual23.push(JSON.stringify(user));
    }
    if (user.age <= 20) {
      userBelow21 += user.firstName + " " + user.lastName;
    }
    if (user.age == 20 || user.age == 30) {
      userAgeIs20or30.push(JSON.stringify(user));
    }
    if (user.email) {
      let emailDomain = user.email.split("@")[1];
      if (emailDomain == "donga.edu.vn") {
        userEmail.push(JSON.stringify(user));
      }
    }
    if (user.gender == "male") {
      maleUser.push(JSON.stringify(user));
    }

    if (user.firstName == "Vân" || user.firstName == "Văn") {
      userName1.push(JSON.stringify(user));
    }
    if (user.firstName == "Ngoc" && user.gender == "male") {
      userName2.push(JSON.stringify(user));
    }

    if (!user.phoneNumber) {
      noPhone.push(JSON.stringify(user));
    }
    if (!user.email) {
      noEmail.push(JSON.stringify(user));
    }
    if (user.phoneNumber.startsWith("034")) {
      phone034.push(JSON.stringify(user));
    }
    let count = 0;
    receipts.forEach((receipt) => {
      if (receipt.buyerId == user._id) {
        count += 1;
        if (count > 3) {
          userReceipt.push(JSON.stringify(user));
        }
      }
    });
  });
  products.forEach((product) => {
    if (product.brand == "asus" && product.RAM == 8) {
      correctProduct.push(JSON.stringify(product));
    }
    if (product.brand == "levono" && product.RAM == 16) {
      correctProduct.push(JSON.stringify(product));
    }

    if (product.RAM == 8 && product.maxRAM == 8) {
      max8gbRAM.push(JSON.stringify(product));
    }
  });
  return {
    question1: `Buyer age > 20 : ${userabove20}`,
    question2: `Buyer age >= 23 : ${userAboveAndEqual23}`,
    question3: `Buyer age <= 20 : ${userBelow21}`,
    question4: `Buyer age = 20 or 30 : ${userAgeIs20or30}`,
    question5: `Buyer's email end with donga.edu.com : ${userEmail}`,
    question6: `Male Buyer : ${maleUser}`,
    question7: `Buyer's name is Van : ${userName1}`,
    question8: `Buyer's name is Ngoc and is a male : ${userName2}`,
    question9: `Products with max 8GB RAM : ${max8gbRAM}`,
    question10: `Buyer with no phone : ${noPhone}`,
    question11: `Buyer with no email : ${noEmail}`,
    question12: `Buyer's phone start with 034 : ${phone034}`,
    question13: `Products ASUS 8GB RAM || LEVONO 16GB RAM : ${correctProduct}`,
    question14: `Buyer buy more than 3 products : ${userReceipt}`,
  };
}

app.listen(8080, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/new").then(async () => {
    console.log(await getUserInfo());
  });
});
