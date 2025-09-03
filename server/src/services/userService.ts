import { User } from '../models/User';

export async function addUser(firstName: string, lastName: string, email: string, hashedPsw: string) {
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hashedPsw: hashedPsw,
  });
  await newUser.save();
  return newUser;
}

export async function getUserByEmail(email: string) {
  const result = await User.findOne({ email: email });
  return result;
}

export async function getHashedPassword(email: string) {
  const result = await User.findOne({ email: email }, { hashedPsw: 1 });
  if (!result) {
    return '';
  } else return result.hashedPsw;
}
