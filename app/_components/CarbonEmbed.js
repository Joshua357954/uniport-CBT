import React from 'react';

const CarbonEmbed = ({ code, language }) => {
  // Construct the URL based on props
  const baseUrl = 'https://carbon.vercel.app/embed';
  const queryParams = new URLSearchParams({
    bg: 'rgba(171, 184, 195, 1)',
    t: 'seti',
    wt: 'none',
    l: language || 'auto', // Default to 'auto' if no language provided
    ds: 'true',
    dsyoff: '20px',
    dsblur: '68px',
    wc: 'true',
    wa: 'true',
    pv: '56px',
    ph: '56px',
    ln: 'false',
    fl: '1',
    fm: 'Hack',
    fs: '14px',
    lh: '133%',
    si: 'false',
    es: '2x',
    wm: 'false',
    code: encodeURIComponent(code || '') // Use empty string if no code provided
  });

  const iframeStyle = {
    width: '480px',
    height: '298px',
    border: '0',
    transform: 'scale(1)',
    overflow: 'hidden'
  };

  return (
    <iframe
      src={`${baseUrl}?${queryParams}`}
      style={iframeStyle}
      sandbox="allow-scripts allow-same-origin"
      title="Carbon Embed"
      className='flex justify-start'
    ></iframe>
  );
};

export default CarbonEmbed;
