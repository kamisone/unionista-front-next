import React, { useRef } from 'react';

const VideoElement = () => {
    const videoRef = useRef(null);

    return (
        <div className="ve_container">
            <video ref={videoRef} width={320} height={240}>
                <source
                    src={`http://localhost/api/user/videos/`}
                    type="video/mp4"
                ></source>
                Your browser does not support the video tag
            </video>
        </div>
    );
};

export default VideoElement;
