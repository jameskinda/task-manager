export default [
  {
    id: 1,
    dueOn: new Date().setMonth(new Date().getMonth() + 1),
    title: "Go to doctor",
    type: "Appointment",
    location: "Virtual",
    description: "You need to get your heart checked",
    urgency: "Very important",
  },
  {
    id: 2,
    dueOn: new Date().setDate(new Date().getDate() + 1),
    title: "Go to Mike's",
    type: "Family",
    location: "In person",
    description: "Bring claws",
  },
  {
    id: 3,
    dueOn: new Date().setDate(new Date().getDate() + 3),
    title: "Go to work",
    type: "Family",
    location: "In person",
    description: "Go back to office",
  },
  {
    id: 4,
    dueOn: new Date().setDate(new Date().getDate() - 1),
    title: "Date",
    type: "Significant other",
    location: "In person",
    description: "Go to Bodega",
  },
  {
    id: 5,
    dueOn: new Date().setHours(new Date().getHours() + 6),
    title: "Buy dog",
    type: "Family",
    location: "In person",
    description: "Go buy a dog",
  },
  {
    id: 6,
    dueOn: new Date().setHours(new Date().getHours() + 2),
    title: "Go to get vacinated",
    type: "Appointment",
    location: "In person",
    description: "Go get Phizer",
  },
];

// type: [work, friends, family, significant other, appointment, misc.s]
// location: [virtual, in-person,]
