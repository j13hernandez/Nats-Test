import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');

    process.on('SIGINT', () => stan.close());
    process.on('SIGTERM', () => stan.close());
  });
});
