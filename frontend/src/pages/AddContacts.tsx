import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addContact } from "../Slices/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { AxiosError } from "axios";

const AddContacts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContactSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContact(formData));
    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   address: "",
    //   photo: "",
    // });
  };
  const { error }: { error: string | AxiosError } = useSelector(
    (state: RootState) => state.contacts
  );
  console.log(error);

  return (
    <div className=' max-w-xl mx-auto mt-10 px-5 sm:px-3'>
      <div className=' pb-5  font-semibold text-red-500'>
        <Link to='/'>
          Home <span> / </span>
        </Link>{" "}
        <Link to='/add-contacts'>Add Contacts</Link>
      </div>
      <div className='px-5 sm:px-10 py-7 rounded-3xl border border-dashed border-gray-500 '>
        <form
          onSubmit={handleContactSubmission}
          className='flex flex-col space-y-2'
        >
          <label htmlFor='name'>Name*</label>
          <input
            className='h-10 px-4 rounded-lg outline-none bg-gray-400 text-white text-xl'
            type='text'
            required
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            id=''
          />

          <label htmlFor='email'>Email</label>
          <input
            className='h-10 px-4 rounded-lg bg-gray-400 outline-none text-white text-xl'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            type='email'
            maxLength={500}
          />
          <label htmlFor='phone'>Phone*</label>
          <input
            className='bg-gray-400 h-10 px-4 rounded-lg outline-none text-white text-xl'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            type='number'
            required
          />
          <label htmlFor='address'>Address*</label>
          <textarea
            className='bg-gray-400 h-15 rounded-lg border-black p-4 outline-none text-white text-xl'
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            required
          />

          <label htmlFor='photo'>Photo URL*</label>
          <input
            className='bg-gray-400 h-10 px-4 rounded-lg outline-none text-white text-xl'
            type='text'
            required
            name='photo'
            value={formData.photo}
            onChange={handleInputChange}
            id=''
          />
          <div className='pt-3'>
            <button
              className=' group flex items-center justify-center gap-2 h-[2.25rem] w-full bg-gray-700 font-bold uppercase text-white rounded-full outline-none transition-all hover:bg-gray-950'
              type='submit'
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContacts;
