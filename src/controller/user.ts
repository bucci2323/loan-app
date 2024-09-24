import { Request, Response } from 'express';
import  User  from '../models/user';  

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, middleName, lastName, email, dateOfBirth, street, city, state, phoneNumber } = req.body;
  if(!firstName || !middleName|| !lastName || !email  || !street || !city || !state || !phoneNumber){
    return res.status(400).json({ error: 'please fill in all your details !!' })
  }

  try {
    const newUser = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      dateOfBirth,
      street,
      city,
      state,
      phoneNumber,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { firstName, middleName, lastName, email, dateOfBirth, street, city, state, phoneNumber } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({
      firstName,
      middleName,
      lastName,
      email,
      dateOfBirth,
      street,
      city,
      state,
      phoneNumber,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};
