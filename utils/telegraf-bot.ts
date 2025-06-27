import type { Context as TelegrafContext } from 'telegraf';
import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN;

export const bot = BOT_TOKEN ? new Telegraf(BOT_TOKEN) : null;

if (bot) {
  bot.start((ctx: TelegrafContext) => ctx.reply('Welcome to TG Subtracker!'));
} 