import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import { Tensor } from "@tensorflow/tfjs";

interface Image {
  uri: string;
  width: number;
  height: number;
}

/**
 * Create a JPEG image from a Tensor
 * @param tensor A tf.Tensor object containing the image data
 * @author ClementWalter
 * @link https://stackoverflow.com/a/64174438
 */
export const encodeJpeg = async (tensor: Tensor): Promise<Image> => {
  const height = tensor.shape[0];
  const width = tensor.shape[1];
  // const data = Buffer.from(
  //   // concat with an extra alpha channel and slice up to 4 channels to handle 3 and 4 channels tensors
  //   tf
  //     .concat([tensor, tf.ones([height, width, 1]).mul(255)], -1)
  //     .slice([0], [height, width, 4])
  //     .dataSync()
  // );
  const data = tensor.dataSync().buffer;

  const rawImageData = { data, width, height };
  const jpegImageData = jpeg.encode(rawImageData, 100);

  // const imgBase64 = tf.util.decodeString(jpegImageData.data, "base64");
  const imgBase64 = jpegImageData.data.toString("base64");

  console.log("base64", imgBase64);

  return {
    uri: `data:image/jpeg;base64,${imgBase64}`,
    width,
    height,
  };
};
