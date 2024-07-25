

const SiteIndex= () => {
  const fileName = '70bfc5a0cec64ce09f212c81d2b671f9.txt';
  const baseURL = 'https://www.godzillaandfriends.com/';

  const fileURL = `${baseURL}${fileName}`;

  return (
    <div>
      <a href={fileURL} target="_blank" rel="noopener noreferrer">
        Download File
      </a>
    </div>
  );
};

export default SiteIndex;
