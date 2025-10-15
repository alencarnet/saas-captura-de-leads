import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { leadId, leadEmail, leadName, contractTemplate } = await request.json()

    console.log("[v0] Sending contract via Clicksign to:", leadEmail)

    const clicksignApiKey = process.env.CLICKSIGN_API_KEY

    if (!clicksignApiKey) {
      console.log("[v0] Clicksign API key not configured, simulating send")
      return NextResponse.json({
        success: true,
        documentId: `sim_doc_${Date.now()}`,
        status: "pending",
        signUrl: "https://app.clicksign.com/sign/demo",
      })
    }

    // Step 1: Create document
    const createDocResponse = await fetch("https://api.clicksign.com/v1/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clicksignApiKey}`,
      },
      body: JSON.stringify({
        document: {
          path: `/contracts/${contractTemplate}.pdf`,
          template: {
            data: {
              client_name: leadName,
              client_email: leadEmail,
            },
          },
        },
      }),
    })

    const docData = await createDocResponse.json()

    if (!createDocResponse.ok) {
      throw new Error(docData.errors?.[0] || "Clicksign document creation error")
    }

    const documentKey = docData.document.key

    // Step 2: Create signer
    const createSignerResponse = await fetch(`https://api.clicksign.com/v1/documents/${documentKey}/signers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clicksignApiKey}`,
      },
      body: JSON.stringify({
        signer: {
          email: leadEmail,
          name: leadName,
          documentation: "",
          birthday: "",
          has_documentation: false,
          phone_number: "",
          auths: ["email"],
        },
        sign_as: "sign",
      }),
    })

    const signerData = await createSignerResponse.json()

    if (!createSignerResponse.ok) {
      throw new Error(signerData.errors?.[0] || "Clicksign signer creation error")
    }

    console.log("[v0] Contract sent successfully via Clicksign")

    // Save to database
    // await db.contracts.create({
    //   leadId,
    //   clicksignDocumentId: documentKey,
    //   status: 'pending',
    //   sentAt: new Date()
    // })

    return NextResponse.json({
      success: true,
      documentId: documentKey,
      status: "pending",
      signUrl: signerData.signer.sign_url,
    })
  } catch (error) {
    console.error("[v0] Clicksign error:", error)
    return NextResponse.json({ error: "Failed to send contract" }, { status: 500 })
  }
}
