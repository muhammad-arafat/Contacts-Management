// ContactsCard.tsx

import React from "react";
import { Contact } from "../Slices/contactsSlice";
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
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  EmailIcon,
  InfoIcon,
  PhoneIcon,
} from "@chakra-ui/icons";

import { Link } from "react-router-dom";

interface ContactsCardProps {
  contact: Contact;
}

const ContactsCard: React.FC<ContactsCardProps> = ({ contact }) => {
  const { name, email, phone, address, photo } = contact;

  return (
    <Card maxW='xs' height='md'>
      <CardBody>
        <Image src={photo} alt='' borderRadius='lg' />
        <Stack mt='2' spacing='3'>
          <Heading size='md'>{name}</Heading>
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
      <CardFooter padding={3}>
        <Link to={`/all-contacts/contact/`}>
          <Button
            marginRight={5}
            variant='outline'
            colorScheme='orange'
            fontSize={"sm"}
          >
            <EditIcon marginRight={1} />
            Edit Contact
          </Button>
        </Link>
        <Button colorScheme='red' variant='solid' fontSize={"sm"}>
          <DeleteIcon marginRight={1} />
          Delete Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactsCard;
