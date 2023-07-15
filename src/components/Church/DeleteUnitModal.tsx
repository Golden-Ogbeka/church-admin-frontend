import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { UnitType, SetState } from '../../../types/types';
import { getUserSession } from '../../functions/userSession';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button/Button';

const DeleteUnitModal = ({
  closeModal,
  openModal,
  selectedData,
  allData,
  setAllData,
  navigateFunction,
}: {
  openModal: boolean;
  closeModal: () => void;
  selectedData: UnitType | undefined;
  allData?: UnitType[];
  setAllData?: SetState<UnitType[] | undefined>;
  navigateFunction?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const currentUser = getUserSession();

    try {
      dispatch(openLoadingIndicator({ text: 'Deleting Unit' }));
      const response = await appAxios.delete('/unit/' + selectedData?.id, {
        headers: {
          Authorization: currentUser ? currentUser?.token : null,
        },
      });
      sendFeedback(response.data?.message, 'success');

      setAllData &&
        setAllData(allData?.filter((item: UnitType) => item.id !== selectedData?.id));

      closeModal();
      navigateFunction && navigateFunction();
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(closeLoadingIndicator());
    }
  };
  return (
    <CustomModal modalState={openModal} closeModal={closeModal} title='Delete Unit'>
      <div>
        <p className='text-center md:text-left mb-10'>
          You are trying to delete this unit: ({selectedData?.u_names}). Are you sure you
          want to continue?
        </p>
        <div className='flex items-center justify-center gap-5 flex-wrap md:justify-start'>
          <Button className='md:max-w-[200px] bg-error' onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button className='md:max-w-[200px] bg-dark' onClick={closeModal}>
            No, Cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteUnitModal;
