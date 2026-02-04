import { Request, Response, NextFunction } from 'express';
import { getSmtpConfig, updateSmtpConfig, getCaptchaConfig, updateCaptchaConfig, getPagesConfig, updatePagesConfig, getSiteConfig, updateSiteConfig, getModerationConfig, updateModerationConfig } from '../services/configService';

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const smtp = await getSmtpConfig();
    const captcha = await getCaptchaConfig();
    const pages = await getPagesConfig();
    const site = await getSiteConfig();
    const moderation = await getModerationConfig();
    res.json({ success: true, data: { smtp, captcha, pages, site, moderation } });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { smtp, captcha, pages, site, moderation } = req.body;
    if (smtp) {
      await updateSmtpConfig(smtp);
    }
    if (captcha) {
      await updateCaptchaConfig(captcha);
    }
    if (pages) {
      await updatePagesConfig(pages);
    }
    if (site) {
      await updateSiteConfig(site);
    }
    if (moderation) {
      await updateModerationConfig(moderation);
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Public config endpoint (no sensitive data)
export const getPublicConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const smtp = await getSmtpConfig();
    const captcha = await getCaptchaConfig();
    
    res.json({
      success: true,
      data: {
        smtpEnabled: smtp.enabled,
        captchaEnabled: captcha.enabled,
        captchaProvider: captcha.provider,
        captchaSiteKey: captcha.siteKey,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicSiteConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const site = await getSiteConfig();
    res.json({ success: true, data: site });
  } catch (error) {
    next(error);
  }
};
