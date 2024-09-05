import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PvEPa00nfg5PEF0MjpoHYT3Fo8xtnLYuPZifXRlgZp8if14WMENRTZmWQp4cTgws6HeRuZOEjfr9IWVgsIlwVul009PS43Feo")
const endpointSecret = "whsec_47LtmrF23KeimNVHhAHNljhxbNUVO5Gq"

export function POST(request){

    const body = request.text()
    const headerList = headers()
    const sig = headerList.get('stripe-signature')

    let event

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)

    console.log("WH RECIEVED")

    return NextResponse.json("Recieving data")
}