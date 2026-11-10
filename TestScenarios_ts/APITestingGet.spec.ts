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

    const response3 = await request.get('/booking/185');
    console.log(await response3.json());
    console.log(response3.status(), await response3.text());

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
    console.log(await response7.json());
    // expect(response7.status()).toBe(200);
    // expect(response7.ok()).toBeTruthy();
    expect(response7.statusText()).toBe('OK');

    expect(await response7.json()).toMatchObject({


        firstname: 'viraj',
        lastname: 'patil',
        totalprice: 988,
        depositpaid: true,
        bookingdates: { checkin: '2024-10-04', checkout: '2025-06-26' }
    })

    const response = await response7.json();
    expect(response.firstname).toBe('Mark');
    expect(response.lastname).toEqual('Wilson');


})


test('API with UI', async ({ request, page }) => {

    const response8 = await request.get('https://api.demoblaze.com/entries');
    const Reqres = await response8.json();
    console.log(Reqres.Items[0].title);
    console.log(Reqres.Items[0].price);

    page.goto('https://www.demoblaze.com/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(Reqres.Items[0].title);

});  