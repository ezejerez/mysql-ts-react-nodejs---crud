import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) res.json(user);
  else res.status(404).json({ msg: `Cannot find User with id ${id}.` });
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const duplicatedEmail = await User.findOne({ where: { email: body.email } });
    if (duplicatedEmail) return res.status(400).json({ msg: `Duplicated email ${body.email}` });

    const user = await User.create(body);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: `Invalid or missing data.` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(400).json({ msg: `Cannot find User with id ${id}.` });

    const duplicatedEmail = await User.findOne({ where: { email: body.email } });
    if (duplicatedEmail) return res.status(400).json({ msg: `Duplicated email ${body.email}` });

    await User.update(body, { where: { id } });

    return res.json({ user, id });
  } catch (err) {
    res.status(500).json({ msg: `Invalid or missing data.` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ msg: `Cannot find User with id ${id}.` });
    else {
      // Delete permanently from db
      // await User.destroy({ where: { id } });

      // Delete changing "state" value, keeping the User register on the db
      await User.update({ ...User, state: false }, { where: { id } });

      return res.status(200).json({ msg: `Deleted successfully User with id ${id}.` });
    }
  } catch (err) {
    res.status(500).json({ msg: `Invalid or missing data.` });
  }
};
