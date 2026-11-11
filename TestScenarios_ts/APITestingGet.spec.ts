import { test, expect, request } from '@playwright/test';


let reqcontext2: any;

test.beforeAll("Before All Tests", async () => {
    reqcontext2 = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            'Accept': 'application/json'
        }
    });
})


test('API Testing Get', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Accept': 'application/json'
        }
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe('OK');
    console.log("Prathap")
});


test('API Testing Get Practice 2', async () => {

    const reqcontext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',

        extraHTTPHeaders: {
            'Accept': 'application/json'

        }

    });

    const response1 = await reqcontext.get('/booking');
    console.log(await response1.json());

});

test('API Testing Get Practice 3', async () => {

    const response2 = await reqcontext2.get('/booking');
    console.log(await response2.json());

});


test('API Testing Get Practice 4', async ({ request }) => {
    const bookingsResponse = await request.get('/booking');
    expect(bookingsResponse.ok()).toBeTruthy();

    const bookings: { bookingid: number }[] = await bookingsResponse.json();
    expect(bookings.length).toBeGreaterThan(0);

    const response3 = await request.get(`/booking/${bookings[0].bookingid}`);
    expect(response3.ok()).toBeTruthy();
    console.log(await response3.json());
});

test('API Testing Get Practice 5', async ({ request }) => {

    const response5 = await request.get('/booking?firstname=John&lastname=Smith');
    console.log(await response5.json());
    console.log(response5.status(), await response5.text());
});

test('API Testing Get Practice 6', async ({ request }) => {

    const response6 = await request.get('/booking', {

        params: {
            firstname: 'John',
            lastname: 'Smith'
        }

    });
    console.log(await response6.json());
    //  console.log(response6.status(), await response6.text());
});


test('API Testing Get Practice 7 with Assertion', async ({ request }) => {
    const response7 = await request.get('/booking/3');
    expect(response7.ok()).toBeTruthy();

    const booking = await response7.json();
    expect(booking).toEqual(expect.objectContaining({
        firstname: expect.any(String),
        lastname: expect.any(String),
        totalprice: expect.any(Number),
        depositpaid: expect.any(Boolean),
        bookingdates: expect.objectContaining({
            checkin: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
            checkout: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        }),
    }));
});


test('API with UI', async ({ request, page }) => {

    const response8 = await request.get('https://api.demoblaze.com/entries');
    const Reqres = await response8.json();
    console.log(Reqres.Items[0].title);
    console.log(Reqres.Items[0].price);

    await page.goto('https://www.demoblaze.com/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(Reqres.Items[0].title);

});  