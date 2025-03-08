import React from 'react';

const InfiniteLoadingBar = () => {
  return (
    <div className=" bg-customBackground w-full max-w-xl mx-auto py-10 px-30 rounded-lg shadow-xl">
      <p className="text-center w-auto mb-4 text-sm text-customColorFont"><strong>Uploading,</strong>please wait...</p>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{
            width: '20%',
            animation: 'moveInfinite 1.5s linear infinite'
          }}
        />
      </div>
      <style jsx>{`
        @keyframes moveInfinite {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(500%);
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteLoadingBar;