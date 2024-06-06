import './globals.css'
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Be Like Pedro',
    description: 'Be like Pedro the Raccoon',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
        {children}
        </>
    )
}