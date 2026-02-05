import { Router } from 'express';
import { getMyProfile, updateProfile, deployPage, getUserProfile, getUserLikes, getUserFavorites } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../utils/upload';

const router = Router();

// Protected Routes (Static paths first)
router.get('/profile/me', authMiddleware, getMyProfile);
router.put('/profile/me', authMiddleware, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), updateProfile);
router.post('/deploy', authMiddleware, upload.single('htmlFile'), deployPage);

// Public Routes (Parameterized paths last)
router.get('/:identifier/profile', getUserProfile);
router.get('/:id/likes', getUserLikes);
router.get('/:id/favorites', getUserFavorites);

export default router;
