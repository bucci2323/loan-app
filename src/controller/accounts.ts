import { Request, Response } from 'express';
import Account from '../models/accounts';  

// Get all accounts
export const getAccounts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const accounts = await Account.findAll();
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching accounts.' });
  }
};

// Get a single account by ID
export const getAccountById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the account.' });
  }
};

// Create a new account
export const createAccount = async (req: Request, res: Response): Promise<Response> => {
  const { userID, accountNumber, balance, openDate, accountStatus, investmentFlag, savingsFlag } = req.body;

  try {
    const newAccount = await Account.create({
      userID,
      accountNumber,
      balance,
      openDate,
      accountStatus,
      investmentFlag,
      savingsFlag,
    });
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the account.' });
  }
};

// Update an existing account
export const updateAccount = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { userID, accountNumber, balance, openDate, accountStatus, investmentFlag, savingsFlag } = req.body;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.update({
      userID,
      accountNumber,
      balance,
      openDate,
      accountStatus,
      investmentFlag,
      savingsFlag,
    });

    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the account.' });
  }
};

// Delete an account
export const deleteAccount = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the account.' });
  }
};
