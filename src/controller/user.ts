import User  from '../models/user';
import { RequestHandler } from "express";
import validator from "validator";
// import { Subscription } from '../../models/subcription';
// import Joi from "joi";
// import jwt from "jsonwebtoken";

// import { hashPassword, comparePasswords } from "../../middleware/passwordutils";


interface UserRequestBody {
    firstName:string;
    middleName:string;
    lastName:string
    email:string
    dateOfBirth: Date
    street:string
    city:string
    state:string
    phoneNumber:string
}


// register 
export const createUser: RequestHandler<UserRequestBody> = async (
  req,
  res,
  next
) => {
  try {
    const { firstName, middleName, lastName, email, dateOfBirth, street, city, state, phoneNumber } = req.body;


    if (!firstName || !middleName || !lastName  || !email || !dateOfBirth || !street || !city || !state || !phoneNumber) {
      return res.status(400).json({ message: "Missing field, please fill in your details!" });
    }

    // if (subscriptionId) {
    //     const subscription = await Subscription.findByPk(subscriptionId);
    //     if (!subscription) {
    //       return res.status(400).json({ message: 'Invalid subscription ID' });
    //     }
    //   }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "This user exists" });
    }


    const user = await User.create({ firstName, lastName, middleName , email, state , street , city , phoneNumber , dateOfBirth});
    console.log(`User created: ${user}`);


    return res.status(201).json({ user });
  } catch (err) {
    console.log("Error ----->", err);
    return res.status(400).json({ message: "User is not valid" });
  }
};

