import { main } from '../process_content.mjs';

main().catch((error) => {
  console.error('process-content failed:', error);
  process.exitCode = 1;
});
