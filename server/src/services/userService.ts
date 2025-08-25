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

export async function getUserByEmail(email: string) {
  const result = await User.findOne({ email: email}, { _id : 1 });
  return result?._id;
}