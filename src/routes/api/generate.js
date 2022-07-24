import { imgGen } from '$lib/imageProcessing/merger.js'


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  let output = await request.formData();
  let input = output.get("inputString");

    return {
      status: 303,
      headers: {
        location: '/'
      },
      body: {
        imgPath: await imgGen(input)
      }
    };
  }
