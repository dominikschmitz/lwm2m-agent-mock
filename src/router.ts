import { Router } from 'express';
import { configurationController } from './controllers/configuration.controller.js';
import { deviceConfigurationController } from './controllers/device-configuration.controller.js';

const router = Router();

router.route("/health").get(function(_req, res) {
  res.json({ "status" : "UP" });
});

router.route("/environment").get(function(_req, res) {
  res.json({
      "appName" : process.env.APPLICATION_NAME,
      "platformUrl" : process.env.C8Y_BASEURL,
      "microserviceIsolation" : process.env.C8Y_MICROSERVICE_ISOLATION,
      "tenant" : process.env.C8Y_BOOTSTRAP_TENANT,
      "bootstrapUser" : process.env.C8Y_BOOTSTRAP_USER,
      "bootstrapPassword" : process.env.C8Y_BOOTSTRAP_PASSWORD
  });
});

router.use('/configuration', configurationController);
router.use('/device', deviceConfigurationController);

export default router;