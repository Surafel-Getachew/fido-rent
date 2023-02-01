import { Request, Response, NextFunction } from 'express';
import Rocket from '../model/Rocket';

const getAllRockets = async (req: Request, res: Response) => {
  const page = parseInt(req?.query?.page as string);
  const limit = parseInt(req?.query?.limit as string);
  const startIndex = (page - 1) * limit;
  const totalDocument = await Rocket.countDocuments();
  const totalPage = Math.ceil(totalDocument / limit);
  let rockets;
  if (page && limit) {
    rockets = await Rocket.find().limit(limit).skip(startIndex);
  } else {
    rockets = await Rocket.find();
  }
  if (!rockets) return res.status(204).json({ message: 'No rockets found.' });
  res.json({ rockets, totalPage });
};

const addNewRocket = async (req: Request, res: Response) => {
  const { name, description, height, diameter, mass } = req?.body;
  if (!name || !description || !height || !mass || !diameter) {
    return res.status(400).json({
      message: 'name,description,height,diameter and mass are required',
    });
  }

  if (
    typeof height !== 'number' ||
    typeof diameter !== 'number' ||
    typeof mass !== 'number'
  ) {
    res.status(400).send('Invalid request body type');
  }
  try {
    const result = await Rocket.create({
      name,
      description,
      height,
      mass,
      diameter,
      photo: req.body?.photo,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updateRocket = async (req: Request, res: Response) => {
  const { name, description, diameter, mass, height, photo } = req?.body;
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }
  const rocket = await Rocket.findOne({ _id: req.body.id }).exec();
  if (!rocket) {
    return res
      .status(204)
      .json({ message: `No rocket matches ID ${req.body.id}.` });
  }

  if (name) rocket.name = name;
  if (description) rocket.description = description;
  if (photo) rocket.mass = photo;
  if (height && typeof height === 'number') {
    rocket.height = height;
  }
  if (mass && typeof mass === 'number') {
    rocket.mass = mass;
  }
  if (diameter && typeof diameter === 'number') {
    rocket.diameter = diameter;
  }

  if (
    (mass && typeof mass !== 'number') ||
    (height && typeof height !== 'number') ||
    (diameter && typeof diameter !== 'number') 
  ) {
    return res.status(400).send("Invalid request body type")
  }
  
    try {
      const result = await rocket.save();
      res.json(result);
    } catch (error) {
      res.status(500).send('Internal Server Error');
      console.log(error);
    }
};

const deleteRocket = async (req: Request, res: Response) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Rocket ID required.' });

  const rocket = await Rocket.findOne({ _id: req.params.id }).exec();
  if (!rocket) {
    return res
      .status(204)
      .json({ message: `No rocket matches ID ${req.params.id}.` });
  }
  const result = await rocket.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getRocket = async (req: Request, res: Response) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'rocket ID required.' });

  const rocket = await Rocket.findOne({ _id: req.params.id }).exec();
  if (!rocket) {
    return res
      .status(204)
      .json({ message: `No Rocket matches ID ${req.params.id}.` });
  }
  res.json(rocket);
};

const rocketController = {
  getAllRockets,
  addNewRocket,
  updateRocket,
  deleteRocket,
  getRocket,
};

export default rocketController;
