/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request }) {
    return {
        status: 200,
        headers: {
            location: "/",
            'access-control-allow-origin': '*'
        },
        body: {

        }
    };
}
