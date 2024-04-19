import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContacts } from "../Slices/contactsSlice";
import { AppDispatch, RootState } from "../store/store";
import { Center } from "@chakra-ui/react";
import ContactsCard from "../components/ContactsCard";

const AllContacts = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  const contacts = useSelector(
    (state: RootState) => state.contacts.fetchedContacts
  );
  console.log(contacts);

  return (
    <section className=' max-w-7xl mx-auto'>
      <div className='py-16 grid mx-auto justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 '>
        {contacts.map((contact, idx) => (
          <Center key={idx}>
            <ContactsCard contact={contact} />
          </Center>
        ))}
      </div>
    </section>
  );
};

export default AllContacts;
