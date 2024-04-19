const Home = () => {
  return (
    <div className='flex flex-col items-center p-5'>
      <header className='w-full p-5 text-center'>
        <h1 className='text-2xl font-bold'>Contact Management</h1>
      </header>
      <section className='w-full max-w-4xl mb-5 p-5 bg-white shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Contacts</h2>
        <ul className='divide-y divide-gray-200'>
          <li className='py-4 flex justify-between'>
            <div>John Doe</div>
            <div>john.doe@example.com</div>
          </li>
          <li className='py-4 flex justify-between'>
            <div>Jane Smith</div>
            <div>jane.smith@example.com</div>
          </li>
        </ul>
      </section>
      <section className='w-full max-w-4xl p-5 bg-white shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Add New Contact</h2>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between items-center'>
            <span>Name:</span>
            <span>John Doe</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Email:</span>
            <span>john.doe@example.com</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Phone:</span>
            <span>+1 234 567 890</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
