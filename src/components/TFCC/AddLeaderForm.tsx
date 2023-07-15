import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import * as yup from 'yup';
import {
  closeLoadingIndicator,
  openLoadingIndicator,
} from '../../store/slices/loadingIndicator';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useNavigate } from 'react-router-dom';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button/Button';
import { getUserSession } from '../../functions/userSession';
import Dropdown from '../../common/Dropdown/Dropdown';
import TextArea from '../../common/TextArea/TextArea';
import { ChurchType, TFCCLeaderType } from '../../../types/types';

function AddLeaderForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [churches, setChurches] = useState<ChurchType[]>([]);
  const currentUser = getUserSession();

  React.useEffect(() => {
    const getChurches = async () => {
      try {
        const response = await appAxios.get(`/church`, {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        });

        setChurches(response.data.data);
      } catch (error) {
        setChurches([]);
        sendCatchFeedback(error);
      }
    };
    getChurches();
  }, []);

  interface Leader {
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    role: 'Group Leader' | 'Cell Leader' | 'Admin' | '';
  }

  const formik = useFormik<Leader>({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      role: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      firstname: yup.string().required('Required'),
      lastname: yup.string().required('Required'),
      email: yup.string().required('Required'),
      mobile: yup.string().required('Required'),
      role: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    dispatch(openLoadingIndicator({ text: 'Adding Leader' }));
    try {
      const response = await appAxios.post(
        '/tfcc/leader',
        {
          firstname: formik.values.firstname,
          lastname: formik.values.lastname,
          email: formik.values.email,
          mobile: formik.values.mobile,
          role: formik.values.role,
        },
        {
          headers: {
            Authorization: currentUser ? currentUser?.token : null,
          },
        }
      );
      sendFeedback(response.data?.message, 'success');

      navigate('/tfcc/leader');
    } catch (error) {
      sendCatchFeedback(error);
    }
    dispatch(closeLoadingIndicator());
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput formik={formik} name='firstname' label='First Name' className='mb-5' />
      <LabelInput formik={formik} name='lastname' label='Last Name' className='mb-5' />
      <LabelInput
        formik={formik}
        name='mobile'
        label='Phone Number'
        type='tel'
        className='mb-5'
      />
      <LabelInput
        formik={formik}
        name='email'
        label='Email'
        type='email'
        className='mb-5'
      />
      <Dropdown
        values={['Group Leader', 'Cell Leader', 'Admin'].map((role) => ({
          label: role,
          value: role,
        }))}
        label='Role'
        name='role'
        formik={formik}
        className='mb-5'
      />
      <Button type='submit' className='mt-10'>
        Save Leader
      </Button>
    </form>
  );
}

export default AddLeaderForm;
