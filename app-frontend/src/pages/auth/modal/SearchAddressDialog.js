import { useEffect, useState } from 'react';
import CommonDialog from '../../../common/CommonDialog';
import DaumPostcode from 'react-daum-postcode';

const postCodeStyle = {
  minHeight: '43.5vh',
};
const SearchAddressDialog = ({
  open,
  setModalVisible,
  onCompletePost,
  setFormData,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
    }
  }, [open]);

  const closeModal = () => {
    setVisible(false);
    setModalVisible(false);
  };

  const handleAddressSelect = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let postcode = data.zonecode;

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
      fullAddress += ' [' + postcode + ']';
    }

    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        address: fullAddress,
        postcode,
      }));
    }

    if (onCompletePost) {
      onCompletePost(fullAddress);
    }

    setVisible(false);
    setModalVisible(false);
  };

  return (
    visible && (
      <CommonDialog
        open={open}
        onClose={closeModal}
        onClick={closeModal}
        children={
          <DaumPostcode
            style={postCodeStyle}
            onComplete={handleAddressSelect}
          />
        }
      />
    )
  );
};

export default SearchAddressDialog;
