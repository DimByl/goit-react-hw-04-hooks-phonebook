import { useState, useEffect } from "react";
import styles from "./App.scss";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import Container from "./components/Container/Container";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (contact) =>
    setContacts((prevState) => [contact, ...prevState]);

  const handleChangeFilter = (event) => setFilter(event.currentTarget.value);

  const getContactsToShow = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = (id) =>
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );

  return (
    <Container>
      <h1 className={styles.title}>Phonebook (hook)</h1>
      <ContactForm contacts={contacts} onSubmit={addNewContact} />

      <h2 className={styles.titleContacts}>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleChangeFilter} />
      <ContactList
        contacts={getContactsToShow()}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
