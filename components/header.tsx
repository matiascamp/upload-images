
import ThemeToggle from "./themeToggle"
import Image from "next/image"

export default function PageHeader() {
    return (
        <header className="pageHeader">
            <div className="headerContainer">
                <span>
                    <Image className="text-customColorFont" src='/logo.svg' alt="" width={150} height={50} />
                </span>
                <ThemeToggle />
            </div>
        </header>
    )
}