import React, { useEffect, useRef } from 'react';

const JitsiMeet = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    let api = null;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName,
          parentNode: jitsiContainerRef.current,
          userInfo: {
            displayName,
          },
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            defaultLanguage: 'en'
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'Participant',
          },
        });
      } else {
        console.error('Jitsi Meet API script not loaded');
      }
    };

    loadJitsi();

    return () => {
      if (api) {
        api.dispose();
      }
    };
  }, [roomName, displayName]);

  return (
    <div className=" rounded-lg border border-gray-300 p-4">
      <div ref={jitsiContainerRef} style={{ height: '700px', width: '95%' , margin:'auto' }} />
    </div>
  );
};

export default JitsiMeet;