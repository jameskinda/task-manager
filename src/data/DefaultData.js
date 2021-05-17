export default [
  {
    id: 1,
    dueOn: new Date().setMonth(new Date().getMonth() + 1),
    title: "Go to dentist",
    type: "Appointment",
    location: "In person",
    description: "You need to get your teeth cleaned",
    urgency: "Very important",
  },
  {
    id: 2,
    dueOn: new Date().setDate(new Date().getDate() + 1),
    title: "Mike's",
    type: "Friends",
    location: "In person",
    description: "Bring cake",
  },
  {
    id: 3,
    dueOn: new Date().setDate(new Date().getDate() + 3),
    title: "Pick up document",
    type: "Work",
    location: "In person",
    description: "Get document for the client in room 123A",
  },
  {
    id: 4,
    dueOn: new Date().setDate(new Date().getDate() - 1),
    title: "Date",
    type: "Significant other",
    location: "In person",
    description: "Date night",
  },
  {
    id: 5,
    dueOn: new Date().setHours(new Date().getHours() + 6),
    title: "Take dog to beach",
    type: "Family",
    location: "In person",
    description: "Take dog to Marina Green",
  },
  {
    id: 6,
    dueOn: new Date().setHours(new Date().getHours() + 2),
    title: "Pick up dry cleaning",
    type: "Appointment",
    location: "In person",
    description: "Go get your 5 dress shirts",
  },
];

// type: [work, friends, family, significant other, appointment, misc.s]
// location: [virtual, in-person,]
