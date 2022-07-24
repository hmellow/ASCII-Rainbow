import { imgGen } from '$lib/Scraping/pageScraper.js'
import { request } from 'playwright';


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  let output = await request.formData();
  let input = output.get("inputString");

    return {
      status: 200,
      headers: {
        'access-control-allow-origin': '*'
      },
      body: {
        imgPath: await imgGen(input)
      }
    };
  }
