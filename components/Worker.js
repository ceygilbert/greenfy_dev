// worker.js

import * as tf from "@tensorflow/tfjs";

addEventListener("message", async ({ data }) => {
  let Model;
  const input = tf.tensor(data);

  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  if (!Model) {
    // Use the API route URL to fetch the model JSON file
    const proxyUrl = '/api/proxy?url=' + encodeURIComponent(process.env.NEXT_PUBLIC_MODEL_URL);
    try {
      // Load the TensorFlow.js model from the API route URL
      Model = await tf.loadGraphModel(proxyUrl);
    } catch (error) {
      console.error('Error loading TensorFlow.js model:', error);
      return;
    }
  }
  
  const result = await Model.predict(tf.expandDims(input, 0));
  const index = await result.data();

  const final = {
    number: indexOfMax(index) + 1,
    tensor: JSON.stringify(input.arraySync()),
  };

  postMessage(final);
});



/*import * as tf from "@tensorflow/tfjs";

addEventListener("message", async ({ data }) => {
  let Model;
  const input = tf.tensor(JSON.parse(data));

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
    const proxyUrl = 'https://greenfy-alpha.vercel.app/api/proxy?url=' + encodeURIComponent(process.env.NEXT_PUBLIC_MODEL_URL);
    const response = await fetch(proxyUrl);
    const modelData = await response.json();
    // Make sure to update the NEXT_PUBLIC_MODEL_URL environment variable on Vercel (or .env file) to point to the model.json file
    Model = await tf.loadGraphModel(modelData);
  }
  const result = await Model.predict(tf.expandDims(input, 0));
  const index = await result.data();

  const final = {
    number: indexOfMax(index) + 1,
    tensor: JSON.stringify(input.arraySync()),
  };

  postMessage(final);
});*/
