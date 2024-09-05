import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PvEPa00nfg5PEF0MjpoHYT3Fo8xtnLYuPZifXRlgZp8if14WMENRTZmWQp4cTgws6HeRuZOEjfr9IWVgsIlwVul009PS43Feo")
const endpointSecret = "whsec_47LtmrF23KeimNVHhAHNljhxbNUVO5Gq"

export async function POST(request){

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

    switch(event.type){
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object
            console.log({ checkoutSessionCompleted });
            break;
        default:
            console.log(`Event not handled: ${event.type}`)
    }

    console.log("WH RECIEVED")

    return new Response(null, { status: 200 })
}