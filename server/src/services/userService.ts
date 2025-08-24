import { User } from '../models/User';

export async function addUser(firstName: string, lastName: string, email: string, hashedPsw: string) {
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashedPsw: hashedPsw
  });
  await newUser.save();
}