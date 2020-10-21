import React, { useReducer } from "react";
import {v4 as uuid} from "uuid"; 
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initailState = {
    contacts: [
      {
        id: 1,
        name: "A",
        email: "A1@gamil.com",
        phone: "1-1-1",
        type: "personal",
      },
      {
        id: 2,
        name: "B",
        email: "B2@gamil.com",
        phone: "2-2-2",
        type: "personal",
      },
      {
        id: 3,
        name: "C",
        email: "C3@gamil.com",
        phone: "3-3-3",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initailState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };

  //Delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };

  // Set current contact

  // Clear current contact

  // Upadate contact

  // filter contacts

  //clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,

        deleteContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
