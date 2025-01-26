import { useParams } from 'react-router';

function CryptoDetails() {
  const { id } = useParams();
  return <div>Crypto details - I am a crypto with this id: {id}</div>;
}

export default CryptoDetails;
