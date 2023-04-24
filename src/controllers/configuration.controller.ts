import express from 'express';
import { readJSON, writeJSON } from 'fs-extra/esm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const configurationController = express.Router();

configurationController.get('/schemas', async (req: express.Request, res: express.Response) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  try {
    const deviceSchema = await readJSON(join(__dirname, '../schemas/device.json'));
    const firmwareSchema = await readJSON(join(__dirname, '../schemas/firmware.json'));
    const requestHandlingSchema = await readJSON(join(__dirname, '../schemas/requestHandling.json'));
    return res.json([
      deviceSchema,
      firmwareSchema,
      requestHandlingSchema
    ]);
  } catch(err) {
    return res.status(400).send((err as Error).message);
  }
});

configurationController.get('/schemas/connectivity', async (req: express.Request, res: express.Response) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    const connectivitySchema = await readJSON(join(__dirname, '../schemas/connectivity.json'));
    return res.json(connectivitySchema);
  } catch(err) {
    return res.status(400).send((err as Error).message);
  }
});

configurationController.put('/schemas/connectivity', async (req: express.Request, res: express.Response) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    await writeJSON(join(__dirname, `../schemas/connectivity.json`), req.body);
    return res.status(200).send(req.body);
  } catch(err) {
    return res.status(400).send((err as Error).message);
  }
});