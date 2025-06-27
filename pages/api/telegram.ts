import type { NextApiRequest, NextApiResponse } from 'next';
import { bot } from '../../utils/telegraf-bot';

// Disable Next.js body parsing, Telegraf needs the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!bot) {
    res.status(500).send('Bot not initialized');
    return;
  }
  // Telegraf webhook callback
  // @ts-ignore
  return bot.webhookCallback('/api/telegram')(req, res);
} 