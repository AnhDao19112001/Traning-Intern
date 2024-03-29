import express from 'express';
import {getAllType} from '../controller/typeController.js';

const router = express.Router();
router.get('/',getAllType);
export default router