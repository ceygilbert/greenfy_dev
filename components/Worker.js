// worker.js

import * as tf from "@tensorflow/tfjs";

addEventListener("message", async ({ data }) => {
  let Model;
  const input = tf.tensor(JSON.parse(data));
  
  //const parsedData = JSON.parse(data);

  // Convert the parsed data into a TensorFlow tensor
  //const input = tf.tensor(parsedData);

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  if (!Model) {
    console.log(tf);
    //const proxyUrl = '/api/proxy?url=' + encodeURIComponent(process.env.NEXT_PUBLIC_MODEL_URL);
    // Make sure to update the NEXT_PUBLIC_MODEL_URL environment variable on Vercel (or .env file) to point to the model.json file
    Model = await tf.loadGraphModel(process.env.NEXT_PUBLIC_MODEL_URL);
  }
  const result = await Model.predict(tf.expandDims(input, 0));
  const index = await result.data();

  const final = {
    number: indexOfMax(index) + 1,
    tensor: JSON.stringify(input.arraySync()),
  };

  postMessage(final);
});
