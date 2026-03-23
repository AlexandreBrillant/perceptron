# Perceptron

A Simple JavaScript Implementation of the Perceptron AI Algorithm

## Usage

Add any sample using the **addTrainingSample**. A Sample is a set of values with a label. You can have only two labels. A label is a free string.

Calling **train** will update the inner weights of the perceptron. You can specify
too a max training size. It return an error rate. 1 (100%) means it can't train the samples and 0 (0%) means this is perfect.

After training the perceptron, you can use the **predict** method with a set of values. It will return the label for this values.

In the following sample, we have two labels: green and red. Green represents a negative value, and red represents a positive one. We let the perceptron find the correct weights during training to predict them.

```javascript

import { Perceptron } from "../dist/perceptron.mjs";

const perceptron = new Perceptron();

const sample1 = {
    sample: [],
    label:"red"
}

for ( let sample = 0; sample < 100; sample++ )
    sample1.sample.push( Math.random() * 100 );

const sample2 = {
    sample : [],
    label:"green"
};

for ( let sample = 0; sample < 100; sample++ )
    sample2.sample.push( -Math.random() * 100 );

perceptron.addTrainingSample( sample1 );
perceptron.addTrainingSample( sample2 );

const errorRate = perceptron.train();

console.log( "Training good result rate " + ( 100 - errorRate ) + "%" );

console.log( perceptron.predict( [-10,-2] ) );  // green

console.log( perceptron.predict( [200,30] ) );  // red
```

(c) 2026 Alexandre Brillant
