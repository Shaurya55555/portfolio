import { NodeIO } from "@gltf-transform/core";
import { dedup, prune, textureCompress } from "@gltf-transform/functions";
import sharp from "sharp";

const io = new NodeIO();
const src = process.argv[2];
const out = process.argv[3];
const doc = await io.read(src);

const sum = () =>
  doc
    .getRoot()
    .listTextures()
    .map((t) => t.getImage()?.byteLength || 0)
    .reduce((a, b) => a + b, 0);

const before = sum();

await doc.transform(
  dedup(),
  textureCompress({
    encoder: sharp,
    targetFormat: "webp",
    resize: [1024, 1024],
    quality: 88,
  }),
  prune(),
);

console.log("texture bytes:", before, "->", sum());

await io.write(out, doc);
