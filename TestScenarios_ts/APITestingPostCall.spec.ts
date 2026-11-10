import { test, expect, request } from '@playwright/test';

test('API Testing Post', async ({ request }) => {

    const response = await request.post('/booking', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            "firstname": "John",
            "lastname": "Doe",
            "totalprice": 150,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2024-10-04",
                "checkout": "2025-06-26"
            }
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe('OK');

    expect(responseBody.booking).toMatchObject({


        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: '2024-10-04', checkout: '2025-06-26' }



    })

    expect(responseBody.booking.firstname).toEqual('John');
    expect(responseBody.booking.lastname).toEqual('Doe');
    expect(responseBody.booking.totalprice).toEqual(150);
    expect(responseBody.booking.depositpaid).toEqual(true);
});


test('API Testing POST call with UI', async ({ request ,page}) => {


    const response2 = await request.post('https://api.demoblaze.com/addtocart', {

        data: {
            id: "034469e0-a16d-090d-2814-d980b7304550", cookie: "user=e921c322-bade-9e8d-8bd8-27f6279f2982", flag:
                false,prod_id: 3
      }

    })
   expect(response2.status()).toBe(200);

  await page.goto('https://www.demoblaze.com/cart.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('Infotech');
  await page.locator('#loginpassword').fill('Poola@2026');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForLoadState('networkidle');


})
