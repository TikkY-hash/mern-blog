import cron from 'node-cron';
import Parser from 'rss-parser';
import Article from '../models/Article.js';

const parser = new Parser();

const parseAndSaveArticles = async () => {
  try {
    const feed = await parser.parseURL(process.env.PARSE_URL || '');

    await Promise.all(
      feed.items.map(async (item) => {
        const existingArticle = await Article.findOne({ title: item.title });

        if (!existingArticle) {
          const doc = new Article({
            title: item.title,
            description: item.contentSnippet,
            image: item.enclosure?.url,
            creator: item.creator,
          });
          await doc.save();
        }
      }),
    );
    console.log('Articles parsed and saved successfully.');
  } catch (error) {
    console.error('Error parsing and saving articles:', error);
  }
};

const CRON_SCHEDULE = '0 * * * *';
cron.schedule(CRON_SCHEDULE, parseAndSaveArticles);
