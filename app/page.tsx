"use client"

import PageHeader from "@/components/header";
import DropzoneUploader from "@/components/dragZone";
import { useState } from "react";
import RenderImage from "@/components/renderImage";
import InfiniteLoadingBar from "@/components/loader";

type dropZoneStatesProps = {
  imageUrl: string | null;
  isUploading: boolean;
  displayName: string;
}

export default function Home() {
  const [dropZoneStates, setDropZoneStates] = useState<dropZoneStatesProps>({
    imageUrl: null,
    isUploading: false,
    displayName: ""
  })


  return (
    <div className="h-screen overflow-hidden">
      <PageHeader />
      <div className="flex items-center justify-center h-screen">
        {dropZoneStates.isUploading ? (
          <InfiniteLoadingBar />
        ) : dropZoneStates.imageUrl ? (
          <RenderImage dropZoneStates={dropZoneStates} />
        ) : (
          <DropzoneUploader
            dropZoneStates={dropZoneStates}
            setDropZoneStates={setDropZoneStates}
          />
        )}
      </div>
    </div>
  );
}
