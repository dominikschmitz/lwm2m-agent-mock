import express from 'express';
import { readJSON, writeJSON } from 'fs-extra/esm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const configurationController = express.Router();

configurationController.get('/schemas', async (req: express.Request, res: express.Response) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  try {
    const deviceSchema = await readJSON(join(__dirname, '../schemas/device.json'));
    const serverSchema = await readJSON(join(__dirname, '../schemas/server.json'));
    const bootstrapServerSchema = await readJSON(join(__dirname, '../schemas/bootstrapServer.json'));
    const firmwareSchema = await readJSON(join(__dirname, '../schemas/firmware.json'));
    const requestHandlingSchema = await readJSON(join(__dirname, '../schemas/requestHandling.json'));
    return res.json([
      deviceSchema,
      serverSchema,
      bootstrapServerSchema,
      firmwareSchema,
      requestHandlingSchema
    ]);
  } catch(err) {
    const e = err as Error;
    return res.status(400).send(e.message);
  }
});

function updateJson(filename: string, body: unknown) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return writeJSON(join(__dirname, `../schemas/${filename}.json`), body);
}

configurationController.put('/schemas/bs-server', async (req: express.Request, res: express.Response) => {
  try {
    await updateJson('bootstrapServer', req.body);
    return res.status(200).send(req.body);
  } catch(err) {
    const e = err as Error;
    return res.status(400).send(e.message);
  }
});

configurationController.put('/schemas/server', async (req: express.Request, res: express.Response) => {
  try {
    await updateJson('server', req.body);
    return res.status(200).send(req.body);
  } catch(err) {
    const e = err as Error;
    return res.status(400).send(e.message);
  }
});

async function resetSchema(filename: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    const source = await readJSON(join(__dirname, `../schemas/default/${filename}.json`));
    await writeJSON(join(__dirname, `../schemas/${filename}.json`), source);
    return source;
  } catch (err) {
    throw err as Error;
  } 
}

configurationController.get('/schemas/reset/server', async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).send(await resetSchema('server'));
  } catch(err) {
    const e = err as Error;
    return res.status(400).send(e.message);
  }
});

configurationController.get('/schemas/reset/bs-server', async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).send(await resetSchema('bootstrapServer'));
  } catch(err) {
    const e = err as Error;
    return res.status(400).send(e.message);
  }
});