let contacts = [];

const list = () => Promise.resolve(contacts)
const create = (contact) => {
  if (contacts.some(c => c.email === contact.email)) {
    return Promise.reject({
      response: {
        data: {
          message: 'Invalid contact email',
          errors: {
            email: 'Already exists a contact with this email'
          }
        }
      }
    })
  }
  contact.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  contacts.push(contact);
  return Promise.resolve(contact);
}

export default {
  list,
  create
}