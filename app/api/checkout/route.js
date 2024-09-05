import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PvEPa00nfg5PEF0MjpoHYT3Fo8xtnLYuPZifXRlgZp8if14WMENRTZmWQp4cTgws6HeRuZOEjfr9IWVgsIlwVul009PS43Feo")

export async function POST(request) {

    const { name, price, quantity} = await request.json()

    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/success",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name,
                        images: ["https://www.tradeprint.co.uk/dam/jcr:cfdb2af1-7b39-483a-8fce-f665c63b5222/Heavy%20Cotton%20T-Shirt%20Black.webp",
                            "https://cdn.engelbert-strauss.co.uk/assets/pdp/images/Original/product/5.Release.3100031/e_s_T-shirt_cotton-8055-3-637868075121106469.png"]
                    },
                    unit_amount: price,
                },
                quantity: quantity,
            }
        ],
        mode: "payment",
    })

    return NextResponse.json(session)
}