import * as tf from "@tensorflow/tfjs";

// ESRGan Model
const modelUrl =
  "https://raw.githubusercontent.com/thekevinscott/UpscalerJS/master/packages/models/models/div2k/005-2x/model.json";

export const loadModel = async (): Promise<tf.LayersModel> => {
  try {
    const model = await tf.loadLayersModel(modelUrl);

    return model;
  } catch (err) {
    console.log(err);
  }
};
