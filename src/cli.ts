import process from 'node:process';
import { program } from 'commander';
import Server from '.';
import { DEFAULT_PORT, DEFAULT_BASE_DIR } from './constants';

const cliOptions = [
  {
    option: '-p, --port <port>',
    description: 'The port to listen on',
    defaultValue: DEFAULT_PORT,
    usage: `htttp-server -p ${DEFAULT_PORT}`,
  },
  {
    option: '-d, --directory <directory>',
    description: 'The directory to serve',
    defaultValue: DEFAULT_BASE_DIR,
    usage: `htttp-server -d ${DEFAULT_BASE_DIR}`,
  },
  {
    option: '--data <data>',
    description: 'The specific data position path',
    defaultValue: '',
    usage: `htttp-server --data ./data/data.json`,
  },
  {
    option: '--cors',
    description: 'Enable cors',
    defaultValue: false,
    usage: `htttp-server --cors`,
  },
  {
    option: '--disable-cache',
    description: 'Disable cache',
    defaultValue: false,
    usage: `htttp-server --disable-cache`,
  },
  {
    option: '--max-age <maxAge>',
    description: 'Set cache max-age',
    defaultValue: 5,
    usage: `htttp-server --max-age 5`,
  },
  {
    option: '--compress',
    description: 'Enable compress',
    defaultValue: false,
    usage: `htttp-server --compress`,
  },
];

cliOptions.forEach(({ option, description, defaultValue }) => program.option(option, description, defaultValue.toString()));
program.on('--help', () => {
  console.log('Examples:');
  cliOptions
    .map(({ usage }) => usage)
    .forEach((usage) => console.log(`\x20\x20${usage}`));
});
program.parse(process.argv);
const opts = program.opts();

const server = new Server({
  port: Number(opts.port),
  baseDir: opts.directory,
  dataPosition: opts.data,
  cors: JSON.parse(opts.cors),
  cache: !JSON.parse(opts.disableCache),
  maxAge: Number(opts.maxAge),
  compress: JSON.parse(opts.compress),
});
server.start();
