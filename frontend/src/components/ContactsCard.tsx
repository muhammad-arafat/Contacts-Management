import React, { useEffect, useState } from "react";
import {
  Contact,
  deleteContact,
  fetchContactBySlug,
  updateContact,
} from "../Slices/contactsSlice";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  EmailIcon,
  InfoIcon,
  PhoneIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Swal from "sweetalert2";

interface ContactsCardProps {
  contact: Contact;
}

const ContactsCard: React.FC<ContactsCardProps> = ({ contact }) => {
  const { name, email, phone, address, photo, slug } = contact;
  console.log(contact);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSingleContactFetching = (slug: string) => {
    dispatch(fetchContactBySlug(slug));
  };

  const eachContact = useSelector(
    (state: RootState) => state.contacts?.singleContact
  );

  const [formData, setFormData] = useState({
    name: eachContact?.name || "",
    email: eachContact?.email || "",
    phone: eachContact?.phone || "",
    address: eachContact?.address || "",
    photo: eachContact?.photo || "",
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

  const handleContactUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eachContact || !eachContact.slug) {
      console.error("Contact or slug not available for update");
      return;
    }
    dispatch(updateContact({ slug: eachContact.slug, contactData: formData }));
    navigate("/");

    onClose();
  };

  useEffect(() => {
    setFormData({
      name: eachContact?.name || "",
      email: eachContact?.email || "",
      phone: eachContact?.phone || "",
      address: eachContact?.address || "",
      photo: eachContact?.photo || "",
    });
  }, [eachContact]);

  const handleDelete = (slug: string) => {
    Swal.fire({
      title: `Are you sure to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete`,
    }).then(async result => {
      if (result.isConfirmed) {
        dispatch(deleteContact(slug));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Contact ${slug} deleted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Card maxW='xs' height='md'>
        <CardBody>
          <Image src={photo} alt='' borderRadius='lg' />
          <Stack mt='2' spacing='3'>
            <Box className='flex items-center relative justify-between'>
              <Heading size='md'>{name}</Heading>
              <Tooltip
                label='Add bookmark!'
                hasArrow
                placement='left'
                fontSize='lg'
              >
                <Button
                  position='absolute'
                  bottom='0'
                  right='0'
                  zIndex={1}
                  variant='solid'
                  colorScheme='green'
                  size='xs'
                >
                  <PlusSquareIcon fontSize={20} />
                </Button>
              </Tooltip>
            </Box>
            <Box className='flex flex-col items-start'>
              <Text
                fontSize='lg'
                className='flex items-center gap-x-2 font-semibold'
              >
                <EmailIcon />
                {email}
              </Text>
              <Text
                fontSize='lg'
                className='flex items-center gap-x-2 font-semibold'
              >
                <PhoneIcon />
                {phone}
              </Text>
              <Text
                fontSize='lg'
                className='flex items-center gap-x-2 font-semibold'
              >
                <InfoIcon />
                {address}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <Divider borderColor='red.200' />
        <CardFooter padding={3} className=' flex w-full gap-x-5'>
          <Link to='' onClick={onOpen} className=' w-1/2'>
            <Button
              variant='outline'
              colorScheme='orange'
              fontSize={"sm"}
              className=' w-full'
              onClick={() => {
                if (slug) {
                  handleSingleContactFetching(slug);
                }
              }}
            >
              <EditIcon marginRight={1} />
              Update
            </Button>
          </Link>

          <Button
            colorScheme='red'
            variant='solid'
            fontSize={"sm"}
            className=' w-1/2'
            onClick={() => {
              if (contact && contact.slug) {
                handleDelete(contact.slug);
              }
            }}
          >
            <DeleteIcon marginRight={1} />
            Delete
          </Button>
        </CardFooter>
      </Card>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className='px-3 sm:py-5 py-7 rounded-3xl'>
            <form
              onSubmit={handleContactUpdate}
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

              <ModalFooter>
                <Button
                  type='reset'
                  colorScheme='red'
                  mr={3}
                  onClick={() => {
                    setFormData({
                      name: eachContact?.name || "",
                      email: eachContact?.email || "",
                      phone: eachContact?.phone || "",
                      address: eachContact?.address || "",
                      photo: eachContact?.photo || "",
                    });
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button type='submit' colorScheme='green'>
                  Update Contact
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default ContactsCard;
