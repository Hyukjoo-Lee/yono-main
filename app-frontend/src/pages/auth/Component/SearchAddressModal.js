import CommonDialog from '../../../common/CommonDialog';
import DaumPostcode from 'react-daum-postcode';

const SearchAddressModal = ({ open, onClose, onCompletePost }) => {
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname) {
        extraAddress += data.bname;
      }
      if (data.buildingName) {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : '';
    }

    if (onCompletePost) {
      onCompletePost(fullAddress);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <CommonDialog open={open} onClose={onClose}>
      <DaumPostcode onComplete={handlePostCode} />
    </CommonDialog>
  );
};

export default SearchAddressModal;
