import express from 'express';

import {
  signup,
  login,
  getUser,
  changePassword,
  deleteUser,
} from '../../controllers/authControllers/index.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { resStatus, resMessage, token } = await signup(req);
    if (resStatus === 200 && token) {
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    }
    res.status(resStatus).json(resMessage);
  } catch (err) {
    console.log('Signup Error: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { resStatus, resMessage, token } = await login(req);
    if (resStatus === 200 && token) {
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    }
    res.status(resStatus).json(resMessage);
  } catch (err) {
    console.log('Login Error: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      sameSite: 'strict', // match login
      secure: false,      // dev me false
      expires: new Date(0), // immediately expire
    });
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    console.log('Logout Error: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});


router.post('/changepassword', async (req, res) => {
  try {
    const { resStatus, resMessage } = await changePassword(req);
    res.status(resStatus).json(resMessage);
  } catch (err) {
    console.log('ChangePassword error: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});

router.get('/getuser', async (req, res) => {
  try {
    const { resStatus, resMessage } = await getUser(req);
    res.status(resStatus).json(resMessage);
  } catch (err) {
    console.log('GetUser error: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});

router.delete('/deleteUser', async (req, res) => {
  try {
    const { resStatus, resMessage } = await deleteUser(req);
    res.status(resStatus).json(resMessage);
  } catch (err) {
    console.log('User Deletion Failed: ', err);
    res.status(500).json({ success: false, message: 'Internal Server error.' });
  }
});

export default router;
