'use client'

export default function Home() {

  const handlePurchase = async () => {

    const res = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify({
        name: "T-shirt Real Madrid",
        price: 10000,
        quantity: 1,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const session = await res.json()
    window.location = session.url
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Product to purchase</h1>
        <button onClick={handlePurchase} className="bg-gray-200">purchase</button>
      </div>
    </main>
  );
}
