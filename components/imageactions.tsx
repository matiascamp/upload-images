import Image from "next/image"
import Filesaver from "file-saver"

type ImageActionsProps = {
    imageUrl: string
    displayName: string
}

const ImageActions = ({ imageUrl, displayName }: ImageActionsProps) => {


    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Share image",
                url: imageUrl
            })
        } else {
            navigator.clipboard.writeText(imageUrl)
                .then(() => alert("Image URL copied to clipboard"))
                .catch(error => console.error('Error copying URL:', error))
        }
    }

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Filesaver.saveAs(imageUrl, displayName)
    }

    return (
        <div className="flex m-5 gap-4">
            <button className="flex rounded-lg py-2 px-4 gap-2 items-center cursor-pointer bg-blue-500" onClick={handleShare}>
                <Image src="/Link.svg" alt="share logo" width={20} height={20} />
                <p className="text-white text-xs">Share</p>
            </button>
            <button className="flex rounded-lg py-2 px-4 gap-2 items-center cursor-pointer bg-blue-500" onClick={handleDownload}>
                <Image src="/download.svg" alt="download logo" width={20} height={20} />
                <p className="text-white text-xs">Download</p>
            </button>
        </div>
    )
}

export default ImageActions