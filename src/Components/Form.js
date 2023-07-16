import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import { yupResolver } from '@hookform/resolvers/yup';
import { setFormValues, clearForm } from '../slice/form';
import * as yup from 'yup';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Form = () => {
  const formValues = useSelector((state) => state.form);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const schema = yup
    .object({
      fullName: yup
        .string()
        .required('Full Name is Required')
        .min(3, 'Enter Valid Full Name')
        .max(50, 'Enter Valid Full Name')
        .matches(/^[a-zA-Z ]*$/, 'Enter Valid Full Name'),
      email: yup
        .string()
        .required('Enter EmailId')
        .email('Enter Valid EmailId'),
      mobileNumber: yup
        .string()
        .required('Mobile Number is Required')
        .max(10, 'Mobile Number Must 10 Numbers Only')
        .min(10, 'Mobile Number Must 10 Numbers Only')
        .matches(/^[6-9][0-9+-]+$/, 'Invalid Mobile Number'),
      password: yup
        .string()
        .required('Password is Required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[@#$])(?=.*[0-9].*[0-9])(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z]).{9,}$/,
          "Password must contain at least one special character, four digit's number,two uppercase and two lowercase letters"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords Not Match')
        .required('Confirm Password is Required'),
      qualification: yup.string().required('Qualification is Required'),
      maritalStatus: yup.string().required('Marital Status is Required'),
      acceptTermsAndConditions: yup
        .string()
        .required('Accept Terms And Conditions is Required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: formValues, resolver: yupResolver(schema) });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const saveData = async (data) => {
    await dispatch(setFormValues(data));
    dispatch(clearForm());
    reset({
      fullName: formValues.fullName,
      mobileNumber: formValues.mobileNumber,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      qualification: formValues.qualification,
      maritalStatus: formValues.maritalStatus,
      acceptTermsAndConditions: formValues.acceptTermsAndConditions,
    });
  };

  async function loadQualificationOptions() {
    return {
      options: [
        {
          value: 'SSLC',
          label: 'SSLC',
        },
        {
          value: 'HSC',
          label: 'HSC',
        },
        {
          value: 'UG',
          label: 'UG',
        },
        {
          value: 'PG',
          label: 'PG',
        },
      ],
      hasMore: false,
    };
  }

  return (
    <main className="my-5">
      <div className="text-center mb-3 ">
        <h3 className="fst-italic fs-3">React Basic Registration Form</h3>
      </div>
      <form onSubmit={handleSubmit(saveData)}>
        <div className="mb-3 position-relative position-relative">
          <label htmlFor="fullName" className="form-label fw-bold">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter Your FullName"
            {...register('fullName')}
          />

          {errors?.fullName && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.fullName?.message}
            </small>
          )}
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="emailId" className="form-label fw-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailId"
            placeholder="Enter Your Email ID"
            {...register('email')}
          />
          {errors?.email && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.email?.message}
            </small>
          )}
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="mobileNumber" className="form-label fw-bold">
            Mobile Number
          </label>
          <input
            type="number"
            className="form-control"
            id="mobileNumber"
            placeholder="Enter Your Email Mobile Number"
            {...register('mobileNumber')}
          />
          {errors?.mobileNumber && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.mobileNumber?.message}
            </small>
          )}
        </div>{' '}
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            placeholder="Enter Your Password"
            {...register('password')}
          />
          {password?.length > 0 && !showPassword && (
            <span
              className="fs-3 "
              style={{
                position: 'absolute',
                top: '24px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setShowPassword(true)}
            >
              <AiFillEyeInvisible />
            </span>
          )}
          {password?.length > 0 && showPassword && (
            <span
              className="fs-3 "
              onClick={() => setShowPassword(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '10px',
                cursor: 'pointer',
              }}
            >
              {' '}
              <AiFillEye />
            </span>
          )}
          {errors?.password && (
            <small className="position-absolute top-10 left-0 text-danger mb-5">
              {errors?.password?.message}
            </small>
          )}
        </div>{' '}
        <div className="mb-3 position-relative">
          <label htmlFor="confirmPassword" className="form-label  fw-bold">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-control"
            id="confirmPassword"
            placeholder="Enter Your Confirm Password"
            {...register('confirmPassword')}
          />
          {confirmPassword?.length > 0 && !showConfirmPassword && (
            <span
              className="fs-3 "
              style={{
                position: 'absolute',
                top: '24px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setShowConfirmPassword(true)}
            >
              <AiFillEyeInvisible />
            </span>
          )}
          {confirmPassword?.length > 0 && showConfirmPassword && (
            <span
              className="fs-3 "
              onClick={() => setShowConfirmPassword(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '10px',
                cursor: 'pointer',
              }}
            >
              {' '}
              <AiFillEye />
            </span>
          )}
          {errors?.confirmPassword && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.confirmPassword?.message}
            </small>
          )}
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="confirmPassword" className="form-label  fw-bold">
            Qualification
          </label>
          <AsyncPaginate
            className="form-control"
            loadOptions={loadQualificationOptions}
            {...register('qualification')}
            onChange={(obj) => {
              setValue('qualification', obj?.value);
              clearErrors('qualification');
            }}
          />
          {errors?.qualification && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.qualification?.message}
            </small>
          )}
        </div>
        <div className="mb-0 fw-bold">
          <p>Marital Status</p>
        </div>
        <div className="mb-3 position-relative d-flex flex-row gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="maritalStatus"
              id="radio1"
              value="Single"
              {...register('maritalStatus')}
            />
            <label className="form-check-label" htmlFor="radio1">
              Single
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="maritalStatus"
              id="radio2"
              value="Maried"
              {...register('maritalStatus')}
            />
            <label className="form-check-label" htmlFor="radio2">
              Maried
            </label>
          </div>
          {errors?.maritalStatus && (
            <small className="position-absolute top-100 left-0 text-danger">
              {errors?.maritalStatus?.message}
            </small>
          )}
        </div>
        <div className="mb-3 position-relative">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="yes"
              id="checkbox1"
              {...register('acceptTermsAndConditions')}
            />
            <label className="form-check-label" htmlFor="checkbox1">
              Accept Terms and Condition's
            </label>
          </div>
          {errors?.acceptTermsAndConditions && (
            <small className="position-absolute top-10 left-0 text-danger">
              {errors?.acceptTermsAndConditions?.message}
            </small>
          )}
        </div>
        <div className="text-center">
          <button className="btn bg-primary text-white fw-bold mt-3">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default Form;
