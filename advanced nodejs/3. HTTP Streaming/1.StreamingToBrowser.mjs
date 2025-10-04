import { createReadStream, stat } from 'fs'
import { createServer } from 'http'
import { promisify } from 'util'

const fileName = "../powder-day.mp4"
const fileInfo = promisify(stat)

createServer(async (req, res) => {
    const { size, } = await fileInfo(fileName)
    res.writeHead(200, {
        "Content-Type": "video/mp4",
        "content-length": size
    });
    createReadStream(fileName).pipe(res);
}).listen(3000, () => console.log(`Server Running at 3000`))
