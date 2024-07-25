

const Sitemap= () => {
    const fileName = 'sitemap.xml';
    const baseURL = 'https://www.godzillaandfriends.com/';
  
    const fileURL = `${baseURL}${fileName}`;
  
    return (
      <div>
        {/* Your React component content */}
        <a href={fileURL} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      </div>
    );
  };
  
  export default Sitemap;
  