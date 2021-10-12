import { Task } from 'src/app/interfaces/task';

export const TASKS: Task[] = [
  {
    id: 1,
    text: 'Doctors Appointment',
    day: new Date(2021, 5, 5, 14, 30);
    reminder: true,
  },
  {
    id: 2,
    text: 'Meeting at School',
    day: new Date(2021, 5, 6, 13, 30),
    reminder: true,
  },
  {
    id: 3,
    text: 'Food Shopping',
    day: new Date(2021, 5, 7, 12, 30),
    reminder: false,
  },
];
