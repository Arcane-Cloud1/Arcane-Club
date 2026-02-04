import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import fs from 'fs';
import path from 'path';

// Get Current User Profile (Private)
export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatar: true,
        bio: true,
        backgroundImage: true,
        customPagePath: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Update Profile (Private)
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const { username, bio } = req.body;
    
    const updateData: any = {};
    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;

    // Handle File Uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files?.avatar?.[0]) {
      updateData.avatar = `/uploads/${files.avatar[0].filename}`;
    }
    
    if (files?.backgroundImage?.[0]) {
      updateData.backgroundImage = `/uploads/${files.backgroundImage[0].filename}`;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        backgroundImage: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Deploy Page (Private)
export const deployPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No HTML file uploaded' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Determine user identifier for folder (username or id)
    const userFolder = user.username || user.id;
    const targetDir = path.join(process.cwd(), 'public/pages', userFolder);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Move file to target directory as index.html
    const targetPath = path.join(targetDir, 'index.html');
    fs.renameSync(req.file.path, targetPath);

    const publicPath = `/pages/${userFolder}/index.html`;

    await prisma.user.update({
      where: { id: userId },
      data: { customPagePath: publicPath },
    });

    res.json({ success: true, data: { url: publicPath } });
  } catch (error) {
    next(error);
  }
};

// Get Public User Profile
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = req.params; // id or username

    // Try finding by ID first, then username
    let user = await prisma.user.findUnique({
      where: { id: identifier },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        backgroundImage: true,
        customPagePath: true,
        createdAt: true,
        posts: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
            board: { select: { name: true, slug: true } }
          }
        }
      },
    });

    if (!user) {
        const users = await prisma.user.findMany({
            where: { username: identifier },
            take: 1,
             select: {
                id: true,
                username: true,
                avatar: true,
                bio: true,
                backgroundImage: true,
                customPagePath: true,
                createdAt: true,
                posts: {
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    board: { select: { name: true, slug: true } }
                }
                }
            },
        });
        if (users.length > 0) user = users[0];
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUserLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const likes = await prisma.postLike.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            board: { select: { name: true, slug: true } }
          }
        }
      }
    });
    
    // Map to return posts
    const posts = likes.map(like => like.post);
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getUserFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const favorites = await prisma.favorite.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            board: { select: { name: true, slug: true } }
          }
        }
      }
    });

    // Map to return posts
    const posts = favorites.map(fav => fav.post);
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};
