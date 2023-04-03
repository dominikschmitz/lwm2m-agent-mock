import express from 'express';
import { Data, getDatabase, LowWithLodash } from '../database.js';

export const deviceConfigurationController = express.Router();

const PATH = '/:id/configuration';

deviceConfigurationController.get(PATH, (req: express.Request, res: express.Response) => {
  try {
    const db = getDatabase() as LowWithLodash<Data>;
    const { device } = db.getDeviceById(req.params['id']);
    return device ? res.json(device) : res.sendStatus(404);
  } catch (error) {
    const e = error as Error;
    return res.status(400).send(e.message);
  }
});

async function setDeviceConfig(req: express.Request, res: express.Response) {
  try {
    const db = getDatabase() as LowWithLodash<Data>;
    const id = req.params['id'];
    let { device } = db.getDeviceById(id);

    if (device) {
      throw new Error(`Device with ${id} already exists. Try PUT instead!`);
    }

    device = { ...req.body, id }

    db.data.devices.push(device);
    await db.write();
    return res.json(device);
  } catch (error) {
    const e = error as Error;
    return res.status(400).send(e.message);
  }
}

deviceConfigurationController.post(PATH, (req, res) => setDeviceConfig(req, res));

deviceConfigurationController.put(PATH, (req: express.Request, res: express.Response) => {
  try {
    const db = getDatabase() as LowWithLodash<Data>;
    const id = req.params['id'];
    let { index } = db.getDeviceById(id);

    if (index >= 0) {
      const updatedDevice = { ...req.body, id };
      db.data.devices[index] = updatedDevice;
      return res.json(updatedDevice);
    }
    setDeviceConfig(req, res);
  } catch (error) {
    const e = error as Error;
    return res.status(400).send(e.message);
  }
});