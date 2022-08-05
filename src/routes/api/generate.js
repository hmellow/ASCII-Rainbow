import { imgGen } from '$lib/imageProcessing/merger.js'


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  let output = await request.formData();
  let input = output.get("inputString");
  let fnRet = await imgGen(input);

    return {
      status: 303,
      headers: {
        location: `/?imgPath=${fnRet}`,
        'access-control-allow-origin': '*'
      },
      body: {
        imgPath: fnRet
      }
    };
  }
