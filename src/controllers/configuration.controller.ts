import express from 'express';
import deviceSchema from '../schemas/device.json' assert { type: 'json' };
import firmwareSchema from '../schemas/firmware.json' assert { type: 'json' };
import bootstrapServerSchema from '../schemas/server.json' assert { type: 'json' };

export const configurationController = express.Router();

configurationController.get('/schemas', (req: express.Request, res: express.Response) => {
 return res.json(
    [
      deviceSchema,
      bootstrapServerSchema,
      firmwareSchema
    ]
  )
});