import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MqttModule } from './mqtt/mqtt.module'
import { Transport } from '@nestjs/microservices';

async function bootstrapHttp() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrapHttp()

async function bootstrapMqtt() {
  const app = await NestFactory.createMicroservice(MqttModule, {
    transport: Transport.MQTT,
    options: {
      port: 1883,
    },
  })
  await app.listenAsync()
}
bootstrapMqtt()
