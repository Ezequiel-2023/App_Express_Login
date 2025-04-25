//file: src/index.ts
import  server  from "./server";

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
