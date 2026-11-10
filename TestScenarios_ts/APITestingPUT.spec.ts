import { test, expect, request } from '@playwright/test';

test('API Testing Put', async ({ request }) => {

    const response = await request.put('/booking/3', {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        },
        data: {
            "firstname": "Prathap",
            "lastname": "Poola Test",
            "totalprice": 143,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }

    })

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.statusText()).toBe('OK');

    expect(responseBody).toMatchObject({

        "firstname": "Prathap",
        "lastname": "Poola Test",
        "totalprice": 143,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"



    })
})