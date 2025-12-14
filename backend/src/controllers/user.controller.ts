import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select('-password');
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Username, email and password are required'
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'customer'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    if (error.code === 11000) {
      const field = error.keyPattern?.email ? 'email' : 'username';
      res.status(409).json({
        success: false,
        message: `This ${field} already exists`
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to create user'
      });
    }
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['admin', 'customer'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Invalid role. Must be admin or customer'
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'User role updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user role'
    });
  }
};