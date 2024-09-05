import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY)
const endpointSecret = process.env.ENDPOINT_SECRET

export async function POST(request) {

    const body = await request.text()
    const headersList = headers()
    const sig = headersList.get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (error) {
        console.log(error)
        console.log("EWEEEE AQUI ES")
        return NextResponse.json({ error: error.message }, { status: 400 })

    }

    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object
            console.log({ checkoutSessionCompleted });
            console.log(
                "Consultado producto con id",
                checkoutSessionCompleted.metadata.productId
            );
            break;
        default:
            console.log(`Event not handled: ${event.type}`)
    }

    console.log("WH RECIEVED")

    return new Response(null, { status: 200 })
}