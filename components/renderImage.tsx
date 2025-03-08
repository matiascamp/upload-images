import Image from "next/image"
import ImageActions from "./imageactions";

type RenderImageProps = {
    dropZoneStates: {
        imageUrl: string | null
        displayName: string
    }
}

export default function RenderImage({ dropZoneStates }: RenderImageProps) {

    const { imageUrl, displayName } = dropZoneStates

    return (
        <>
            {imageUrl && (
                <div className="flex flex-col items-center">
                    <div className="bg-customBackground rounded-lg p-2 w-150 h-90 shadow-xl">
                        <Image className="rounded-lg w-full max-h-85 h-full" src={imageUrl} alt="Uploaded Image" width={500} height={500} />
                    </div>
                    <ImageActions imageUrl={imageUrl} displayName={displayName} />
                </div>
            )}
        </>
    );
}