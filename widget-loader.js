const url_base = 'https://person-data-ai.web.app/'; // Base URL for the widget
// const url_base = 'http://localhost:8001/'; // Base URL for the widget

// Fetch the configuration (e.g., from a JSON file or API)
fetch(`${url_base}widget-config.json`)
  .then(response => response.json())
  .then(config => {
    const iframe = document.createElement('iframe');
    iframe.id = 'chat-person-widget-iframe';
    iframe.src = config.src;
    iframe.style.position = 'fixed';
    iframe.style.bottom = config.layout.offset_y; // || '20px';
    iframe.style.right = config.layout.offset_x; // || '20px';
    iframe.style.width = config.layout.window_width;
    iframe.style.height = config.layout.window_height;
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '1200';
    iframe.frameBorder = '0';

    document.body.appendChild(iframe);

    window.addEventListener('message', (event) => {
      if (!event.data || event.source !== iframe.contentWindow) return;
      if (event.data.type === 'widget-open') {
        iframe.style.width = config.layout.window_width || '370px';
        iframe.style.height = config.layout.window_height || '560px';
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
    iframe.id = 'chat-person-widget-iframe';
    iframe.src = `${url_base}widget.html`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '110px';
    iframe.style.height = '100px';
    iframe.style.borderRadius = '5px';
    iframe.style.overflow = 'hidden';
    iframe.style.zIndex = '1200';
    iframe.frameBorder = '0';
    document.body.appendChild(iframe);

    // window.addEventListener('message', (event) => {
    //   if (!event.data || event.source !== iframe.contentWindow) return;
    //   if (event.data.type === 'widget-open') {
    //     iframe.style.width = '370px';
    //     iframe.style.height = '560px';
    //   } else if (event.data.type === 'widget-close') {
    //     iframe.style.width = '62px';
    //     iframe.style.height = '62px';
    //   }
    // });
  });