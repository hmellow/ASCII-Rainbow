import { imgGen } from '$lib/Scraping/pageScraper.js'


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    return {
      status: 200,
      headers: {
        'access-control-allow-origin': '*'
      },
      body: {
        imgPath: imgGen()
      }
    };
  }
