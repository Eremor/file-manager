import { EOL, cpus, homedir, userInfo, arch } from 'os';

const MHZ = 1000;

export const getOSInfo = async (args) => {
  if (args.length > 1) throw new Error();

  if (args[0].includes('--')) {
    switch (args[0].slice(2)) {
      case 'EOL':
        console.log(`Default EOL: ${JSON.stringify(EOL)}\n`);
        break;
      case 'cpus':
        const myCPU = cpus().map((cpu) => ({'model': cpu.model, 'speed': cpu.speed / MHZ}));
        console.log(myCPU);
        break;
      case 'homedir':
        console.log(`Home directory: ${homedir()}`);
        break;
      case 'username':
        console.log(`System username: ${userInfo({ encoding: 'utf-8' }).username}`);
        break;
      case 'architecture':
        console.log(`Architecture: ${arch()}`);
        break;
    
      default:
        throw new Error();
    }
  } else {
    throw new Error();
  }
}