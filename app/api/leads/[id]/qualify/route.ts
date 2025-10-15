import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()

  // In a real app, this would update the database
  return NextResponse.json({
    success: true,
    message: `Lead ${params.id} marcado como ${status}`,
    leadId: params.id,
    newStatus: status,
  })
}
