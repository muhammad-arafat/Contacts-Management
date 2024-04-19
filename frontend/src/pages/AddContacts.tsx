import React from "react";
import { Link } from "react-router-dom";

const AddContacts: React.FC = () => {
  const handleContactSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
            id=''
          />

          <label htmlFor='email'>Email</label>
          <input
            className='h-10 px-4 rounded-lg bg-gray-400 outline-none text-white text-xl'
            name='email'
            type='email'
            maxLength={500}
          />
          <label htmlFor='phone'>Phone*</label>
          <input
            className='bg-gray-400 h-10 px-4 rounded-lg outline-none text-white text-xl'
            name='phone'
            type='number'
            required
          />
          <label htmlFor='address'>Address*</label>
          <textarea
            className='bg-gray-400 h-15 rounded-lg border-black p-4 outline-none text-white text-xl'
            name='address'
            required
          />

          <label htmlFor='photo'>Photo URL*</label>
          <input
            className='bg-gray-400 h-10 px-4 rounded-lg outline-none text-white text-xl'
            type='text'
            required
            name='photo'
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
