// Fetch the configuration (e.g., from a JSON file or API)
fetch('http://localhost:8001/widget-config.json')
  .then(response => response.json())
  .then(config => {
    const iframe = document.createElement('iframe');
    iframe.id = 'jps-chat-widget-iframe';
    iframe.src = config.src;
    iframe.style.position = 'fixed';
    iframe.style.bottom = config.bottom || '20px';
    iframe.style.right = config.right || '20px';
    iframe.style.width = '110px';
    iframe.style.height = '100px';
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '1000';
    iframe.frameBorder = '0';

    document.body.appendChild(iframe);

    window.addEventListener('message', (event) => {
      if (!event.data || event.source !== iframe.contentWindow) return;
      if (event.data.type === 'widget-open') {
        iframe.style.width = config.width || '370px';
        iframe.style.height = config.height || '560px';
      } else if (event.data.type === 'widget-close') {
        iframe.style.width = '110px';
        iframe.style.height = '100px';
      }
    });
  })
  .catch(error => {
    console.error('Failed to load widget config:', error);
    // Fallback: Use default position
    const iframe = document.createElement('iframe');
    iframe.id = 'jps-chat-widget-iframe';
    iframe.src = 'http://localhost:8001/widget.html';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '110px';
    iframe.style.height = '100px';
    iframe.style.borderRadius = '5px';
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '1000';
    iframe.frameBorder = '0';
    document.body.appendChild(iframe);

    window.addEventListener('message', (event) => {
      if (!event.data || event.source !== iframe.contentWindow) return;
      if (event.data.type === 'widget-open') {
        iframe.style.width = '370px';
        iframe.style.height = '560px';
      } else if (event.data.type === 'widget-close') {
        iframe.style.width = '62px';
        iframe.style.height = '62px';
      }
    });
  });