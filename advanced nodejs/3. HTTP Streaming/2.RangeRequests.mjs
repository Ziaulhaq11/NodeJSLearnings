import { createReadStream, stat } from 'fs'
import { createServer } from 'http'
import { promisify } from 'util'

const fileName = "../powder-day.mp4"
const fileInfo = promisify(stat)

createServer(async (req, res) => {
    const { size, } = await fileInfo(fileName)
    const range = req.headers.range;
    if (range) {
        // "0-8726"
        let [start, end] = range.replace(/bytes=/, '').split("-")
        console.log(start, end, "START AND END")
        start = parseInt(start, 10)
        // End value will not be there, then we're taking entire size of the video
        end = end ? parseInt(end, 10) : size - 1;
        // 206 -- Partial content, streaming a video, not a full video. So browser know that we're handling this range request.
        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "accept-ranges": "bytes",
            "content-length": (end - start) + 1,
            "content-type": "video/mp4"
        })
        // Only streams part of the file starting from our points and end to our end point
        createReadStream(fileName, { start, end }).pipe(res)
    } else {
        res.writeHead(200, {
            "Content-Type": "video/mp4",
            "content-length": size
        });
        createReadStream(fileName).pipe(res);
    }
}).listen(3000, () => console.log(`Server Running at 3000`))
