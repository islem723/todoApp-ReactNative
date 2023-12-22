import express from 'express';
import {
	getAllCategories,
	createCategory,
	deleteCategory,
	upateCategory,
	getCategoryById,
} from '../Controllers/categoryC';

const categoryRoutes = express.Router();

categoryRoutes.route('/create').post(createCategory);

categoryRoutes.route('/').get(getAllCategories);
categoryRoutes.route('/:id').get(getCategoryById);
categoryRoutes.route('/delete/:id').delete(deleteCategory);
categoryRoutes.route('/update').put(upateCategory);

export default categoryRoutes;
